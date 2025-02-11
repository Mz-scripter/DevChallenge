from django.urls import path
from . import views

urlpatterns = [
    path('auth/', views.auth_view, name='auth'),
]

htmx_urlpatterns = [
    path('check-username/', views.check_username, name='check-username'),
    path('check-auth-status/', views.check_auth_status, name='check-auth-status'),
    path('play-as-guest', views.play_as_guest, name='play-as-guest'),
]

urlpatterns += htmx_urlpatterns