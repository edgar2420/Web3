from django.db import models
from .usuario import Usuario
from .juego import Juego

class Compra(models.Model):
    usuario = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
        related_name='compras'  # Esto permite acceder a las compras de un usuario con usuario.compras
    )
    juego = models.ForeignKey(
        Juego,
        on_delete=models.CASCADE,
        related_name='compras'  # Esto permite acceder a las compras de un juego con juego.compras
    )
    fecha_compra = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Compra de {self.juego.nombre} por {self.usuario.nombre}'
