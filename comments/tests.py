from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.test import TestCase

from .models import Comment


class TestComment(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='test_user',
            password='123'
        )

    def test_create_comment(self):
        comment = Comment.objects.create(owner=self.user, title='test')
        comment.save()
        self.assertIsInstance(comment, Comment)
        self.assert_(comment.created)


class TestViews(TestCase):
    def test_get_api(self):
        response = self.client.get(reverse('api:comment-list'))
        self.assertEqual(response.status_code, 200)

    def test_get_invalid(self):
        response = self.client.get(reverse('api:comment-detail', args=(100,)))
        self.assertEqual(response.status_code, 404)
