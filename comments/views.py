import redis

from rest_framework import viewsets

from .models import Comment
from .serializers import CommentSerializer


class CommentViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    r = redis.StrictRedis(host='localhost', port=6379, db=0)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        self.r.publish('test', 'Created')

    def perform_destroy(self, instance):
        viewsets.ModelViewSet.perform_destroy(self, instance)
        self.r.publish('test', 'Destroyed')
