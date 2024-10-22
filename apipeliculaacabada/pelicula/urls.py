from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .api.pelicula_view import PeliculaViewSet
from .api.persona_view import PersonaViewSet
from .api.user_view import UserViewSet
from .api.reparto_view import RepartoViewSet  # Añadir el RepartoViewSet

# Crear un enrutador de DRF para registrar los ViewSets
router = DefaultRouter()
router.register(r'peliculas', PeliculaViewSet, basename='pelicula')
router.register(r'personas', PersonaViewSet, basename='persona')
router.register(r'usuarios', UserViewSet, basename='usuario')
router.register(r'reparto', RepartoViewSet, basename='reparto')

urlpatterns = [
    path('', include(router.urls)),
]
