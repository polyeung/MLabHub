# Generated by Django 3.2.2 on 2023-08-30 16:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lab', '0004_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pic',
            name='lab',
            field=models.ForeignKey(db_column='labs', on_delete=django.db.models.deletion.CASCADE, related_name='pic', to='lab.lab'),
        ),
    ]
