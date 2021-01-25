# Generated by Django 3.1.5 on 2021-01-24 17:40

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0004_auto_20210124_0243'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='likes_num',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='comment',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2021, 1, 24, 19, 40, 45, 760281)),
        ),
        migrations.AlterField(
            model_name='likes',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2021, 1, 24, 19, 40, 45, 761281)),
        ),
        migrations.AlterField(
            model_name='post',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2021, 1, 24, 19, 40, 45, 759281)),
        ),
        migrations.AlterField(
            model_name='unlikes',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2021, 1, 24, 19, 40, 45, 762281)),
        ),
    ]