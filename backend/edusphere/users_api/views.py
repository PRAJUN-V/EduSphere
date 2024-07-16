from django.contrib.auth.models import User
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer, LoginSerializer, CustomTokenObtainPairSerializer, ProfileSerializer
from .models import Profile
from rest_framework import status
from .models import OTP
from .serializers import OTPSerializer
import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class CreateProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

class UpdateProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = ProfileSerializer(request.user.profile)
        return Response(serializer.data)

    def put(self, request):
        profile = request.user.profile
        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

class CustomRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        response_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        response_data.update(serializer.data)
        return Response(response_data, status=status.HTTP_201_CREATED)

class CustomLoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            request,
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password']
        )
        if user is not None:
            token_serializer = CustomTokenObtainPairSerializer(data=request.data)
            token_serializer.is_valid(raise_exception=True)
            return Response(token_serializer.validated_data, status=status.HTTP_200_OK)
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class GenerateOTPView(APIView):
    authentication_classes = []  # Disable authentication
    permission_classes = []      # Disable permission

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        otp = ''.join(random.choices('0123456789', k=6))
        sender_email = "prajun0604@gmail.com"
        receiver_email = email
        password = "fgmx pzdh xnxz yojz"  # Use your app password here
        subject = "EduSphere registration One Time Password"
        body = f"OTP to register in EduSphere : {otp}\nValid for 1 minute."

        # Create the MIME object
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = receiver_email
        message["Subject"] = subject

        # Attach the body to the email
        message.attach(MIMEText(body, "plain"))

        # Establish a connection to the SMTP server (in this case, Gmail)
        try:
            with smtplib.SMTP("smtp.gmail.com", 587) as server:
                server.starttls()
                server.login(sender_email, password)
                server.sendmail(sender_email, receiver_email, message.as_string())
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Save the OTP in the database
        otp_instance = OTP.objects.create(email=email, otp=otp)
        serializer = OTPSerializer(otp_instance)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class VerifyOTPView(APIView):
    authentication_classes = []  # Disable authentication
    permission_classes = []      # Disable permission

    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        try:
            otp_instance = OTP.objects.get(email=email, otp=otp)
            if otp_instance.is_valid():
                return Response({'message': 'OTP is valid'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'OTP has expired'}, status=status.HTTP_400_BAD_REQUEST)
        except OTP.DoesNotExist:
            return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)

