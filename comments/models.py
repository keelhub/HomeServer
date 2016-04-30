from django.db import models


class Comment(models.Model):
    owner = models.ForeignKey('auth.User', related_name='comments')
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=250, blank=True, default='')

    class Meta:
        ordering = ('created',)
