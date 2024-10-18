from django.contrib.auth import authenticate
from rest_framework import viewsets, status, serializers
from rest_framework.authtoken.admin import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.response import Response


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
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
            return Response({'error': 'Unauthenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        token, _ = Token.objects.get_or_create(user=user)

        return Response({'token': token.key})

    @action(detail=False, methods=['post'], url_path='register')
    def register(self, request):
        validated_data = UserSerializer(data=request.data)
        validated_data.is_valid(raise_exception=True)
        email = validated_data.validated_data.get('email')
        password = validated_data.validated_data.get('password')
        user = User.objects.create_user(username=email, email=email, password=password)
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)