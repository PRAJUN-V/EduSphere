from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from users_api.views import CustomRegisterView, CustomLoginView, CreateProfileView, UpdateProfileView, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin site URL
    path("users_api/register/", CustomRegisterView.as_view(), name="register"),  # Custom Register endpoint
    path("users_api/login/", CustomLoginView.as_view(), name="login"),  # Custom Login endpoint
    path("users_api/create_profile/", CreateProfileView.as_view(), name="create_profile"),  # Create profile endpoint
    path("users_api/token/", CustomTokenObtainPairView.as_view(), name="get_token"),  # Custom Token endpoint
    path("users_api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),  # Refresh token endpoint
    path("users_api/profile/", UpdateProfileView.as_view(), name="profile"),  # Profile endpoint
    path("users_api-auth/", include("rest_framework.urls")),  # DRF authentication URLs
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
