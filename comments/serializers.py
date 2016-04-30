from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Comment
        fields = ('id', 'owner', 'title')


class UserSerializer(serializers.ModelSerializer):
    comments = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Comment.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'comments')
