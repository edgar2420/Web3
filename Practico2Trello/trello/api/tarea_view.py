from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from ..models.tarea import Tarea
from .serializers import TareaSerializer

class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer

    @action(detail=False, methods=['get'], url_path='archivadas', url_name='archivadas')
    def tareas_archivadas(self, request):
        tareas = self.queryset.filter(archivado=True)
        serializer = self.get_serializer(tareas, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], url_path='mover', url_name='mover')
    def mover_tarea(self, request, pk=None):
        tarea = self.get_object()
        nueva_lista = request.data.get('lista_id')
        tarea.lista_id = nueva_lista
        tarea.save()
        return Response({'status': 'Tarea movida'})
