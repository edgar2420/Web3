from ..models import Pelicula
from rest_framework import serializers
from ..models import Reparto, Persona

class RepartoSerializer(serializers.ModelSerializer):
    """
    Serializador para la relación intermedia Reparto.
    Incluye los detalles del actor y su rol en la película.
    """
    persona = serializers.SerializerMethodField()  # Incluye detalles de la persona (actor)

    class Meta:
        model = Reparto
        fields = ['id', 'rol', 'persona']  # Elimina el campo 'foto', ya que no es válido en Reparto

    def get_persona(self, obj):
        return PersonaSerializer(obj.persona).data  # Devuelve detalles completos de la persona (actor o director)

class PersonaSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Persona.
    Muestra las películas donde actúa y las que dirige.
    """
    peliculas_dirigidas = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    peliculas_actuadas = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    foto = serializers.ImageField(required=False)  # Agregamos foto como un campo opcional

    class Meta:
        model = Persona
        fields = ['id', 'nombre', 'tipo', 'foto', 'peliculas_dirigidas', 'peliculas_actuadas']


class PeliculaSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Pelicula.
    Muestra detalles completos del director y del reparto, incluyendo el rol de cada actor.
    """
    director = serializers.PrimaryKeyRelatedField(queryset=Persona.objects.filter(tipo='director'))  # Permite asignar un director por ID
    reparto = serializers.ListField(write_only=True)  # Acepta una lista de IDs de actores
    reparto_detalles = RepartoSerializer(many=True, source='reparto_set', read_only=True)  # Solo para mostrar el reparto con detalles

    class Meta:
        model = Pelicula
        fields = ['id', 'nombre', 'sinopsis', 'fecha_lanzamiento', 'calificacion_rotten', 'trailer_youtube', 'imagen', 'director', 'reparto', 'reparto_detalles']

    def create(self, validated_data):
        reparto_data = validated_data.pop('reparto', [])
        pelicula = Pelicula.objects.create(**validated_data)
        for actor_id in reparto_data:
            Reparto.objects.create(pelicula=pelicula, persona_id=actor_id)  # Crea la relación de reparto entre la película y los actores
        return pelicula


# Si prefieres mostrar los detalles completos de las películas en las que actúa o dirige una persona:

class PersonaSerializerFull(serializers.ModelSerializer):
    """
    Serializador para el modelo Persona con detalles completos de las películas donde actúa o dirige.
    """
    peliculas_dirigidas = PeliculaSerializer(many=True, read_only=True)  # Detalles completos de las películas que dirige
    peliculas_actuadas = PeliculaSerializer(many=True, read_only=True)  # Detalles completos de las películas donde actúa

    class Meta:
        model = Persona
        fields = ['id', 'nombre', 'tipo', 'foto', 'peliculas_dirigidas', 'peliculas_actuadas']
