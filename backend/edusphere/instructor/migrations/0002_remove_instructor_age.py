# Generated by Django 5.0.6 on 2024-07-15 10:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('instructor', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='instructor',
            name='age',
        ),
    ]
