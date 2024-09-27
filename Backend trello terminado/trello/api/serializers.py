from rest_framework import serializers
from trello.models.tablero import Tablero
from trello.models.lista import Lista
from trello.models.tarea import Tarea

class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = ['id', 'texto', 'lista', 'orden', 'archivado']


class ListaSerializer(serializers.ModelSerializer):
    tareas = TareaSerializer(many=True, read_only=True)  # Relación anidada para las tareas

    class Meta:
        model = Lista
        fields = ['id', 'nombre', 'tablero', 'orden', 'tareas']

    def validate(self, data):
        # Validar que el campo nombre no esté vacío
        if not data.get('nombre'):
            raise serializers.ValidationError("El nombre de la lista es obligatorio.")
        # Validar que el campo orden esté presente y sea un entero
        if 'orden' in data and not isinstance(data['orden'], int):
            raise serializers.ValidationError("El campo 'orden' debe ser un número entero.")
        return data


    def update(self, instance, validated_data):
        """
        Personalización del método de actualización para asegurarse de que el nombre
        y el orden se actualizan correctamente.
        """
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.orden = validated_data.get('orden', instance.orden)
        instance.save()
        return instance

class TableroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tablero
        fields = ['id', 'nombre', 'usuario']
        extra_kwargs = {
            'usuario': {'read_only': True}  # El campo 'usuario' se establece automáticamente en el servidor
        }
