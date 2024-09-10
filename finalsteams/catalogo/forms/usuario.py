from django import forms
from catalogo.models.usuario import Usuario

class UsuarioForm(forms.ModelForm):
    class Meta:
        model = Usuario
        fields = ['username', 'nombre', 'email', 'password', 'profile_picture']
        widgets = {
            'password': forms.PasswordInput(),
        }

    def save(self, commit=True):
        usuario = super().save(commit=False)
        usuario.set_password(self.cleaned_data['password'])
        if commit:
            usuario.save()
        return usuario
