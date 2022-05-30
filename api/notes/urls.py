from django.urls import path, include
from rest_framework import routers

from api.notes.views import NotesViewSet

router = routers.SimpleRouter()
router.register('notes', NotesViewSet)

urlpatterns = [
    path('', include(router.urls))
]
