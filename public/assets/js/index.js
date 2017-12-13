// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {

  // Create user ajax call
$('#signInButton').on('click',function(event){
  event.preventDefault();
  var signingIn={
    email:$('#usr').val().trim(),
    password:$('#pwd').val().trim()
  };
  $.ajax("/signIn",{
    type:'PUT',
    data:signingIn
  }).then(
    function(){
      console.log('done')
      $('#signInModal').modal('hide')
    }
  )
})
  $("#submitUser").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newUser = {
      email: $("#email").val().trim(),
      password: $("#password").val().trim(),
      phonenumber: $("#phonenumber").val().trim(),
      address: $("#address").val().trim(),
      
    };

    // Send the POST request.
    $.ajax("/api/users", {
      type: "POST",
      data: newUser
    }).then(
      function() {
        console.log("Welcome!");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });



$(".create-post").on("submit", function(event) {
  // Make sure to preventDefault on a submit event.
  event.preventDefault();

  var newPost = {
    name: $("#email").val().trim(),
    description: $("#email").val().trim(),
    category: $("#email").val().trim(),
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
    function() {
      console.log("New Listing Created");
      // Reload the page to get the updated list
      location.reload();
    }
  );
});
});
