# Generated by Django 3.1.5 on 2021-01-24 00:43

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0003_auto_20210120_0151'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2021, 1, 24, 2, 43, 57, 281636)),
        ),
        migrations.AlterField(
            model_name='likes',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2021, 1, 24, 2, 43, 57, 282636)),
        ),
        migrations.AlterField(
            model_name='post',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2021, 1, 24, 2, 43, 57, 280636)),
        ),
        migrations.CreateModel(
            name='unlikes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(default=datetime.datetime(2021, 1, 24, 2, 43, 57, 283636))),
                ('post_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='network.post')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
