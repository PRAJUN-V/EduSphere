from rest_framework import generics
from django.contrib.auth.models import User
from .models import Instructor
from .serializers import InstructorSerializer
from rest_framework import viewsets, permissions

class InstructorCreateView(generics.CreateAPIView):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer
    permission_classes = [permissions.AllowAny]
