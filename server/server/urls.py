"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
# from kaos_spa import settings as spa_settings


from .views import app
from data.views import url_patterns as data_patterns
from modelcomparisons.urls import urlpatterns as mc_patterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('data/', include(data_patterns)),
    path('comparisions/', include(mc_patterns))
] + [
    # path(spa_settings.SPA_URL, include('kaos_spa.urls'))
]
