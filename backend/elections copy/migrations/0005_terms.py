# Generated by Django 4.2.2 on 2023-07-12 16:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('elections', '0004_candidates'),
    ]

    operations = [
        migrations.CreateModel(
            name='Terms',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('image', models.ImageField(blank=True, null=True, upload_to='terms/')),
                ('slug', models.SlugField(unique=True)),
                ('group', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('sub_group', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='elections.terms')),
            ],
            options={
                'db_table': 'Terms',
            },
        ),
    ]
