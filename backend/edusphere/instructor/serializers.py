from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Instructor

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']

class InstructorSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Instructor
        fields = ['id', 'user', 'current_profession', 'age', 'skills', 'document_names']
        depth = 1

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create(**user_data)
        instructor = Instructor.objects.create(user=user, **validated_data)
        return instructor
