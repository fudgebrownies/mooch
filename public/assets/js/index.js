// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  var emailAddress;
  $('.newUserReg').on('click',function(){
    document.location.href="/new/users";
  })

  $('input.typeahead').typeahead({
    name: 'typeahead',
    remote: 'http://localhost:8000/search?key=%QUERY',
    limit: 10
    });
  // Create user ajax call
  $('#signInButton').on('click', function (event) {
    event.preventDefault();
    var signingIn = {
      email: $('#usr').val().trim(),
      password: $('#pwd').val().trim()
    };
    emailAddress = $('#usr').val().trim(),
console.log(emailAddress)
      $.ajax("/signIn", {
        type: 'PUT',
        data: signingIn
      }).then(
        function () {
          console.log('done')

          window.location.reload(true);
        }
      )
  })
  $('#signOutUser').on('click', function (event) {
    event.preventDefault();
    console.log('bitches')
    signingOut = {
      email: $('#signOutUser').attr('email')
    }
    // console.log(signingOut)
    $.ajax("/signOut", {
      type: 'PUT',
      data: signingOut
    }).then(
      function () {
        console.log('done')

        window.location.reload(true);
      }
    )

  })

  $("#createUser").on("click", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
   
  var userNewAddress=$("#address").val().trim() +' '+ $('#state').val().trim() + ' '+ $('#zip').val().trim();

  console.log($("#field_terms").val().trim())
    var newUser = {

      firstName:$('#firstName').val().trim(),
      lastName:$('#lastName').val().trim(),
      email: $("#email").val().trim(),
      password: $("#pass1").val().trim(),
      phonenumber: $("#phone").val().trim(),
      profilePic:$('#profilePic').val().trim(),
      address: userNewAddress,
      agreeTerms:$("#field_terms").val().trim()

    }
// console.log(newUser)
    // Send the POST request.
    $.ajax("/api/new/users", {
      type: "POST",
      data: newUser
    }).then(
      function () {
        console.log("Welcome!");
        // Reload the page to get the updated list
        document.location.href="/";
      }
    );
  });



  $("#preview-FU").on("click", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
console.log($('#preview-FU').attr('email'))
    var newPost = {
      email: $('#preview-FU').attr('email'),
     category: $("#item_category_id").val().trim(),
      product_name:$("#item_name").val().trim(),
      product_description:$('#item_description').val().trim(),
      userUploadImage1:$('#item_photo_1').val().trim(),
      userUploadImage1:$('#item_photo_2').val().trim(),
      daily: $("#item_price_per_day").val().trim(),
      weekly: $("#item_price_per_week").val().trim(),
      monthly: $("#item_price_per_month").val().trim(),
      security_deposit: $("#deposit").val(),

    };
console.log(newPost)
    // Send the POST request.
    $.ajax("/api/item", {
      type: "POST",
      data: newPost
    }).then(
      function () {
        console.log("New Listing Created");
        // Reload the page to get the updated list
        // location.reload();
      }
    );
  });
});