from django.shortcuts import render
from django.views import View
from django.http import JsonResponse, HttpResponse

# Create your views here.
class Home(View):
	def get(self, request, *args, **kwargs):
		context = {}
		return render(request, 'index.html', context)
	def post(self, request, *args, **kwargs):
		context = {}
		return render(request, 'index.html', context)