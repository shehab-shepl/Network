document.addEventListener('DOMContentLoaded', function () {

  // unlike = document.querySelector(`.unlike`);
  // like = document.querySelector(`#like`);
  // unlike.addEventListener('style.display = "block"', like.style.display = 'none');


  // document.querySelectorAll(".unlike").forEach(form => {
  //   form.onsubmit = function (e) {
  //     e.preventDefault();
  //     var $form = $(this),
  //       csrf_token = $form.find("input[name='csrfmiddlewaretoken']").val(),
  //       url = $form.attr('action');
  //     var posting = $.post(url, {  csrfmiddlewaretoken: csrf_token })
  //     posting.done(function (data) {
  //       console.log(data)
  //       var data_id = $(form).data("id");
  //       alert(data_id);
  //       // var unlike = $(data).find(`#unlike_${data_id}`);
  //       // unlike.style.display = none
  //       $(`#unlike_${data_id}`).hide();
  //       like = document.querySelector(`#like_${data_id}`);
  //       like.style.display = 'block';
  //     })
  //   }

  // })


  // document.querySelectorAll(".unlike").forEach(form => {

  //   event.preventDefault();
  //   var data_id = $(form).data("id");
  //   like = document.querySelector(`#like_${data_id}`);
  //   form.addEventListener('style.display = "block"', like.style.display = 'none');

  // })


  // document.querySelectorAll(".like").forEach(form => {
  //   form.onsubmit = function (e) {
  //     e.preventDefault();
  //     // alert("shehab")
  //     var $form = $(this),
  //       csrf_token = $form.find("input[name='csrfmiddlewaretoken']").val(),
  //       url = $form.attr('action');

  //     console.log(url);
      
  //     var posting = $.post(url, {  csrfmiddlewaretoken: csrf_token })
  //     posting.done(function (data) {
  //       console.log(data);
  //       var data_id = $(form).data("id");
  //       alert(data_id);
  //       $(`#like_${data_id}`).hide();

        // var like = $(data).find(`#like_${data_id}`);
        // console.log(like);
        // like.style.display = none
        // document.getElementById(`#like_${data_id}`).style.display="none";
  //     })
  //   }
  // })
  /*
    On submiting the form, send the POST ajax
    request to server and after successfull submission
    display the object.
*/
document.querySelectorAll(".comment-form").forEach(form => {
  form.onsubmit = function (e) {
    e.preventDefault();
    // alert("shehab")
    var $form = $(this),
      csrf_token = $form.find("input[name='csrfmiddlewaretoken']").val(),
      comment = $form.find("input[name='newcomment']").val(),
      url = $form.attr('action');

    console.log(comment)
    console.log(url)
    var posting = $.post(url, { newcomment: comment, csrfmiddlewaretoken: csrf_token })
    posting.done(function (data) {
      // console.log(data)
      $form.trigger('reset');
      var data_id = $(form).data("id");
      // alert(data_id);
      var content = $(data).find(`#all_comments_${data_id}`);
      // console.log(content)
      $(`#all_comments_${data_id}`).empty().append(content);
    })
  }
})  

    // // serialize the data for sending the form data.
    // var serializedData = $(this).serialize();

    // // make POST ajax call
    // $.ajax({
    //     type: 'POST',
    //     url: "{% url 'addcomment' post.id %}",
    //     data: serializedData,

    //     success: function (response) {
    //         // on successfull creating object
    //         // 1. clear the form.
    //         $("#comment-form").trigger('reset');


    //         // display the newly comment to comments.
    //         var instance = JSON.parse(response["instance"]);
    //         var fields = instance[0]["fields"];
    //         console.log(fields)
    //         $("#all-comments").prepend(
    //           `<div><i style="color:Gray;">by : ${fields["user_id"]||""}</i></div>
    //           ${fields["comment"]||""}
    //           <div> <i><small style="color:red;">created  : ${fields["created"]||""}</small> </i></div>
    //           <hr>`


    //         )
    //     },
    //     // error: function (response) {
    //     //     // alert the error if any error occured
    //     //     alert(response["responseJSON"]["error"]);
    //     // }
    // })
  

  // $("#likeForm").submit(function (e) {
  //   e.preventDefault()
  //   var $form = $(this),
  //     csrf_token = $form.find("input[name='csrfmiddlewaretoken']").val(),
  //     url = $form.attr('action');

  //   var posting = $.post(url, { csrfmiddlewaretoken: csrf_token })
  //   posting.done(function (data) {
  //     // console.log(data)
      
      
  //   var x = document.getElementById("likeButton");

  //     if (x.style.display === "none") {
  //       x.style.display = "block";
  //     } else {
  //       x.style.display = "none";
  //     }
  //   var content = $(data).find("#countLiked");
  //     $("#countLiked").empty().append(content);

  //   })
  // })


  });