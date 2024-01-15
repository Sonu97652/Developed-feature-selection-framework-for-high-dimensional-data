
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from .views import urlparams

urlpatterns = [
    
] + list(map(lambda x: path(x['path'], x['function']), urlparams))