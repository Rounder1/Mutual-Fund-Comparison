$( document).ready(function() {

    // Make a get request to our api route that will return every fund
$.get("/allfunds/all", function(data) {
    console.log(data);
        // For each fund that our server sends us back
    for (var i = 0; i < data.length; i++) {
        // Create a parent option to hold fund data
    var dropOption = $("<option>");
        // Add a class 
    dropOption.addClass("dropdown-item");
        // Add an id 
    dropOption.attr("id", "drop_down_" + i);
        // Add the fund's id as the option's value
    dropOption.attr("value", data[i].symbol);
        // add the inner HTML to the drop down option
    $(dropOption).html(data[i].symbol);
        // Append the well to the well section
    $("#all_fund_drop").append(dropOption);

    }
});



});

