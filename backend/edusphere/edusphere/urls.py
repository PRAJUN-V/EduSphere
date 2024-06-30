from django.contrib import admin
from django.urls import path, include
from users_api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin site URL
    path("users_api/register/", CreateUserView.as_view(), name="register"),  # Register endpoint
    path("users_api/token/", TokenObtainPairView.as_view(), name="get_token"),  # Token endpoint
    path("users_api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),  # Refresh token endpoint
    path("users_api-auth/", include("rest_framework.urls")),  # DRF authentication URLs
]
