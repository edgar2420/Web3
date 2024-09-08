from django import forms
from catalogo.models.usuario import Usuario

class UsuarioForm(forms.ModelForm):
    class Meta:
        model = Usuario
        fields = ['nombre', 'email', 'password', 'profile_picture']
        widgets = {
            'password': forms.PasswordInput(),
        }
