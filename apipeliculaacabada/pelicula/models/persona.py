from django.db import models

class Persona(models.Model):
    ACTOR = 'actor'
    DIRECTOR = 'director'
    TIPO_CHOICES = [
        (ACTOR, 'Actor'),
        (DIRECTOR, 'Director'),
    ]

    nombre = models.CharField(max_length=255)
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES)
    foto = models.ImageField(upload_to='personas/')

    def __str__(self):
        return self.nombre
