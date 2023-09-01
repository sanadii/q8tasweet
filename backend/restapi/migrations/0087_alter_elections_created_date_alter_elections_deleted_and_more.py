# Generated by Django 4.2.3 on 2023-08-29 16:58

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("restapi", "0086_alter_areas_created_by_alter_areas_deleted_by_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="elections",
            name="created_date",
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name="elections",
            name="deleted",
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AlterField(
            model_name="elections",
            name="deleted_date",
            field=models.DateTimeField(auto_now=True, null=True),
        ),
        migrations.AlterField(
            model_name="elections",
            name="updated_date",
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]
