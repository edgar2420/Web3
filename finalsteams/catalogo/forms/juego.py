from django import forms
from catalogo.models import Juego, Categoria

class JuegoForm(forms.ModelForm):
    class Meta:
        model = Juego
        fields = ['nombre', 'descripcion', 'precio', 'categoria', 'imagen']
        widgets = {
            'categoria': forms.Select(attrs={'class': 'form-control'}),  # Renderiza el campo como un dropdown
        }
