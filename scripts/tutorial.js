$(document).ready(function (){

    $("#main-carousel").carousel({interval: false, wrap: false});

    // Go to the third item
    $("#next").click(function(){
        d3.select('#prev').classed("disabled", false);

        $("#main-carousel").carousel("next");
        if (d3.select("#task").classed("active")) {
            d3.select('#next').classed("d-none", true);
            d3.select("#continue").classed("d-none", false);
        }
    });
    $("#prev").click(function(){
        d3.select('#next').classed("d-none", false);
        d3.select('#continue').classed("d-none", true);
        $("#main-carousel").carousel("prev");
        if (d3.select("#example2").classed("active")) {
            d3.select('#prev').classed("disabled", true);
        }
    });
});

function toMain() {
    localStorage.setItem("taskStart", new Date().getTime());
    location.href = './main.html';
}
