from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print("Datos recibidos en el backend:", data)  # <-- Imprime los datos recibidos
        except json.JSONDecodeError:
            return JsonResponse({'detail': 'Invalid JSON'}, status=400)

        username = data.get('username')
        password = data.get('password')
        email = data.get('email', '')  # Email opcional

        if not username or not password:
            return JsonResponse({'detail': 'Falta nombre de usuario o contraseña'}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({'detail': 'El nombre de usuario ya existe.'}, status=400)

        user = User.objects.create_user(username=username, password=password, email=email)
        return JsonResponse({'message': 'Usuario creado con éxito'}, status=201)

    return JsonResponse({'detail': 'Invalid method'}, status=405)
