from django.urls import path
from . import views

urlpatterns = [
    path('auth/', views.auth_view, name='auth'),
]

htmx_urlpatterns = [
    path('check-username/', views.check_username, name='check-username'),
]

urlpatterns += htmx_urlpatterns