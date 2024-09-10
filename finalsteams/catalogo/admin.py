from django.contrib import admin
from catalogo.models.usuario import Usuario
from catalogo.models.categoria import Categoria
from catalogo.models.juego import Juego
from catalogo.models.capturadepantalla import CapturaPantalla
from catalogo.models.compra import Compra

admin.site.register(Usuario)
admin.site.register(Categoria)
admin.site.register(Juego)
admin.site.register(CapturaPantalla)
admin.site.register(Compra)
