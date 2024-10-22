from django.contrib.auth import authenticate
from django.contrib.auth.models import User  # Importa el modelo User correctamente
from rest_framework import viewsets, status, serializers
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.response import Response


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Evita que se devuelva la contraseña
    email = serializers.EmailField()

    class Meta:
        model = User
        fields = ('id', 'email', 'password')


class UserViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'], url_path='login')
    def login(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(username=email, password=password)
        if user is None:
            return Response({'error': 'Credenciales incorrectas'}, status=status.HTTP_401_UNAUTHORIZED)

        # Crear o recuperar el token de autenticación
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user_id': user.id})

    @action(detail=False, methods=['post'], url_path='register')
    def register(self, request):
        # Validar los datos con el serializer
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')

        # Crear el usuario
        user = User.objects.create_user(username=email, email=email, password=password)
        user.save()

        # Crear un token de autenticación
        token, _ = Token.objects.get_or_create(user=user)

        # Retornar la respuesta con el token
        return Response({
            'token': token.key,
            'user_id': user.id,
            'email': user.email
        }, status=status.HTTP_201_CREATED)
