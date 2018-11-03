var data = [];
var USER_SEX = "All",
    USER_AFFORD = "All",
    USER_PHYSICAL = "All",
    USER_SMOKE = "All";


$(document).ready(function () {
    loadData();
    wireButtonClickEvents();
});

// Loads the CSV file 
function loadData() {
    d3.csv("data/diabetes-India-dataset.csv", function (d) {
        data = d;
    });
}

function findDataItem() {
   var selected_data = data.filter(function (d) {
        var bool = 1;
        if (USER_SEX != "All"){
            bool = bool && d["Sex"] == USER_SEX;
        }
        if (USER_PHYSICAL !="All"){
            bool = bool && d["How would you describe your level of physical activity in a typical day."].startsWith(USER_PHYSICAL);
        }
        if (USER_AFFORD != "All"){
            bool = bool && d["What statement best describes your household financial condition for health care and medicines?"].startsWith(USER_AFFORD);
        }
        if (USER_SMOKE != "All"){
            bool = bool && d["Do you currently use any tobacco product, whether by smoking or smokeless/chewing?"]==USER_SMOKE;
        }
        return bool;
    });
    return selected_data;
}

function visualizeSquareChart(selected_data) {
    var count = 0;
    selected_data.forEach(function (v){
        if (v["Diabetes Risk Level"] == "High"){
            count++;
        }
    });
    percentage = 100*count/selected_data.length
    var div = d3.select("#n").html(selected_data.length);
    width = 400
    height = 400

	var div = d3.select("#chart1").append("div")
		.attr("id", "holder1")
		.attr("class", "chartholder");
    var svg = d3.select("#chart1");
    svg = div.append("svg")
            .attr("width", width)
            .attr("height", height);
	var rectWidth = 40;
	svg.selectAll("rect")
		.data(d3.range(100).reverse())
		.enter().append("rect")
		.attr("x", function (d, i) {
		    return rectWidth * (i %10);
		})
		.attr("y", function (d, i) {
		    return rectWidth * Math.floor(i / 10);
		}) 
		.attr("height", rectWidth)
		.attr("width", rectWidth)
		.attr("stroke", "white")
		.attr("fill", function (d, i){
			if (88 >= 100 - i){
				return "black";
			}
			else{
				return "grey";
			}
        });
    var div = d3.select("#chart1").append("div")
		.attr("id", "holder2")
        .attr("class", "chartholder");
    increase = ((percentage - 87.57)/0.8757).toFixed(2)
    if (increase > 0){
        div.append("i")
        .html(Math.abs(increase) + "%")
        .attr("class", "fas fa-arrow-up")
        .attr("style", "color:red");
    }
    if (increase < 0){
        div.append("i")
        .html(Math.abs(increase) + "%")
        .attr("class", "fas fa-arrow-down")
        .attr("style", "color:green");
    }
    var div = d3.select("#chart1").append("div")
		.attr("id", "holder3")
		.attr("class", "chartholder");
    svg = div.append("svg")
        .attr("width", width)
        .attr("height", height);
	var rectWidth = 40;
	svg.selectAll("rect")
		.data(d3.range(100).reverse())
		.enter().append("rect")
		.attr("x", function (d, i) {
		    return rectWidth * (i %10);
		})
		.attr("y", function (d, i) {
		    return rectWidth * Math.floor(i / 10);
		}) 
		.attr("height", rectWidth)
		.attr("width", rectWidth)
		.attr("stroke", "white")
		.attr("fill", function (d, i){
			if (Math.round(100*count/selected_data.length) >= 100 - i){
				return "blue";
			}
			else{
				return "grey";
			}
        });
}


function wireButtonClickEvents() {
    d3.selectAll("#sex .button").on("click", function () {
        USER_SEX = d3.select(this).attr("data-val");
        d3.select("#sex .current").classed("current", false);
        d3.select(this).classed("current", true);
        $("#chart1").empty();
        visualizeSquareChart(findDataItem())
    });
    d3.selectAll("#physical .button").on("click", function () {
        USER_PHYSICAL = d3.select(this).attr("data-val");
        d3.select("#physical .current").classed("current", false);
        d3.select(this).classed("current", true);
        $("#chart1").empty();
        visualizeSquareChart(findDataItem())
    });
    d3.selectAll("#afford .button").on("click", function () {
        USER_AFFORD = d3.select(this).attr("data-val");
        d3.select("#afford .current").classed("current", false);
        d3.select(this).classed("current", true);
        $("#chart1").empty();
        visualizeSquareChart(findDataItem())
    });
    d3.selectAll("#smoking .button").on("click", function () {
        USER_SMOKE = d3.select(this).attr("data-val");
        d3.select("#smoking .current").classed("current", false);
        d3.select(this).classed("current", true);
        $("#chart1").empty();
        visualizeSquareChart(findDataItem())
    });
}