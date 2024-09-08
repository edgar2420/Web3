from django.db import models
from .categoria import Categoria

class Juego(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    categoria = models.ForeignKey(
        Categoria,
        on_delete=models.CASCADE,
        related_name='juegos'  # Esto permitirá acceder a todos los juegos de una categoría con categoria.juegos
    )

    def __str__(self):
        return self.nombre
