from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet

# Initialize the default router
router = DefaultRouter()
# Register the CategoryViewSet with the router
router.register(r'categories', CategoryViewSet)

# Define the URL patterns
urlpatterns = [
    # Include the router URLs under the 'admin_api/' prefix
    path('admin_api/', include(router.urls)),
    # Other paths can be added here
]
