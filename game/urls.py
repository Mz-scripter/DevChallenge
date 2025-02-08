from django.urls import path
from . import views

urlpatterns = [
    path('', views.game_view, name='game'),
    path('leaderboard/', views.leaderboard_view, name='leaderboard'),
]

htmx_urlpatterns = [
    path('check-answer/', views.check_answer, name='check_answer'),
    path('logo-partial/', views.logo_partial, name='logo_partial'),
    path('game-result/', views.game_result_view, name='game_result'),
]

urlpatterns += htmx_urlpatterns