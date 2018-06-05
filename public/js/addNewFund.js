// When user clicks add-btn
$("#add_fund_btn").on("click", function(event) {
  event.preventDefault();

  // Make a new fund object
  var newFund = {
    fund_name: $("#fund_name").val().trim(),
    fund_symbol: $("#fund_symbol").val().trim(),
    expense_ratio: $("#expense_ratio").val().trim(),
  };

  // Send an AJAX POST-request with jQuery
  $.post("/allfunds/add", newFund)
    // On success, run the following code
    .then(function(data) {
      // Log the data we found
      console.log(data);
    });

  // Empty each input box by replacing the value with an empty string
  $("#fund_name").val("");
  $("#fund_symbol").val("");
  $("#expense_ratio").val("");
});


// When user clicks add-btn
$("#add_fund_btn_2").on("click", function(event) {
  event.preventDefault();

  // Make a new fund object
  var newFund = {
    fund_name: $("#fund_name").val().trim(),
    fund_symbol: $("#fund_symbol").val().trim(),
    expense_ratio: $("#expense_ratio").val().trim(),
  };

  // Send an AJAX POST-request with jQuery
  $.post("/allfunds/add", newFund)
    // On success, run the following code
    .then(function(data) {
      // Log the data we found
      console.log(data);
    });

  // Empty each input box by replacing the value with an empty string
  $("#fund_name").val("");
  $("#fund_symbol").val("");
  $("#expense_ratio").val("");
});
