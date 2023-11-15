# Generated by Django 3.2.2 on 2023-07-12 14:31

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_delete_userprofile'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('up_id', models.AutoField(primary_key=True, serialize=False)),
                ('data', django.contrib.postgres.fields.jsonb.JSONField()),
            ],
        ),
        migrations.DeleteModel(
            name='SavedLabs',
        ),
    ]