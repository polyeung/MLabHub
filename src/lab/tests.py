from django.test import TestCase
from django.utils import timezone
from .models import Lab
from comment.models import Comment

class LabModelTest(TestCase):
    def setUp(self):
        self.lab = Lab.objects.create(
            name="Test Lab",
            link="http://example.com",
            intro="Test Lab Introduction",
            people="John Doe",
            funding="Private",
            dep="Biology",
            approved=True,
            emails="contact@example.com",
            creator_id=1,
            create_date=timezone.now()
        )

        self.comment1 = Comment.objects.create(
            labid=self.lab,
            rating=5,
            name="Test User",
            word="Great Lab1!"
        )

        self.comment2 = Comment.objects.create(
            labid=self.lab,
            rating=5,
            name="Test User",
            word="Great Lab2!"
        )

    def test_delete_lab_cascades_to_comments(self):
        self.lab.delete()

        comments_count = Comment.objects.filter(labid=self.lab.id).count()
        self.assertEqual(comments_count, 0)
