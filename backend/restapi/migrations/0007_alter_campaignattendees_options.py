# Generated by Django 4.2.2 on 2023-10-06 06:00

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("restapi", "0006_alter_campaignattendees_options"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="campaignattendees",
            options={
                "verbose_name": "Election Attendee",
                "verbose_name_plural": "Election Attendees",
            },
        ),
    ]
