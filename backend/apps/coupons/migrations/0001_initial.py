# Generated by Django 3.2.16 on 2023-02-16 18:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FixedPriceCoupon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('discount_price', models.DecimalField(decimal_places=2, max_digits=5)),
            ],
        ),
        migrations.CreateModel(
            name='PercentageCoupon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('discount_percentage', models.IntegerField()),
            ],
        ),
    ]
