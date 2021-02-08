document.addEventListener('DOMContentLoaded', function () {

  $('.buttonlike').click(function(e) {
    e.preventDefault();
      // alert("shehab")
      var $button = $(this);
        url = $button.attr('href');
        // alert(url);
        var data_id = $(this).data("id");
        // alert(data_id);

      $.get( `${url}`, function( data ) {
        // console.log( typeof data ); // string
        // console.log( data ); // HTML content of the jQuery.ajax page

        var content = $(data).find(`#like_${data_id}`);
        $(`#like_${data_id}`).empty().append(content);

      });
    });



  $('.buttonunlike').click(function(e) {
    e.preventDefault();
      // alert("shehab")
      var $button = $(this);
        url = $button.attr('href');
        // alert(url);
        var data_id = $(this).data("id");
        // alert(data_id);

      $.get( `${url}`, function( data ) {
        // console.log( typeof data ); // string
        // console.log( data ); // HTML content of the jQuery.ajax page

        var content = $(data).find(`#like_${data_id}`);
        $(`#like_${data_id}`).empty().append(content);

      });
    });



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



$( ".follow" ).submit(function( event ) {
  alert("shehab")
 
  // Stop form from submitting normally
  event.preventDefault();
 
  // Get some values from elements on the page:
  var $form = $( this ),
    csrf_token = $form.find("input[name='csrfmiddlewaretoken']").val();
    url = $form.attr( "action" );
    alert(url)
 
  // Send the data using post
  var posting = $.post( url, {  csrfmiddlewaretoken: csrf_token });
 
  // Put the results in a div
  posting.done(function( data ) {
    // console.log(data)
    
    var content = $(data).find(`#following`);
    console.log(data)
    $(`#following`).empty().append(content)
  });
});






$( ".unfollow" ).submit(function( event ) {
  alert("shehab")
 
  // Stop form from submitting normally
  event.preventDefault();
 
  // Get some values from elements on the page:
  var $form = $( this ),
    csrf_token = $form.find("input[name='csrfmiddlewaretoken']").val();
    url = $form.attr( "action" );
    alert(url)
 
  // Send the data using post
  var posting = $.post( url, {  csrfmiddlewaretoken: csrf_token });
 
  // Put the results in a div
  posting.done(function( data ) {

    var content = $(data).find(`.following`);
    console.log(data)
    $(`.following`).empty().append(content)
  });
});


  });