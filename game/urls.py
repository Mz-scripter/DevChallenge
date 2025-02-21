from django.urls import path
from . import views

urlpatterns = [
    path('', views.game_view, name='game'),
    path('leaderboard/', views.leaderboard_view, name='leaderboard'),
    path('rules/', views.rules, name='rules'),
]

htmx_urlpatterns = [
    path('check-answer/', views.check_answer, name='check_answer'),
    path('logo-partial/', views.logo_partial, name='logo_partial'),
    path('game-result/', views.game_result_view, name='game_result'),
    path('countdown/', views.countdown, name='countdown')
]

urlpatterns += htmx_urlpatterns