


      $("#comment-form").submit(function (e) {
        // preventing from page reload and default actions
        e.preventDefault();
    
        var $form = $(this),
          csrf_token = $form.find("input[name='csrfmiddlewaretoken']").val(),
          comment = $form.find("input[name='newcomment']").val(),
          url = $form.attr('action');
        console.log(comment)
        console.log(url)
        var posting = $.post(url, { newcomment: comment, csrfmiddlewaretoken: csrf_token })
        posting.done(function (data) {
          console.log(data)
          var content = $(data).find("#all-comments");
          $("#all-comments").empty().append(content);
        })




        // html bassam

         {% extends "network/layout.html" %}
{% load static %}
{% block body %}

    {%if profile_id%}
    <div style="color:red;" ><strong><i>{{name}}   </i></strong></div >
    <div >
        following : {{following}}
        <br>
        followers : {{followers}}
    </div>
    {% if user.is_authenticated %}
    {%if user.id != profile_id %}
        {%if follows%}
        <a href="{% url 'unfollow' profile_id%}" method="POST" class="btn btn-primary btn-lg" name="removefollow">unfollow</a>
        {%else%}
        <a href="{% url 'addfollow' profile_id%}" method="POST" class="btn btn-primary btn-lg" name="addfollow">follow</a>
        {%endif%}
    {%endif%}                                                                    
    {%endif%}
    {%endif%}
    {% if user.is_authenticated %}
    <a href="{% url 'addpost'%}" class="btn btn-primary btn-lg" name="addpost">NEW POST</a>
    {%endif%}
    
        <h2 style="color:gray;">posts</h2>
    <div  class="container">
        <main class="tm-main">            
            <div id='total' class="row tm-row">
                {% for post in all_posts %}
                <article height='100px' >
                    <hr  class="tm-hr-primary">
                    <div>created by <a href="{% url 'profile' post.user_id.id%}"> {{post.user_id.username}}</a></div>
                    

                    <div class="card" style="width: 50rem; height: auto;">
                        <div class="card-body">
                            <h5 class="card-title">{{post.description}}</h5>
                        </div>
                        {% if post.img %}
                        <img style="height:270px;" class="card-img-top" src="{{post.img.url}}" alt="Card image cap">
                        {% endif %}    
                        <p class="card-text" style="color:red;" ><small  >created in : {{post.created}}</small></p>
                    </div>
                    <div id='countLiked'>{{post.likes_num}} likes </div>


                    {% if user.is_authenticated %}

                   {% comment %} <div><a href="{% url 'like' post.id%}" class="btn btn-primary " id="like:{{post.id}}" name="like">like</a></div> {% endcomment %}
                    <form action="{% url 'like' post.id %}" method='POST' id='likeForm'>
                    {% csrf_token %}
                    <input class="btn btn-primary" id='likeButton' type="submit" value="like">
                    </form>

                    {%for like in all_likes%} 
                    {%if like.post_id.id == post.id and like.user_id.id == user.id%}
                   
                   
                    <div><a href="{% url 'unlike' post.id%}" class="btn btn-primary" id="unlike:{{post.id}}" name="unlike">unlike</a></div>
                    {% comment %} <div><a style="display:none" href="{% url 'like' post.id%}" class="btn btn-primary " id="like:{{post.id}}" name="like">like</a></div> {% endcomment %}

                    {%endif%}
                    {%endfor%}

                    
                    {% endif %} 



                        <div>
                            <hr  class="tm-hr-primary">
                            <div><strong>Comments</strong></div>
                            <hr  class="tm-hr-primary">
                            <div id="all-comments">
                            {%for comment in comments%}
                            {% if comment.post_id.id == post.id %}
                                    <div><i style="color:Gray;">by : {{comment.user_id}}</i></div>
                                    {{comment.comment}}
                                    <div> <i><small style="color:red;">created  : {{comment.created}}</small> </i></div>
                                    <hr>
                            {%endif%}    
                            {%endfor%}
                            </div>
                        </div>
                    
                    {% if user.is_authenticated %}
                    {% comment %} <form style="width:450px; left:300px;"  class="input-group" action="{% url 'addcomment' post.id %}" method="POST"> {% endcomment %}
                    <form style="width:450px; left:300px;"  class="input-group" id="comment-form" action="{% url 'addcomment' post.id %}"  method="POST">

                    {% csrf_token %}
                    <span style=" color:DodgerBlue;" class="input-group-text">comment</span>
                    <input class="form-control" name="newcomment" aria-label="With textarea"></input>
                    <input class="btn btn-primary" type="submit" value="send">
                    </form> 
                    {%endif%}
                    <hr>
                    {%if post.user_id.id == user.id%}
                    <div><a href="{% url 'edit' post.id%}" class="btn btn-primary"  name="edit">edit</a></div>
                    {%endif%}
                    
                    
                </article>
                {%endfor%}
            </div>

{% endblock %}

{% block script %}
<script>    </script>

    <script src="{% static 'network/index.js' %}"></script>
{% endblock %}
