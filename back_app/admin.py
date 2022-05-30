from django.contrib import admin

from back_app.models import CustomUser, Patient, Note


@admin.register(CustomUser)
class UserAdmin(admin.ModelAdmin):
    pass


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    pass


@admin.register(Note)
class NotesAdmin(admin.ModelAdmin):
    pass
# Register your models here.
