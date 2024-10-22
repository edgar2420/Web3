from django.db import models

class Pelicula(models.Model):
    nombre = models.CharField(max_length=255)
    sinopsis = models.TextField()
    imagen = models.ImageField(upload_to='peliculas/')
    fecha_lanzamiento = models.DateField()
    calificacion_rotten = models.DecimalField(max_digits=3, decimal_places=1)
    trailer_youtube = models.URLField()

    # Relaciones
    director = models.ForeignKey('Persona', related_name='peliculas_dirigidas', on_delete=models.SET_NULL, null=True)
    reparto = models.ManyToManyField('Persona', through='Reparto', related_name='peliculas_como_actor')

    def __str__(self):
        return self.nombre
