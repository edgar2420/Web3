from django.shortcuts import render, redirect
from catalogo.forms.compra import CompraForm

def registrar_compra(request):
    if request.method == 'POST':
        form = CompraForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('catalogo:detalle_juego', id=form.cleaned_data['juego'].id)
    else:
        form = CompraForm()
    return render(request, 'catalogo/compra.html', {'form': form})
