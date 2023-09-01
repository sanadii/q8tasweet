# Generated by Django 4.2.2 on 2023-07-12 07:17

from django.db import migrations, models
import django


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Elections',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('image', models.ImageField(blank=True,
                 null=True, upload_to='elections/')),
                ('title', models.CharField(blank=True, max_length=255, null=True)),
                ('description', models.CharField(
                    blank=True, max_length=255, null=True)),
                ('duedate', models.DateField(blank=True, null=True)),
                ('category', models.CharField(
                    blank=True, max_length=255, null=True)),
                ('sub_category', models.CharField(
                    blank=True, max_length=255, null=True)),
                ('tags', models.CharField(
                    blank=True, max_length=255, null=True)),
                ('moderators', models.CharField(
                    blank=True, max_length=255, null=True)),
                ('candidates', models.CharField(
                    blank=True, max_length=255, null=True)),
                ('committees', models.CharField(
                    blank=True, max_length=255, null=True)),
                ('status', models.CharField(blank=True, max_length=255, null=True)),
                ('priority', models.CharField(blank=True, max_length=255, null=True)),
                ('del_flag', models.IntegerField(blank=True, null=True)),
                ('created_by', models.IntegerField(blank=True, null=True)),
                ('created_date', models.DateTimeField(blank=True, null=True)),
                ('updated_by', models.IntegerField(blank=True, null=True)),
                ('updated_date', models.DateTimeField(blank=True, null=True)),
            ],
            options={
                'db_table': 'elections',
            },
        ),
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
                ('sub_group', models.ForeignKey(blank=True, null=True,
                 on_delete=django.db.models.deletion.CASCADE, to='restapi.terms')),
            ],
            options={
                'db_table': 'terms',
            },
        ),
        migrations.CreateModel(
            name='ProjectInfo',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('data', models.JSONField()),
            ],
        ),
    ]
