var employeeData = {};
var activeEmployee = {};


$( document ).ready(function() {
  console.log( "ready!" );
  getEmployeeList()
  .done(function(response) {
    console.log('Employees retrieved!');
    console.log(response);
    employeeData = response;
    for (i = 0; i < response.employees.length; i++) {
      console.log(response.employees[i].name);
      $("#employeeList").append("<option id='employeeSelect'>" + response.employees[i].name + "</option>");
    }
  });
  $('#employeeList').on('change', function(response){
    console.log($(this).val());
    for (i = 0; i < employeeData.employees.length; i++) {
      if (employeeData.employees[i].name == $(this).val()) {
        console.log("Match found in employee records!");
        activeEmployee = {"currentEmployee" : 0};
        activeEmployee.currentEmployee = employeeData.employees[i].id;
        console.log(activeEmployee.currentEmployee);
      }
    }
  });
  $("#clockInButton").click(function(activeEmployee) {
    clockIn(activeEmployee.currentEmployee);
  });
  $("#addEmployee").click(function() {
    $("#employeeBox").addClass("hidden");
    $("#employeeDropdown").addClass("hidden");
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
    $("#employeeBox").removeClass("hidden");
  });
  $("#addTheEmployee").click(function() {
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    $("#employeeBox").addClass("hidden");
    addEmployee(firstName, lastName)
  });
});


function getEmployeeList() {
  return $.ajax({
    url: '/api/v1/employees',
    type: 'GET',
    success: function(response) {
      console.log(response);
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function addEmployee(firstName, lastName) {
  $.ajax({
    url: '/',
    data: $('form').serialize(),
    type: 'POST',
    success: function(response) {
      console.log(response);
      $("#divdeps").dialog("close");
      $("#employeeList").append("<a href='#' class='list-group-item'>" + firstName + " " + lastName + "</a>");
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function clockIn(employeeID) {
  $.ajax({
    url: '/postmethod',
    data: {id: 2}, // FIX so we receive the right thing here.
    type: 'POST',
    success: function(response) {
      console.log("You clicked clock in!");
    },
    error: function(error) {
      console.log(error);
    }
  });
}
