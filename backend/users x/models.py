from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager



class CustomAccountManager(BaseUserManager):
    def create_superuser(self, email, username, first_name, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, username, first_name, password, **other_fields)

    def create_user(self, email, username, first_name, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, username=username,
                          first_name=first_name, **other_fields)
        user.set_password(password)
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    id = models.BigAutoField(primary_key=True)
    email = models.EmailField(_('email address'), unique=True)
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)  # New
    image = models.ImageField(upload_to='users/', null=True, blank=True)  # New
    background = models.ImageField(upload_to='background/', null=True, blank=True)  # New
    

    # User Information
    civil = models.CharField(max_length=12, null=True, blank=True)  # New
    gender = models.IntegerField(blank=True, null=True)
    date_of_birth = models.DateField(null=True, blank=True)  # New
    description = models.TextField(_('description'), max_length=500, blank=True)

    # User Contact
    mobile = models.CharField(max_length=15, blank=True)  # New
    twitter = models.CharField(max_length=150, blank=True)  # New
    instagram = models.CharField(max_length=150, blank=True)  # New
    
    # User Permissions
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    created_date = models.DateTimeField(default=timezone.now)

    objects = CustomAccountManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name']

    def __str__(self):
        return self.username