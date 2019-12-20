CONDITION = localStorage.getItem("condition");
IMAGES = [];
INITIAL_NUM_OF_TRIALS = 8;

$(document).ready(function (){
    localStorage.setItem("trialStrt", new Date().getTime());
    d3.json('data/bugs.json')
        .then(function (data, error) {
        if (error)
            console.log(error);
        var allImages = [];
        if (CONDITION == '1') {
            allImages = data.correct.concat(data.wrong);
        }
        else {
            allImages = data.wrong.concat(data.correct);
        }
        for (var i = 0; i < allImages.length; i+=5){
            var temp = [];
            for (var j = i; j < i+5; j++) {
                temp.push(allImages[j]);
            }
            IMAGES.push(temp);
        }
        localStorage.setItem("trialStrt", new Date().getTime());
        createTrialBatch();

        $("#main-carousel").carousel({interval: false, wrap: false});
            // .on('slide.bs.carousel', function (e) {
            //     var carouselLength = $('.carousel-item').length -1;
            //     // Last one
            //     if (e.to == e.carouselLength) {
            //         logTrialResponse();
            //         resetButtons();
            //         d3.selectAll(".trial-question").classed("d-none", true);
            //         d3.selectAll(".trust-question").classed("d-none", false);
            //         d3.select("#main-carousel").select(".carousel-inner").html("");
            //     }
            // });

    });
    $("#myBtn2").click(function() {
        logTrialResponse();
        if (!isLastTrialInBatch()) {
            $("#main-carousel").carousel("next");
            localStorage.setItem("trialStrt", new Date().getTime());
        }
        else {
                d3.selectAll(".trial-question").classed("d-none", true);
                d3.selectAll(".trust-question").classed("d-none", false);
                d3.select("#main-carousel").select(".carousel-inner").html("");
            }
        resetButtons();
        });
});

function isLastTrialInBatch() {
    var currentIndex = $('div.active').index() + 1;
    if (currentIndex == 5)
        return true;
    else
        return false;
}

function startNewTrial() {
    logTrustResponse();
    IMAGES.shift();
    if(IMAGES.length == 0) {
        localStorage.setItem("taskEnd", new Date().getTime());
        location.href = './questionnaire.html'
    }
    localStorage.setItem("trialStrt", new Date().getTime());
    createTrialBatch();
    d3.selectAll(".trial-question").classed("d-none", false);
    d3.selectAll(".trust-question").classed("d-none", true);
    d3.select("#nextSet").classed("disabled", true);
}

function createTrialBatch() {
    var carousel = d3.select("#main-carousel").select(".carousel-inner");
    carousel.html("");
    carousel.selectAll("div")
        .data(IMAGES[0]).enter()
        .append("div")
        .classed("carousel-item", true)
        .append("img")
        .attr("id", function (d) {
            return d.id;
        })
        .attr("value", function (d) {
            return d.difficulty;
        })
        .attr("src", function (d) {
            return "images/Slide" + d.id + ".jpg";
        });
    d3.select(".carousel-item").classed("active", true);
}

function logTrialResponse() {
    var trials = localStorage.getItem("trials");
    if (trials === null)
        trials = [];
    else
        trials = JSON.parse(trials);
    var trialObject = {};
        trialObject.strt = localStorage.getItem("trialStrt");
        trialObject.end = new Date().getTime().toString();
        trialObject.exp = getRadioSelectedValue("#exp");
        trialObject.label = getRadioSelectedValue("#label");
        trialObject.img = getCurrentImageId();
    trials.push(trialObject);
    localStorage.setItem("trials", JSON.stringify(trials));

}

function logTrustResponse() {
    var trustResp = localStorage.getItem("trust");
    if (trustResp === null)
        trustResp = [];
    else
        trustResp = JSON.parse(trustResp);
    var trustObject = {};
        trustObject.ans = getRadioSelectedValue("#trust");
        trustObject.id = INITIAL_NUM_OF_TRIALS - IMAGES.length;

    trustResp.push(trustObject);
    localStorage.setItem("trust", JSON.stringify(trustResp));
}
function radioChange() {
    if (isOptionSelected("#exp") && isOptionSelected("#label")) {
        d3.select("#myBtn2")
            .classed("disabled", false);
    }
}

function trustRateChange() {
    if (isOptionSelected("#trust")) {
        d3.select("#nextSet").classed("disabled", false);
    }
}

function isOptionSelected(id) {
    var isChecked = false;
    if (d3.select(id).empty())
        return true;
    d3.select(id)
        .selectAll("input").each(function (d) {
        if (d3.select(this).node().checked == true)
            isChecked = true;
    });
    return isChecked;
}

function resetRadios (id) {
    d3.select(id)
        .selectAll("input").each(function (d) {
            d3.select(this).node().checked = false;
    });
}
function getRadioSelectedValue(id) {
    return d3.select(id + " .active input").attr("value")
}

function resetButtons() {
    d3.selectAll("label.active").classed("active", false);
    resetRadios("#label");
    resetRadios("#exp");
    d3.select("#myBtn2").classed("disabled", true);
}

function getCurrentImageId() {
    var temp = d3.select(".carousel-item.active img").attr("id");
    return d3.select(".carousel-item.active img").attr("id");
}
