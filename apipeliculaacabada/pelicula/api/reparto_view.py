from rest_framework import viewsets
from ..models import Reparto
from .serializers import RepartoSerializer

class RepartoViewSet(viewsets.ModelViewSet):
    queryset = Reparto.objects.all()  # Asegúrate de que este queryset esté devolviendo los datos correctamente
    serializer_class = RepartoSerializer
