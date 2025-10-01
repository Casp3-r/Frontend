from django.urls import path
from django.contrib import admin
from . import views
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('', views.home, name='home'),
    path('profile/', views.profile, name='profile'),
    path('chat/', views.chat, name='chat'),
    path('tips/', views.tips, name='tips'),
    path('about/', views.about, name='about'),
    path('auth/', views.auth, name='auth'),
    path("logout/", auth_views.LogoutView.as_view(next_page="home"), name="logout"),

    # API endpoint
    path("api/calculate/", views.calculate_value, name="calculate_value"),
    path("chat/", views.chat, name="chat"),
    path("chat/<int:chat_id>/", views.chat_detail, name="chat_detail"),
    path('chat/start/<int:vendor_id>/', views.start_chat, name='start_chat'),
]
