from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from trello.models import Tablero
from .serializers import TableroSerializer

class TableroViewSet(viewsets.ModelViewSet):
    queryset = Tablero.objects.all()
    serializer_class = TableroSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()  # Copia los datos del request
        data['usuario'] = request.user.id  # Asigna el usuario autenticado

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print("Errores de validación:", serializer.errors)  # Ver errores específicos
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
