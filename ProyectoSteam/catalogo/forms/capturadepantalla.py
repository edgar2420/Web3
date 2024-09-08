from django import forms
from catalogo.models.capturadepantalla import CapturaPantalla

class CapturaPantallaForm(forms.ModelForm):
    class Meta:
        model = CapturaPantalla
        fields = ['juego', 'imagen']
