from rest_framework import serializers

from api.patients.serializers import PatientSerializer
from back_app.models import Note


class NotesGetSerializer(serializers.ModelSerializer):
    patient_obj = PatientSerializer()

    class Meta:
        model = Note
        fields = '__all__'


class NotesPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = (
            'patient_obj',
            'content',
        )
