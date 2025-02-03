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
    return render(request, 'game/game.html')

def logo_partial(request):
    logo = get_random_icon()
    logo_url = f"icons/{logo}" if logo else ""
    context = {
        "logo_url": logo_url,
        "logo_name": logo.split("-")[0] if logo else "",
        "status": "correct"
    }
    return render(request, 'game/partials/logo_partial.html', context)

def check_answer(request):
    if request.method == 'POST':
        user_answer = request.POST.get('answer', '').strip().lower()
        correct_answer = request.POST.get("logo_name", "").strip().lower()
        if user_answer == correct_answer:
            logo = get_random_icon()
            logo_url = f"icons/{logo}" if logo else ""
            context = {
                "logo_url": logo_url,
                "logo_name": logo.split("-")[0] if logo else "",
                "status": "correct"
            }
            return render(request, 'game/partials/logo_partial.html', context)
        else:
            return render(request, 'game/partials/incorrect_partial.html', {"correct_answer": correct_answer, "status": "incorrect"})
    return JsonResponse({"status": "error"})