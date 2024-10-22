from rest_framework import viewsets
from ..models import Persona
from .serializers import PersonaSerializer

class PersonaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para manejar todas las operaciones CRUD de los actores y directores.
    """
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer
