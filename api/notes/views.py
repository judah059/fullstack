from rest_framework import viewsets

from api.notes.serializers import NotesGetSerializer, NotesPostSerializer
from back_app.models import Note


class NotesViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return NotesGetSerializer
        else:
            return NotesPostSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        kw = self.request.GET.get('kw')
        patient_id = self.request.GET.get('id')
        if kw:
            return qs.filter(content__icontains=kw)
        return qs.filter(patient_obj__id=patient_id)
