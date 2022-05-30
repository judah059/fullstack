from django.urls import path, include

from api.notes import urls as notes_urls
from api.patients import urls as patients_urls

urlpatterns = [
    path('', include(notes_urls)),
    path('', include(patients_urls)),

]
