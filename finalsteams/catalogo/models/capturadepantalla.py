from django.db import models
from .juego import Juego

class CapturaPantalla(models.Model):
    juego = models.ForeignKey(
        Juego,
        on_delete=models.CASCADE,
        related_name='capturas'  # Esto permite acceder a las capturas de un juego con juego.capturas
    )
    imagen = models.ImageField(upload_to='capturas/', null=True, blank=True)

    def __str__(self):
        return f'Captura de {self.juego.nombre}'
