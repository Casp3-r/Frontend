from django.shortcuts import render
from django.views import View

# Create your views here.

# view for the home page
class StartingPageView(View):
    def get(self, request):
        return render(request, "phone/index.html")
