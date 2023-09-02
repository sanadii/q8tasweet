# Generated by Django 4.2.2 on 2023-08-17 15:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("restapi", "0065_campaignmembers_commiittee_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="ElectionCommittees",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=255)),
                ("location", models.TextField(blank=True, null=True)),
                ("created_date", models.DateTimeField(auto_now_add=True)),
                ("updated_date", models.DateTimeField(auto_now=True)),
                ("deleted_date", models.DateTimeField(auto_now=True)),
                ("deleted", models.BooleanField(default=False)),
                (
                    "created_by",
                    models.ForeignKey(
                        default=1,
                        on_delete=django.db.models.deletion.SET_DEFAULT,
                        related_name="created_committees",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "deleted_by",
                    models.ForeignKey(
                        default=1,
                        on_delete=django.db.models.deletion.SET_DEFAULT,
                        related_name="deleted_committees",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "election",
                    models.ForeignKey(
                        default=1,
                        on_delete=django.db.models.deletion.SET_DEFAULT,
                        related_name="election_committees",
                        to="restapi.elections",
                    ),
                ),
                (
                    "updated_by",
                    models.ForeignKey(
                        default=1,
                        on_delete=django.db.models.deletion.SET_DEFAULT,
                        related_name="updated_committees",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "db_table": "election_committees",
            },
        ),
    ]
