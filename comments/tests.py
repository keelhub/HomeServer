from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.test import TestCase

from .models import Comment

def create_user():
    return User.objects.create_user(username='test_user', password='123')


def create_comment():
    comment = Comment.objects.create(owner=create_user(), title='test')
    comment.save()
    return comment


class TestComment(TestCase):
    def test_create_comment(self):
        comment = create_comment()
        self.assertIsInstance(comment, Comment)
        self.assert_(comment.created)


class TestViews(TestCase):
    def test_get_api(self):
        response = self.client.get(reverse('api:comment-list'))
        self.assertEqual(response.status_code, 200)

    def test_get_invalid(self):
        response = self.client.get(reverse('api:comment-detail', args=(100,)))
        self.assertEqual(response.status_code, 404)

    def test_new_comment(self):
        c = create_comment()
        response = self.client.get(reverse('api:comment-detail', args=(c.id,)))
        self.assertEqual(response.status_code, 200)
