# Category Model
from django.db import models
from django_extensions.db.fields import AutoSlugField
from django.utils.text import slugify
import uuid

from helper.models_helper import TrackModel

class Category(TrackModel):
    name = models.CharField(max_length=255, null=True, blank=True)
    slug = AutoSlugField(populate_from='get_dynamic_name', unique=True, null=True)
    parent = models.ForeignKey("self", on_delete=models.CASCADE, null=True, blank=True)
    image = models.ImageField(upload_to="elections/", null=True, blank=True)
    slug = models.SlugField(unique=True, null=True, blank=True)
    description = models.TextField(max_length=255, null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "category"
        verbose_name = "Category"
        verbose_name_plural = "Category"
        default_permissions = []


    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name() + '-' + str(uuid.uuid4())[:8])
        super().save(*args, **kwargs)

class Tag(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    slug = models.SlugField(unique=True, null=True, blank=True)

    class Meta:
        db_table = "Tag"
        verbose_name = "Tag"
        verbose_name_plural = "Tag"
        default_permissions = []


    def __str__(self):
        return self.name

class Area(TrackModel):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    parent = models.ForeignKey("self", on_delete=models.CASCADE, null=True, blank=True)
    image = models.ImageField(upload_to="categories/", null=True, blank=True)
    slug = models.SlugField(unique=True, null=True, blank=True)
    description = models.TextField(max_length=255, null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "area"
        verbose_name = "Area"
        verbose_name_plural = "Area"
        default_permissions = []

    def __str__(self):
        return self.name
   