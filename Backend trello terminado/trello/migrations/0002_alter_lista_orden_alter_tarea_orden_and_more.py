# Generated by Django 5.1.1 on 2024-09-25 19:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trello', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lista',
            name='orden',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='tarea',
            name='orden',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='tarea',
            name='texto',
            field=models.CharField(max_length=255),
        ),
    ]
