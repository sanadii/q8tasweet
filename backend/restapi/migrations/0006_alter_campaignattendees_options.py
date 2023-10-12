# Generated by Django 4.2.2 on 2023-10-06 05:51

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("restapi", "0005_campaignattendees_delete_electionattendees"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="campaignattendees",
            options={
                "permissions": [
                    ("can_edit_campaign", "Can edit campaign"),
                    ("can_view_guarantees", "Can view guarantees"),
                    ("can_view_attendees", "Can view attendees"),
                    ("can_view_sorting", "Can view sorting"),
                ],
                "verbose_name": "Election Attendee",
                "verbose_name_plural": "Election Attendees",
            },
        ),
    ]