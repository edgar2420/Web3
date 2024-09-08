from django import forms
from catalogo.models.juego import Juego

class JuegoForm(forms.ModelForm):
    class Meta:
        model = Juego
        fields = ['nombre', 'descripcion', 'precio', 'categoria']
