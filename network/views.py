from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render ,redirect
from django.urls import reverse

from .models import *
from django import forms

from django.http import JsonResponse


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['description','img','active']




def index(request):
    

    all_posts = Post.objects.all()
    all_likes = likes.objects.all()
    comments = comment.objects.all()
    context = {
        'all_likes':all_likes,
        'all_posts':all_posts,
        'comments':comments,
    }
    
    return render(request,'network/index.html',context)

    


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request): 
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


def following(request):
    
    all_posts = []
    following = follow.objects.filter(follower_id = request.user)
    id_of_following_list = []
    for account in following:
        id_of_following_list.append(account.following_id)
    for user_id in id_of_following_list:
        all_posts.append (Post.objects.filter(user_id=user_id))
    all_posts_for_all_users = Post.objects.all()
    #print ('all_posts_for_all_users :', all_posts_for_all_users)
    #print ("all_posts : " ,all_posts)
    
    all_likes = likes.objects.all()
    comments = comment.objects.all()
    if len(all_posts) == 0:
        message = "you aren't follow any one"
        return render(request, "network/following.html",{'message':message})
    context = {
        'all_likes':all_likes,
        'all_posts':all_posts[0],
        'comments':comments,
    }

    return render(request, "network/index.html",context)





def add_follow(request, profile_id):
    
    add_follow = follow()
    add_follow.follower_id = request.user
    followingid = profile_id
    add_follow.following_id = User.objects.get(id=followingid)
    add_follow.save()

    followers = follow.objects.filter(following_id=profile_id)
    following = follow.objects.filter(follower_id=profile_id)
    all_posts = Post.objects.filter(user_id=profile_id)
    all_likes = likes.objects.all()
    comments = comment.objects.all()
    follows = follow.objects.filter(follower_id=request.user,following_id=profile_id)
    context = {
        'followers' :len(followers),
        'following' :len(following),
        'all_likes':all_likes,
        'all_posts':all_posts,
        'comments':comments,
        'profile_id' : profile_id,
        'follows' :follows
    }

    return render(request, "network/index.html",context)

    




def unfollow(request, profile_id):
    remove_follow = follow.objects.filter( following_id=profile_id , follower_id = request.user)
    remove_follow.delete()

    followers = follow.objects.filter(following_id=profile_id)
    following = follow.objects.filter(follower_id=profile_id)
    all_posts = Post.objects.filter(user_id=profile_id)
    all_likes = likes.objects.all()
    comments = comment.objects.all()
    context = {
        'followers' :len(followers),
        'following' :len(following),
        'all_likes':all_likes,
        'all_posts':all_posts,
        'comments':comments,
        'profile_id' : profile_id,
        
    }

    return render(request, "network/index.html",context)

    




def profile(request, profile_id):
    followers = follow.objects.filter(following_id=profile_id)
    following = follow.objects.filter(follower_id=profile_id)
    name =  User.objects.get(id=profile_id)

    all_posts = Post.objects.filter(user_id=profile_id)
    all_likes = likes.objects.all()
    comments = comment.objects.all()
    follows = follow.objects.filter(follower_id=request.user,following_id=profile_id)
    context = {
        'followers' :len(followers),
        'following' :len(following),
        'all_likes':all_likes,
        'all_posts':all_posts,
        'comments':comments,
        'profile_id' : profile_id,
        'name': name,
        'follows':follows
    }

    return render(request, "network/index.html",context)


def addpost(request):
    if request.method == 'POST':
        form = PostForm(request.POST,request.FILES)
        if form.is_valid():
            new_form = form.save(commit=False)
            new_form.user_id = request.user
            new_form.active = True
            new_form.save()

        
        return redirect ('/')

    else:
        form = PostForm()
    context = {
        "form":form,
    }
    return render(request,'network/create.html',context)





def like(request, post_id):
    edit_post_like = Post.objects.get(id=post_id)
    edit_post_like.likes_num += 1
    edit_post_like.save()

    new_like = likes()
    new_like.user_id = request.user
    new_like.post_id = Post.objects.get(id=post_id)
    new_like.save()
    edit_post_like = Post.objects.get(id=post_id)
    all_posts = Post.objects.all()
    all_likes = likes.objects.all()
    context = {
        'all_likes':all_likes,
        'all_posts':all_posts
    }
    return redirect ('/',context)



def edit(request, post_id):
    post = Post.objects.get(id=post_id)
    if request.method == 'POST':
        form = PostForm(request.POST ,instance=post)
        if form.is_valid():
            new_form = form.save(commit=False)
            new_form.user = request.user
            new_form.save()
        return redirect ('/')
    else:
        form = PostForm(instance=post)

    context = {
        "description":post.description,
        "form":form
    }
    return render(request,'network/create.html',context)





def unlike(request, post_id):
    edit_post_like = Post.objects.get(id=post_id)
    edit_post_like.likes_num -= 1
    edit_post_like.save()

    like = likes.objects.filter(post_id=post_id,user_id=request.user)
    like.delete()
    all_posts = Post.objects.all()
    all_likes = likes.objects.all()
    context = {
        'all_likes':all_likes,
        'all_posts':all_posts
    }
    return redirect ('/',context)
    

def add_comment(request,post_id):
        new_comment = comment()
        new_comment.comment = request.POST["newcomment"]
        new_comment.post_id = Post.objects.get(id=post_id)
        new_comment.user_id = request.user
        new_comment.save()

        all_posts = Post.objects.all()
        all_likes = likes.objects.all()
        comments = comment.objects.all()
        context = {
            'all_likes':all_likes,
            'all_posts':all_posts,
            'comments':comments,
        }

        return redirect ('/',context)

# show if emailadress is existing or not during register by using ajax
def validate_email(request):
    email = request.GET.get('email', None)
    data = {
        'is_taken': User.objects.filter(email=email).exists()
    }
    return JsonResponse(data)