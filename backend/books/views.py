# books/views.py
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Book
from .serializers import BookSerializer
from django.db.models import Q

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    @action(detail=False, methods=['get'])
    def order_by(self, request):
        order = request.query_params.get('order', 'title')
        if order == 'title':
            books = self.queryset.order_by('title')
        elif order == 'available':
            books = self.queryset.order_by('available')
        elif order == 'published_day':
            books = self.queryset.order_by('published_day')
        else:
            books = self.queryset
        serializer = self.get_serializer(books, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def search(self, request):
        query = request.query_params.get('q', '')
        if query:
            books = self.queryset.filter(
                Q(title__icontains=query) | Q(author__icontains=query)
            )
        else:
            books = self.queryset
        serializer = self.get_serializer(books, many=True)
        return Response(serializer.data)
