from django import forms
from catalogo.forms.form_utils import password_bootstrap_field, input_bootstrap_field

class LoginForm(forms.Form):
    username = forms.EmailField(max_length=100, widget=input_bootstrap_field, label='Correo electrónico')
    password = forms.CharField(widget=password_bootstrap_field, max_length=100, label='Contraseña')

