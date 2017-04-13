$( document ).ready(function() {
    console.log( "ready!" );
    $("#addEmployee").click(function() {
      $("#divdeps").dialog("open");
    });
    $("#divdeps").dialog({
    autoOpen: false,
    show: 'slide',
    resizable: false,
    position: 'center',
    stack: true,
    height: 'auto',
    width: 'auto',
    modal: true
    });
    $("#closeWindow").click(function() {
      $("#divdeps").dialog("close");
    });
    $("#addTheEmployee").click(function() {
      var firstName = $("#firstName").val();
      var lastName = $("#lastName").val();
      $.ajax({
        url: '/',
        data: $('form').serialize(),
        type: 'POST',
        success: function(response) {
          console.log(response);
        },
        error: function(error) {
          console.log(error);
        }
      });
    });
});
