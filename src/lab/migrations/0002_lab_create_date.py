# Generated by Django 3.2.2 on 2023-07-16 14:31

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('lab', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='lab',
            name='create_date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]