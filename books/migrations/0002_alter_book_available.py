# Generated by Django 5.0.7 on 2024-07-18 11:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='available',
            field=models.BooleanField(default=False),
        ),
    ]
