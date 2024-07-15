from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import OTP

class ProfileSerializer(serializers.ModelSerializer):
    eligibility_document = serializers.FileField(write_only=True, required=False)
    profile_picture = serializers.ImageField(required=False)

    class Meta:
        model = Profile
        fields = ['profile_picture', 'role', 'eligibility_document']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name', 'profile')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create_user(**validated_data)
        Profile.objects.create(user=user, **profile_data)
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        profile = instance.profile

        instance.username = validated_data.get('username', instance.username)
        instance.set_password(validated_data.get('password', instance.password))
        instance.save()

        if profile_data:
            profile.profile_picture = profile_data.get('profile_picture', profile.profile_picture)
            profile.role = profile_data.get('role', profile.role)
            # Handle eligibility document update if provided
            eligibility_document = profile_data.get('eligibility_document', None)
            if eligibility_document:
                profile.eligibility_document = eligibility_document
            profile.save()

        return instance

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['email'] = user.email
        token['role'] = user.profile.role  # Add role to the token

        # Add profile picture if available
        if user.profile.profile_picture:
            token['profile_picture'] = user.profile.profile_picture.url  # Adjust as per your storage configuration
        else:
            token['profile_picture'] = None

        return token

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class OTPSerializer(serializers.ModelSerializer):
    class Meta:
        model = OTP
        fields = ['email', 'otp', 'created_at']

