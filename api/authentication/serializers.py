from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from back_app.models import CustomUser


class CustomJWTSerializer(TokenObtainPairSerializer):
    email = serializers.CharField()

    def validate(self, attrs):
        credentials = {
            'email': '',
            'password': attrs.get("password")
        }

        user_obj = CustomUser.objects.filter(email=attrs.get("email")).first()
        if user_obj:
            credentials['email'] = user_obj.email

        return super().validate(credentials)



