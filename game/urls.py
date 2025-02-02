from django.urls import path
from . import views

urlpatterns = [
    path('', views.game_view, name='game'),
]

htmx_urlpatterns = [
    path('check-answer/', views.check_answer, name='check_answer')
]

urlpatterns += htmx_urlpatterns