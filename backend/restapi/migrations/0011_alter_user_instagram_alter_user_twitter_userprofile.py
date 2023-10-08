# Generated by Django 4.2.2 on 2023-10-06 18:54

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("restapi", "0010_alter_user_table"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="instagram",
            field=models.CharField(
                blank=True,
                max_length=150,
                validators=[
                    django.core.validators.RegexValidator(
                        code="invalid_username",
                        message="Usernames can only contain letters, numbers, dots, and underscores.",
                        regex="^[a-zA-Z0-9_.]*$",
                    )
                ],
                verbose_name="Instagram Username",
            ),
        ),
        migrations.AlterField(
            model_name="user",
            name="twitter",
            field=models.CharField(
                blank=True,
                max_length=150,
                validators=[
                    django.core.validators.RegexValidator(
                        code="invalid_username",
                        message="Usernames can only contain letters, numbers, dots, and underscores.",
                        regex="^[a-zA-Z0-9_.]*$",
                    )
                ],
                verbose_name="Twitter Username",
            ),
        ),
        ]
