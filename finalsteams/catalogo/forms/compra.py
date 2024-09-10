from django import forms
from catalogo.models.compra import Compra

class CompraForm(forms.ModelForm):
    class Meta:
        model = Compra
        fields = ['usuario', 'juego']
        widgets = {
            'usuario': forms.HiddenInput(),
            'juego': forms.HiddenInput(),
        }
