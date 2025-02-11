from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, get_user_model
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
import requests
from django.http.response import HttpResponse, JsonResponse
from django.template.loader import render_to_string

def generate_username():
    max_attempts = 5
    attempt = 0
    
    while attempt < max_attempts:
        try:
            response = requests.get("https://usernameapiv1.vercel.app/api/random-usernames")
            if response.status_code == 200:
                username = response.json().get("usernames")[0]
                
                if not User.objects.filter(username=username).exists():
                    return username

                username += str(attempt)
                if not User.objects.filter(username=username).exists():
                    return username
        except Exception as e:
            print(f"API Error: {e}")
        
        attempt += 1
    
    return f"User_{User.objects.count() + 1}"

def auth_view(request):
    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '').strip()
        
        if not username or not password:
            return render(request, "users/auth.html", {"error": "Username and password are required."})
        
        user = authenticate(request, username=username, password=password)
        
        if user:
            login(request, user)
        else:
            user = User.objects.create_user(username=username, password=password)
            login(request, user)
        
        request.session["username"] = username
        
        return redirect('game')
    return render(request, "users/auth.html")

def check_username(request):
    username = request.POST.get('username')
    if get_user_model().objects.filter(username=username).exists():
        return HttpResponse("<div style='color: red;'>That username is taken, guessing you're tryna login</div>")
    else:
        return HttpResponse("<div style='color: green;'>Good choice of username. Now type a good password.</div>")
    
def check_auth_status(request):
    if request.session.get("username"):
        pass
    else:
        return render(request, "users/partials/auth_partial.html")

def play_as_guest(request):
    username = generate_username()
    request.session['username'] = username
    return redirect('game')