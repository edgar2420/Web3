from rest_framework import viewsets
from ..models.tablero import Tablero
from .serializers import TableroSerializer

class TableroViewSet(viewsets.ModelViewSet):
    queryset = Tablero.objects.all()
    serializer_class = TableroSerializer
