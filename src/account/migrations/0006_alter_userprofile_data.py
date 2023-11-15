# Generated by Django 3.2.2 on 2023-08-25 16:38

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0005_rename_up_id_userprofile_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='data',
            field=django.contrib.postgres.fields.jsonb.JSONField(default={'savedJobs': [], 'savedLabs': []}),
        ),
    ]