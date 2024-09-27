from django.urls import path, include
from rest_framework.routers import DefaultRouter
from trello.api.tablero_view import TableroViewSet
from trello.api.lista_view import ListaViewSet
from trello.api.tarea_view import TareaViewSet
from trello.api.register_view import register_view
from trello.api.login_view import login_view
from trello.api.logout_view import logout_view
from trello.api.views import get_authenticated_user

router = DefaultRouter()
router.register(r'tableros', TableroViewSet, basename='tablero')
router.register(r'listas', ListaViewSet, basename='lista')
router.register(r'tareas', TareaViewSet, basename='tarea')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/register/', register_view),
    path('api/login/', login_view),
    path('api/logout/', logout_view),
    path('api/auth/me/', get_authenticated_user),

    # Ruta para obtener listas relacionadas con un tablero específico
    path('api/tableros/<int:idTablero>/listas/', ListaViewSet.as_view({'get': 'list'}), name='tablero-listas'),
]
