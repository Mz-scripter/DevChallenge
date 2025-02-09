from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
import requests

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