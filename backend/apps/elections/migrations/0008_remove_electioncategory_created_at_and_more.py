# Generated by Django 4.2.2 on 2023-11-01 06:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('elections', '0007_electioncategory_alter_election_category_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='electioncategory',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='electioncategory',
            name='created_by',
        ),
        migrations.RemoveField(
            model_name='electioncategory',
            name='deleted',
        ),
        migrations.RemoveField(
            model_name='electioncategory',
            name='deleted_at',
        ),
        migrations.RemoveField(
            model_name='electioncategory',
            name='deleted_by',
        ),
        migrations.RemoveField(
            model_name='electioncategory',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='electioncategory',
            name='updated_by',
        ),
        migrations.AlterField(
            model_name='electioncategory',
            name='slug',
            field=models.SlugField(null=True, unique=True),
        ),
    ]
