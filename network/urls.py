
from django.urls import path

from . import views
from django.conf.urls import url

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("following", views.following, name="Following"),
    path("profile/<int:profile_id>", views.profile, name="profile"),
    path("addpost", views.addpost, name="addpost"),
    path("like/<int:post_id>",views.like,  name="like"),
    path("addcomment/<int:post_id>", views.add_comment, name="addcomment"),
    path("follow/<int:profile_id>", views.add_follow, name="addfollow"),
    path("unfollow/<int:profile_id>", views.unfollow, name="unfollow"),
    path("unlike/<int:post_id>",views.unlike,  name="unlike"),
    path("edit/<int:post_id>",views.edit,  name="edit"),
    url(r'^ajax/validate_email/$', views.validate_email, name='validate_email'),


]
