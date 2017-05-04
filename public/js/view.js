$(document).ready(function(){
  $("#submit-burger-form").on("submit", function(event){
    event.preventDefault();
    var burgerName = $("#burger-name-input").val().trim();
    if(burgerName!==""){
      var myBurger = {
        burger_name: burgerName
      };

      $.post("/", myBurger, function(){
        window.location.reload();
      });
    }
  });
});