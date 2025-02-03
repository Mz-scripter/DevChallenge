from django.urls import path
from . import views

urlpatterns = [
    path('', views.game_view, name='game'),
]

htmx_urlpatterns = [
    path('check-answer/', views.check_answer, name='check_answer'),
    path('logo-partial/', views.logo_partial, name='logo_partial'),
]

urlpatterns += htmx_urlpatterns