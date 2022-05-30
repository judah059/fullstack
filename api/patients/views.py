from django.db.models import Q
from rest_framework import viewsets

from api.patients.serializers import PatientSerializer
from back_app.models import Patient


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        kw = self.request.GET.get('kw')
        firstname_q = Q(first_name__icontains=kw)
        lastname_q = Q(last_name__icontains=kw)
        if kw:
            return qs.filter(firstname_q | lastname_q)
        return qs.all()

