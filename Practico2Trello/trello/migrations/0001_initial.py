# Generated by Django 5.1.1 on 2024-09-24 20:19

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Tablero',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tableros', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Lista',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('orden', models.IntegerField(default=0)),
                ('tablero', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='listas', to='trello.tablero')),
            ],
        ),
        migrations.CreateModel(
            name='Tarea',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('texto', models.TextField()),
                ('orden', models.IntegerField(default=0)),
                ('archivado', models.BooleanField(default=False)),
                ('lista', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tareas', to='trello.lista')),
            ],
        ),
    ]