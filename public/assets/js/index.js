// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {

  $('.newUserReg').on('click',function(){
    document.location.href="/new/users";
  })
  var emailAddress;
  // Create user ajax call
  $('#signInButton').on('click', function (event) {
    event.preventDefault();
    var signingIn = {
      email: $('#usr').val().trim(),
      password: $('#pwd').val().trim()
    };
    emailAddress = $('#usr').val().trim(),

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
  console.log('i am here you cutn ass whole btich')
  console.log($("#field_terms").val().trim())
    var newUser = {

      firstName:$('#firstName').val().trim(),
      lastName:$('#lastName').val().trim(),
      email: $("#email").val().trim(),
      password: $("#pass1").val().trim(),
      phonenumber: $("#phonenumber").val().trim(),
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



  $(".create-post").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newPost = {
      email: $("#email").val().trim(),
      description: $("#email").val().trim(),
      category: $("#email").val().trim(),
      product_description:$('#pDes').val().trim(),
      userUploadImage1:('#pic1').val().trim(),
      userUploadImage1:('#pic2').val().trim(),
      daily: $("#daily").val().trim(),
      weekly: $("#weekly").val().trim(),
      monthly: $("#monthly").val().trim(),
      deposit: $("#deposit").val().trim(),

    };

    // Send the POST request.
    $.ajax("/api/item", {
      type: "POST",
      data: newPost
    }).then(
      function () {
        console.log("New Listing Created");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});