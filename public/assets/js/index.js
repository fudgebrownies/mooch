// Make sure we wait to attach our handlers until the DOM is fully loaded.

$(function () {
  var emailAddress;
  $('.newUserReg').on('click',function(){
    document.location.href="/new/users";
  })
$('#findAllButton').on('click',function(event){
  event.preventDefault();
 var search={
   product:$('#userSearch').val().trim(),
   zipcode:$('#zipCode').val()
 }
console.log(search)
 $.ajax("/find/all", {
  type: 'POST',
  data: search
}).then(
  function () {
    console.log('done')
    document.location.href="/find/all/products";
    // window.location.reload(true);
  }
)
  //  var clientKey = "s-GxSSU6MOIRvXCNGAoNNHy4ntNHwwlMoKfiMncFiiqCcCkSuP2t9eLat0fAZOfokn";
   
  //  var cache = {};
  //  var container = $("#example1");
  //  var errorDiv = container.find("div.text-error");
   
  //  /** Handle successful response */
  //  function handleResp(data)
  //  {
  //    // Check for error
  //    if (data.error_msg)
  //      errorDiv.text(data.error_msg);
  //    else if ("city" in data)
  //    {
  //      // Set city and state
  //      container.find("input[name='city']").val(data.city);
  //      container.find("input[name='state']").val(data.state);
  //    }
  //  }
   
  //  // Set up event handlers
  //  container.find("input[name='zipcode']").on("keyup change", function() {
  //    // Get zip code
  //    var zipcode = $(this).val().substring(0, 5);
  //    if (zipcode.length == 5 && /^[0-9]+$/.test(zipcode))
  //    {
  //      // Clear error
  //      errorDiv.empty();
       
  //      // Check cache
  //      if (zipcode in cache)
  //      {
  //        handleResp(cache[zipcode]);
  //      }
  //      else
  //      {
  //        // Build url
  //        var url = "https://www.zipcodeapi.com/rest/"+clientKey+"/info.json/" + zipcode + "/radians";
         
  //        // Make AJAX request
  //        $.ajax({
  //          "url": url,
  //          "dataType": "json"
  //        }).done(function(data) {
  //          handleResp(data);
           
  //          // Store in cache
  //          cache[zipcode] = data;
  //        }).fail(function(data) {
  //          if (data.responseText && (json = $.parseJSON(data.responseText)))
  //          {
  //            // Store in cache
  //            cache[zipcode] = json;
             
  //            // Check for error
  //            if (json.error_msg)
  //              errorDiv.text(json.error_msg);
  //          }
  //          else
  //            errorDiv.text('Request failed.');
  //        });
  //      }
  //    }
  //  }).trigger("change");
 })

  
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



  $("#previewPost").on("click", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
var pic1=  $('#item_photo_1').val().split("/[\/\\]/")
console.log(pic1)

    var newPost = {
      email: $('#getEmail').attr('email'),
     category: $("#item_category_id").val().trim(),
      product_name:$("#item_name").val().trim(),
      product_description:$('#item_description').val().trim(),
      userUploadImage1:$('#item_photo_1').val().trim(),
      userUploadImage1:$('#item_photo_2').val().trim(),
      daily: '$'+$("#item_price_per_day").val().trim() +'/day',
      weekly:'$'+ $("#item_price_per_week").val().trim()+'/week',
      monthly:'$'+ $("#item_price_per_month").val().trim()+'/month',
      security_deposit: '$'+$("#item_security_deposit").val(),

    };
    
//  $('#previewPic1').append(newPost.userUploadImage1);
//  $('#previewPic2').append(newPost.userUploadImage2);
 $('#previewCategory').append(newPost.category);
 $('#previewItemName').append(newPost.product_name);
 $('#productDescription').append(newPost.product_description);
 $('#previewDaily').append(newPost.daily);
 $('#previewWeek').append(newPost.weekly);
 $('#previewMonth').append(newPost.monthly);
 $('#previewSecrity').append(newPost.security_deposit);
console.log(newPost)
    // Send the POST request.
    
  });

  $('#finalPostConfirmation').on('click',function(){
    var confirmedPost = {
      email: $('#getEmail').attr('email'),
     category: $("#item_category_id").val().trim(),
      product_name:$("#item_name").val().trim(),
      product_description:$('#item_description').val().trim(),
      userUploadImage1:$('#item_photo_1').val().trim(),
      userUploadImage1:$('#item_photo_2').val().trim(),
      daily: '$'+$("#item_price_per_day").val().trim() +'/day',
      weekly:'$'+ $("#item_price_per_week").val().trim()+'/week',
      monthly:'$'+ $("#item_price_per_month").val().trim()+'/month',
      security_deposit: '$'+$("#item_security_deposit").val(),

    };
    $.ajax("/api/item", {
      type: "POST",
      data: confirmedPost
    }).then(
      function () {
        console.log("New Listing Created");
        // Reload the page to get the updated list
        document.location.href="/user/products";
      }
    );
  })
});