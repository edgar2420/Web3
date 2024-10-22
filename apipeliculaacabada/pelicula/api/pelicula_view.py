from rest_framework import viewsets, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from ..models import Pelicula, Persona
from .serializers import PeliculaSerializer, PersonaSerializer

class PeliculaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para manejar todas las operaciones CRUD de las películas.
    - Incluye búsqueda de películas por nombre.
    - Obtiene detalles de director y reparto de la película.
    """
    queryset = Pelicula.objects.all().order_by('-calificacion_rotten')
    serializer_class = PeliculaSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombre']

    @action(detail=True, methods=['get'])
    def director(self, request, pk=None):
        """
        Obtiene los detalles del director de la película.
        """
        pelicula = self.get_object()
        director = pelicula.director
        serializer = PersonaSerializer(director)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def reparto(self, request, pk=None):
        """
        Obtiene los detalles del reparto de la película, incluyendo los roles.
        """
        pelicula = self.get_object()
        reparto = pelicula.reparto_set.all()  # Accede a la relación 'Reparto' para obtener los actores
        serializer = PersonaSerializer(reparto, many=True)
        return Response(serializer.data)
