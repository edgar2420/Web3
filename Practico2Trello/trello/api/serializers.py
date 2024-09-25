from rest_framework import serializers
from django.contrib.auth.models import User
from trello.models.tablero import Tablero
from trello.models.lista import Lista
from trello.models.tarea import Tarea


# Serializador de Registro de Usuario
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # No devolver la contraseña

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])  # Encripta la contraseña
        user.save()
        return user

# Serializador de Tarea
class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = ('id', 'texto', 'lista', 'orden', 'archivado')


# Serializador de Lista
class ListaSerializer(serializers.ModelSerializer):
    tareas = TareaSerializer(many=True, read_only=True)  # Relación anidada con Tarea

    class Meta:
        model = Lista
        fields = ('id', 'nombre', 'tablero', 'orden', 'tareas')  # Incluye tareas


# Serializador de Tablero
class TableroSerializer(serializers.ModelSerializer):
    listas = ListaSerializer(many=True, read_only=True)  # Relación anidada con Lista

    class Meta:
        model = Tablero
        fields = ('id', 'nombre', 'usuario', 'listas')  # Incluye listas
