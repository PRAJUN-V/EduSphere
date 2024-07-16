from django.contrib.auth.models import User
from django.db import models

class Instructor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    current_profession = models.CharField(max_length=100)
    # age = models.IntegerField()
    skills = models.TextField()
    document_names = models.TextField()
    # Add more fields as needed for documents storage, such as FileField or URLField

    def __str__(self):
        return self.user.get_full_name()
