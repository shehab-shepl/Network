document.addEventListener('DOMContentLoaded', function () {

  $("#id_email").change(function () {
    var email = $(this).val();

    $.ajax({
      url: '/ajax/validate_email/',
      data: {
        'email': email
      },
      dataType: 'json',
      success: function (data) {
        if (data.is_taken) {
          alert("A user with this username already exists.");
        }
      }
    });

  });


});