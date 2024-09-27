from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from trello.api.serializers import TareaSerializer
from trello.models import Tarea, Lista

class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        lista = serializer.validated_data['lista']
        if lista.tablero.usuario != self.request.user:
            raise PermissionDenied("No tienes permiso para añadir tareas a este tablero.")
        serializer.save()

    def update(self, request, *args, **kwargs):
        tarea = self.get_object()
        if tarea.lista.tablero.usuario != request.user:
            raise PermissionDenied("No tienes permiso para actualizar esta tarea.")
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        tarea = self.get_object()
        if tarea.lista.tablero.usuario != request.user:
            raise PermissionDenied("No tienes permiso para eliminar esta tarea.")
        return super().destroy(request, *args, **kwargs)

    @action(detail=True, methods=['post'])
    def archivar(self, request, pk=None):
        tarea = self.get_object()
        if tarea.lista.tablero.usuario != request.user:
            raise PermissionDenied("No tienes permiso para archivar esta tarea.")

        if tarea.archivado:
            return Response({'status': 'La tarea ya está archivada.'}, status=status.HTTP_400_BAD_REQUEST)

        tarea.archivado = True
        tarea.save()
        return Response({'status': 'Tarea archivada'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def desarchivar(self, request, pk=None):
        tarea = self.get_object()
        if tarea.lista.tablero.usuario != request.user:
            raise PermissionDenied("No tienes permiso para desarchivar esta tarea.")

        if not tarea.archivado:
            return Response({'status': 'La tarea no está archivada.'}, status=status.HTTP_400_BAD_REQUEST)

        tarea.archivado = False
        tarea.save()
        return Response({'status': 'Tarea desarchivada'}, status=status.HTTP_200_OK)

    # Nueva acción para mover tareas entre listas

    @action(detail=True, methods=['post'])
    def mover(self, request, pk=None):
        tarea = self.get_object()
        nueva_lista_id = request.data.get('nueva_lista_id')
        nuevo_orden = request.data.get('nuevo_orden')

        # Si la tarea se mueve dentro de la misma lista
        if nueva_lista_id == tarea.lista.id:
            # Obtener todas las tareas de la lista actual, excepto la tarea que estamos moviendo
            tareas = tarea.lista.tareas.exclude(id=tarea.id).order_by('orden')

            # Ajustar el orden de las otras tareas para hacer espacio para la tarea movida
            if nuevo_orden >= len(tareas):
                tareas = list(tareas) + [tarea]  # Añadir la tarea al final
            else:
                tareas = list(tareas[:nuevo_orden]) + [tarea] + list(tareas[nuevo_orden:])

            # Guardar el nuevo orden de todas las tareas
            for idx, t in enumerate(tareas):
                t.orden = idx
                t.save()

            return Response({'status': 'Tarea movida dentro de la lista correctamente'}, status=status.HTTP_200_OK)

        # Si la tarea se mueve entre diferentes listas
        try:
            nueva_lista = Lista.objects.get(pk=nueva_lista_id)
        except Lista.DoesNotExist:
            return Response({'error': 'La lista especificada no existe.'}, status=status.HTTP_400_BAD_REQUEST)

        # Cambiar la lista y actualizar el orden de las tareas
        tarea.lista = nueva_lista
        tarea.orden = nuevo_orden
        tarea.save()

        # Reordenar las tareas en la lista nueva
        tareas = nueva_lista.tareas.exclude(id=tarea.id).order_by('orden')
        for idx, t in enumerate(tareas):
            t.orden = idx
            t.save()

        return Response({'status': 'Tarea movida correctamente a otra lista'}, status=status.HTTP_200_OK)
