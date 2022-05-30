from django.urls import path, include
from rest_framework import routers

from api.patients.views import PatientViewSet

router = routers.SimpleRouter()
router.register('patients', PatientViewSet)

urlpatterns = [
    path('', include(router.urls))
]
