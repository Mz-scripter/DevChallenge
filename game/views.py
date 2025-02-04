from django.shortcuts import render
from django.http import JsonResponse
import os
import random
from DevChallenge.settings import BASE_DIR

ICONS_FOLDER = os.path.join(BASE_DIR, "static/icons")

def get_random_icon():
    icons = [f for f in os.listdir(ICONS_FOLDER) if f.endswith(".svg")]
    if icons:
        return random.choice(icons)
    return None

def game_view(request):
    request.session["score"] = 0
    request.session["streak"] = 0
    return render(request, 'game/game.html')

def logo_partial(request):
     # Initalize session variables of not set
    if "score" not in request.session:
        request.session["score"] = 0
    
    if "streak" not in request.session:
        request.session["streak"] = 0
        
    logo = get_random_icon()
    logo_url = f"icons/{logo}" if logo else ""
    context = {
        "logo_url": logo_url,
        "logo_name": logo.split("-")[0] if logo else "",
        "status": "correct",
        "score": request.session["score"],
        "streak": request.session["streak"]
    }
    return render(request, 'game/partials/logo_partial.html', context)

def check_answer(request):
    if request.method == 'POST':
        user_answer = request.POST.get('answer', '').strip().lower()
        correct_answer = request.POST.get("logo_name", "").strip().lower()
        
        score = request.session.get("score", 0)
        streak = request.session.get("streak", 0)
        
        if user_answer == correct_answer:
            
            request.session['score'] = score + 1
            request.session['streak'] = streak + 1
            
            logo = get_random_icon()
            logo_url = f"icons/{logo}" if logo else ""
            context = {
                "logo_url": logo_url,
                "logo_name": logo.split("-")[0] if logo else "",
                "status": "correct",
                "score": request.session["score"],
                "streak": request.session["streak"]
            }
            return render(request, 'game/partials/logo_partial.html', context)
        else:
            request.session['streak'] = 0
            context = {
                "correct_answer": correct_answer,
                "status": "incorrect",
                "score": request.session["score"],
                "streak": request.session["streak"]
            }
            return render(request, 'game/partials/incorrect_partial.html',context)
    return JsonResponse({"status": "error"})