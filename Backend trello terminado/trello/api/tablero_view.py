# trello/api/tablero_view.py
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from trello.models.tablero import Tablero
from trello.api.serializers import TableroSerializer

class TableroViewSet(viewsets.ModelViewSet):
    serializer_class = TableroSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filtrar los tableros para que solo se muestren los del usuario autenticado
        return Tablero.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        # Asegurarse de que el tablero creado se asocie al usuario autenticado
        serializer.save(usuario=self.request.user)
