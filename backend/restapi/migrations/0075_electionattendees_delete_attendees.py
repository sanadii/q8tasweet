# Generated by Django 4.2.2 on 2023-08-18 08:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("restapi", "0074_alter_campaignguarantees_civil_alter_electors_table"),
    ]

    operations = [
        migrations.CreateModel(
            name="ElectionAttendees",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                ("notes", models.TextField(blank=True, null=True)),
                ("status", models.IntegerField(blank=True, null=True)),
                ("created_date", models.DateTimeField(auto_now_add=True)),
                ("updated_date", models.DateTimeField(auto_now=True)),
                ("deleted_date", models.DateTimeField(auto_now=True)),
                ("deleted", models.BooleanField(default=False, null=True)),
                (
                    "civil",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="electionAttendees",
                        to="restapi.electors",
                    ),
                ),
                (
                    "created_by",
                    models.ForeignKey(
                        default=1,
                        on_delete=django.db.models.deletion.SET_DEFAULT,
                        related_name="created_guarantee_users",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "deleted_by",
                    models.ForeignKey(
                        default=1,
                        on_delete=django.db.models.deletion.SET_DEFAULT,
                        related_name="deleted_guarantee_users",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "election",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="attendee_elections",
                        to="restapi.elections",
                    ),
                ),
                (
                    "updated_by",
                    models.ForeignKey(
                        default=1,
                        on_delete=django.db.models.deletion.SET_DEFAULT,
                        related_name="updated_guarantee_users",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="attendee_users",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "db_table": "electection_attendee",
            },
        ),
        migrations.DeleteModel(
            name="Attendees",
        ),
    ]
