# Generated by Django 3.2.2 on 2023-08-25 16:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobpage', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobdata',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
