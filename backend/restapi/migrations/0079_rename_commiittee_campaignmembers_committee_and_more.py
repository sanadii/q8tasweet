# Generated by Django 4.2.3 on 2023-08-24 03:54

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("restapi", "0078_remove_campaignmembers_role_campaignmembers_civil_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="campaignmembers",
            old_name="commiittee",
            new_name="committee",
        ),
        migrations.RemoveField(
            model_name="elections",
            name="description",
        ),
    ]
