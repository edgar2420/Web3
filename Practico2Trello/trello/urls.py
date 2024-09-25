# trello/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from trello.api.tablero_view import TableroViewSet
from trello.api.lista_view import ListaViewSet
from trello.api.tarea_view import TareaViewSet
from trello.api.register_view import RegisterViewSet

# Usamos DefaultRouter para las rutas de la API
router = DefaultRouter()
router.register(r'tableros', TableroViewSet, basename='tablero')
router.register(r'listas', ListaViewSet, basename='lista')
router.register(r'tareas', TareaViewSet, basename='tarea')
router.register(r'auth', RegisterViewSet, basename='auth')  # Rutas para registro/login

urlpatterns = router.urls
