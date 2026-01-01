from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('edit/', views.edit, name='edit'),
]
