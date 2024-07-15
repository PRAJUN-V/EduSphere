# from django.db import models
# from django.contrib.auth.base_user import BaseUserManager
# from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
#
#
# class AppUserManager(BaseUserManager):
#     def create_user(self, email, password=None):
#         if not email:
#             raise ValueError("An email is required")
#         if not password:
#             raise ValueError("A password is required")
#         email = self.normalize_email(email)
#         user = self.model(email=email)
#         user.set_password(password)
#         user.save()
#         return user
#
#     def create_superuser(self, email, password=None):
#         if not email:
#             raise ValueError("An email is required")
#         if not password:
#             raise ValueError("A password is required")
#         user = self.create_user(email, password)
#         user.is_superuser = True
#         user.save()
#         return user
#
# class AppUser(AbstractBaseUser, PermissionsMixin):
#     user_id = models.AutoField(primary_key=True)
#     email = models.EmailField(max_length=50, unique=True)
#     username = models.CharField(max_length=50)
#     role = models.CharField(max_length=50)
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELD = ['username']
#     objects = AppUserManager()
#     def __str__(self):
#         return self.username

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import datetime

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('student', 'Student'),
        ('instructor', 'Instructor'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')
    eligibility_document = models.FileField(upload_to='eligibility_documents/', null=True, blank=True)

    def __str__(self):
        return self.user.username

class OTP(models.Model):
    email = models.EmailField()
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_valid(self):
        now = timezone.now()
        return now < self.created_at + datetime.timedelta(minutes=10)  # OTP is valid for 10 minutes

