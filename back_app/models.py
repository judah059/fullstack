from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from back_app.managers import UserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(
        max_length=123,
        null=True,
        blank=True,
    )
    email = models.EmailField(
        db_index=True,
        unique=True,
    )
    is_active = models.BooleanField(
        default=True,
    )
    is_staff = models.BooleanField(
        default=False,
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return self.email


class Patient(models.Model):
    first_name = models.CharField(
        max_length=100,
    )
    last_name = models.CharField(
        max_length=100,
    )


class Note(models.Model):
    patient_obj = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE,
        related_name='notes',
    )
    content = models.TextField()
    created_at = models.DateTimeField(
        auto_now_add=True,
    )
# Create your models here.
