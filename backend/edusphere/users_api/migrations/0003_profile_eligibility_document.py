# Generated by Django 5.0.6 on 2024-07-09 03:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users_api', '0002_profile_role'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='eligibility_document',
            field=models.FileField(blank=True, null=True, upload_to='eligibility_documents/'),
        ),
    ]
