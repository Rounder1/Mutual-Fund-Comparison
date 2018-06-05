$(window).on("load", function(){
   var tester = "spx";
   // console.log("Click Worked");
   $.get("/api/newfund/" + tester, function(data){



       // console.log("BEFORE GRAPH");
       // console.log(data);





     // console.log("Graph is Initialized");
     // append the svg obgect to the body of the page
     // appends a 'group' element to 'svg'
     // moves the 'group' element to the top left margin
     var svg = d3.select("svg"),
         margin = {top: 20, right: 20, bottom: 30, left: 50},
         width = +svg.attr("width") - margin.left - margin.right,
         height = +svg.attr("height") - margin.top - margin.bottom,
         g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

     // parse the date / time
     var parseTime = d3.timeParse("%Y-%m-%d");

     // set the ranges
     var x = d3.scaleTime()
         .rangeRound([0, width]);
    // console.log("________width___________");//530
    // console.log(width);
     var y = d3.scaleLinear()
         .rangeRound([height, 0]);
     // console.log("________height___________");//250
     // console.log(height);

     // define the line
     var line = d3.line()

         .x(function(d) { return x(d.date); })
         .y(function(d) { return y(d.close); });


     // console.log("NOOOOT SORTED!!!!!!!!!!!!!!!!!!!!!");
     // console.log(data);

     // format the data
     data.forEach(function(d) {
         d.date = parseTime(d.date);
         d.close = +d.close;
         // d.Exports = +d.Exports;
     });

     // sort years ascending
     // data.sort(function(a, b){
     //   return a["date"]-b["date"];
	 // })

     console.log("SORTED!!!!!!!!!!!!!!!!!!!!!");
     console.log(data);

     // Scale the range of the data
     x.domain(d3.extent(data, function(d) { return d.date; }));
     y.domain(d3.extent(data, function(d) { return d.close; }));

      // Add the X Axis
      g.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
          .select(".domain")
          .append("text")
          .attr("fill", "#000")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Year (Y)");

      // Add the Y Axis
      g.append("g")
          .call(d3.axisLeft(y))
          .append("text")
          .attr("fill", "#000")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Price ($)");

          //draw the line
         g.append("path")
           .datum(data)
           .attr("fill", "none")
           .attr("stroke", "steelblue")
           .attr("stroke-linejoin", "round")
           .attr("stroke-linecap", "round")
           .attr("stroke-width", 1.5)
           .attr("d", line);

    });
});
