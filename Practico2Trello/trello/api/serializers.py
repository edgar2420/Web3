from rest_framework import serializers
from ..models.tablero import Tablero
from ..models.lista import Lista
from ..models.tarea import Tarea


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

