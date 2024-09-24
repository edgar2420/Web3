from rest_framework.routers import DefaultRouter
from .api.tablero_view import TableroViewSet
from .api.lista_view import ListaViewSet
from .api.tarea_view import TareaViewSet

router = DefaultRouter()
router.register(r'tableros', TableroViewSet, basename='tablero')
router.register(r'listas', ListaViewSet, basename='lista')
router.register(r'tareas', TareaViewSet, basename='tarea')

urlpatterns = router.urls
