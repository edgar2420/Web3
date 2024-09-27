from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework import status
from trello.models.lista import Lista
from trello.models.tablero import Tablero
from trello.api.serializers import ListaSerializer


class ListaViewSet(viewsets.ModelViewSet):
    serializer_class = ListaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Filtra las listas para que solo se muestren las listas que pertenecen
        al tablero de un usuario autenticado.
        """
        id_tablero = self.kwargs.get('idTablero')
        if id_tablero:
            return Lista.objects.filter(tablero_id=id_tablero, tablero__usuario=self.request.user)
        return Lista.objects.filter(tablero__usuario=self.request.user)  # Si no hay tablero en la URL, devolvemos todas las listas del usuario

    def perform_create(self, serializer):
        """
        Se asegura de que la lista se asocie correctamente con el tablero proporcionado
        y que pertenezca al usuario autenticado.
        """
        tablero_id = self.request.data.get('tablero')
        # Validar que el tablero pertenece al usuario autenticado
        if not tablero_id or not Tablero.objects.filter(id=tablero_id, usuario=self.request.user).exists():
            raise PermissionDenied("No tienes permiso para añadir listas a este tablero.")

        serializer.save(tablero_id=tablero_id)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        # Verifica que el usuario autenticado es el propietario del tablero
        if instance.tablero.usuario != request.user:
            return Response({"detail": "No tienes permiso para actualizar esta lista."},
                            status=status.HTTP_403_FORBIDDEN)

        # Validar y actualizar la lista
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        """
        Solo el propietario del tablero puede eliminar las listas en ese tablero.
        """
        instance = self.get_object()
        if instance.tablero.usuario != request.user:
            return Response({"detail": "No tienes permiso para eliminar esta lista."}, status=status.HTTP_403_FORBIDDEN)

        return super().destroy(request, *args, **kwargs)
