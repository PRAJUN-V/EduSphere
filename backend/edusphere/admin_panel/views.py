# views.py

from rest_framework import viewsets, permissions
from rest_framework import status
from rest_framework.response import Response
from .models import Category
from .serializers import CategorySerializer
from rest_framework.decorators import action

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=True, methods=['patch'])
    def toggle_active(self, request, pk=None):
        try:
            category = self.get_object()
            category.active = not category.active
            category.save()
            return Response({'message': 'Category updated successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
