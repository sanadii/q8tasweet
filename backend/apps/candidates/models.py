from unidecode import unidecode
from django.db import models
from django.utils.text import slugify
import uuid

from helper.models_helper import TrackModel, TaskModel, GenderOptions

class Candidate(TrackModel, TaskModel):
    # Basic Information
    name = models.CharField(max_length=255, blank=False, null=False)
    slug = models.SlugField(max_length=255, unique=True, blank=True, null=True)
    gender = models.IntegerField(choices=GenderOptions.choices, null=True, blank=True)
    image = models.ImageField(upload_to="candidates/", blank=True, null=True)
    tags = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = "candidate"
        verbose_name = "Candidate"
        verbose_name_plural = "Candidates"
        default_permissions = []
        permissions  = [
            ("canViewCandidate", "Can View Candidate"),
            ("canAddCandidate", "Can Add Candidate"),
            ("canChangeCandidate", "Can Change Candidate"),
            ("canDeleteCandidate", "Can Delete Candidate"),
        ]
        
    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            transliterated_name = unidecode(self.name)
            self.slug = slugify(transliterated_name) + '-' + str(uuid.uuid4())[:8]
        super().save(*args, **kwargs)
