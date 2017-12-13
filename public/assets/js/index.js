// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {

  // Create user ajax call

  $("#submitUser").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newUser = {
      firstname: $("#firstname").val().trim(),
      lastname: $("#lastname").val().trim(),
      phonenumber: $("#phone").val().trim(),
      email: $("#email").val().trim(),
      address: $("#homeAddress").val().trim(),
      state: $("#homeState").val().trim(),
      zipcode: $("#zipCode").val().trim(),
      password: $("#pass1").val().trim(),
      password2: $("#pass2").val().trim(),
     
      
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
