from django.urls import path
from .views import InstructorCreateView

urlpatterns = [
    path('admin_api/instructors/', InstructorCreateView.as_view(), name='instructor-create'),
]
