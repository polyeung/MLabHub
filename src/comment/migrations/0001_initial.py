# Generated by Django 3.2.2 on 2023-06-03 21:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('lab', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.IntegerField()),
                ('name', models.CharField(max_length=20)),
                ('word', models.CharField(max_length=300)),
                ('labid', models.ForeignKey(db_column='labid', on_delete=django.db.models.deletion.CASCADE, to='lab.lab')),
            ],
            options={
                'db_table': 'comments',
            },
        ),
    ]