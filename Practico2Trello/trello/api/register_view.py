from rest_framework import viewsets, status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from .serializers import RegisterSerializer

class RegisterViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        """
        Método para registrar un nuevo usuario.
        """
        # Verificamos si es una solicitud de login o de registro
        if request.data.get('login'):
            return self.login(request)

        print("Datos recibidos para registro:", request.data)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response({"message": "Usuario registrado con éxito"}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def login(self, request):
        """
        Método para iniciar sesión con las credenciales del usuario.
        """
        username = request.data.get('username')
        password = request.data.get('password')

        # Autenticación del usuario
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)  # Inicia sesión en el sistema
            return Response({"message": "Inicio de sesión exitoso", "username": username}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        """
        Método para obtener los datos del usuario autenticado.
        """
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
