# from django.shortcuts import render_to_response
from django.http import HttpResponse


def app(request):
    print(vars(request))
    return HttpResponse("Hello there")