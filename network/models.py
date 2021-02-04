from django.contrib.auth.models import AbstractUser
from django.db import models

import datetime
from django.utils import timezone


class User(AbstractUser):
    pass


class Post (models.Model):
    user_id = models.ForeignKey(User , on_delete=models.CASCADE ,related_name="userid")
    description = models.TextField(default='')
    img = models.ImageField(upload_to='post_img',null=True ,blank=True)
    created = models.DateTimeField(default=datetime.datetime.now())
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.img}&{self.description}"



class comment (models.Model):
    user_id = models.ForeignKey(User , on_delete=models.CASCADE )
    post_id = models.ForeignKey(Post , on_delete=models.CASCADE )
    comment = models.TextField(default='')
    created = models.DateTimeField(default=datetime.datetime.now())


class likes (models.Model):
    user_id = models.ForeignKey(User , on_delete=models.CASCADE )
    post_id = models.ForeignKey(Post , on_delete=models.CASCADE )
    created = models.DateTimeField(default=datetime.datetime.now())




class unlikes (models.Model):
    user_id = models.ForeignKey(User , on_delete=models.CASCADE )
    post_id = models.ForeignKey(Post , on_delete=models.CASCADE )
    created = models.DateTimeField(default=datetime.datetime.now())




class follow (models.Model):
    follower_id = models.ForeignKey(User , on_delete=models.CASCADE ,related_name='follower' )
    following_id = models.ForeignKey(User , on_delete=models.CASCADE ,related_name='following')