from django.db import models

class Reparto(models.Model):
    pelicula = models.ForeignKey('Pelicula', on_delete=models.CASCADE, related_name='reparto_set')  # Cambia el related_name aquí
    persona = models.ForeignKey('Persona', on_delete=models.CASCADE)
    rol = models.CharField(max_length=255)  # Papel del actor en la película

    def __str__(self):
        return f"{self.persona.nombre} en {self.pelicula.nombre} como {self.rol}"

