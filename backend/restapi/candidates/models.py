# Categories Model
from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator, MaxValueValidator

from restapi.modelsHelper import TrackModel, GenderOptions
from restapi.validators import today

class Candidates(TrackModel):
    # Basic Information
    name = models.CharField(max_length=255, blank=False, null=False)
    gender = models.IntegerField(choices=GenderOptions.choices, null=True, blank=True)
    image = models.ImageField(upload_to="users/", blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    # date_of_birth = models.DateField(null=True, blank=True, validators=[MaxValueValidator(limit_value=today)])

    # Contacts
    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    twitter = models.CharField(max_length=255, blank=True, null=True)
    instagram = models.CharField(max_length=255, blank=True, null=True)

    # Education & Career
    education = models.CharField(max_length=255, blank=True, null=True)
    position = models.CharField(max_length=255, blank=True, null=True)
    party = models.CharField(max_length=100, blank=True, null=True)

    # Taxonomies (Categories and Tags)
    tags = models.CharField(max_length=255, blank=True, null=True)

    # Administration
    moderators = models.CharField(max_length=255, blank=True, null=True)
    status = models.IntegerField(blank=True, null=True)
    priority = models.IntegerField(blank=True, null=True)
    class Meta:
        db_table = "candidate"
        verbose_name = "Candidate"
        verbose_name_plural = "Candidates"

    def __str__(self):
        return self.name
    