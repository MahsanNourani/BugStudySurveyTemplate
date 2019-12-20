questionnaire = ["#age", "#gender", "#degree", "#mlFam", "#entFam", "#major"];
postStudy = ["#acc", "#acc1", "#acc2", "#conf", "#pred", "#rel", "#nov", "#like", "#trst", "#trstChng", "#accChng", "#cmnt"];
function generateCondition() {
    var condition = getUrlVars()['cond'];
    if (condition == undefined) {
        var rand = Math.floor(Math.random() * 2);
        if (rand%2 == 1)
            return 1;
        else
            return 2;
    }
    return condition;
}

function goToBackground() {
    localStorage.clear();
    localStorage.setItem("condition", generateCondition());
    location.href = "./background.html";
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function radioChange(item) {
    d3.select(item).classed("needs-to-be-filled", false);
}

function isInputFull(id) {
    if (d3.select(id).empty())
        return true;
    if (d3.select(id).node().value == "") {
        return false;
    }
    return true;
}

function validateQuestionnaire(list) {
    var allChecked = true;
    for (var i = 0; i < list.length; i++) {
        if (!isOptionSelected(list[i])) {
            allChecked = false;
            break;
        }
    }
    return allChecked;
}

function isOptionSelected(id) {
    var isChecked = false;
    var item = d3.select(id);
    if (item.empty())
        return true;
    else if (item.attr("type") == "text" || item.attr("type") == "number") {
        return isInputFull(id);
    }
    item.selectAll("input").each(function (d) {
        if (d3.select(this).node().checked == true)
            isChecked = true;
    });
    return isChecked;
}

function toTutorial() {
    if(validateQuestionnaire(questionnaire)) {
        var backgroundQuestionnaire = getQuestionnaireValues(questionnaire);
        localStorage.setItem("bg", JSON.stringify(backgroundQuestionnaire));
        location.href = './Tutorial.html';
    }
    else {
        generateValidationFeedback(validateNotSelected(questionnaire));
        // $('[data-toggle="popover"]').popover();
    }
}

function submitResponses() {
    if(validateQuestionnaire(postStudy)) {
        var backgroundQuestionnaire = getQuestionnaireValues(postStudy);
        localStorage.setItem("pq", JSON.stringify(backgroundQuestionnaire));
        // location.href = './Tutorial.html';

        // window.alert(prepareResponsesForDB());
        location.href = './results.html';
    }
    else {
        generateValidationFeedback(validateNotSelected(postStudy));
        // $('[data-toggle="popover"]').popover();
    }
}

function generateValidationFeedback(listOfNotDone) {
    for (var i = 0; i < listOfNotDone.length; i++) {
        d3.select(listOfNotDone[i]).classed("needs-to-be-filled", true);
    }
}

function validateNotSelected(dataset) {
    var listOfNotDone = [];
    for (var i = 0; i < dataset.length; i++) {
        if (!isOptionSelected(dataset[i])) {
            listOfNotDone.push(dataset[i]);
        }

    }
    return listOfNotDone;
}

function getQuestionnaireValues(list) {
    var object = {};
    for (var item = 0; item < list.length; item++) {
        if (d3.select(list[item]).empty())
            object[list[item]] = -100;
        else if (d3.select(list[item]).attr("type") == "text" || d3.select(list[item]).attr("type") == "number") {
            var value = d3.select(list[item]).node().value;
            value = value.replace(/'/g, '*');
            value = value.replace(/"/g, '*');
            object[list[item]] = value;
        }
        else
            object[list[item]] = d3.select(list[item]).select(".active").select("input").node().value;
    }

    return object;
}

function prepareResponsesForDB() {
    var object = {};
    object["condition"] = localStorage.getItem("condition");
    object["bq"] = JSON.parse(localStorage.getItem("bg"));
    object["pq"] = JSON.parse(localStorage.getItem("pq"));
    object["trials"] = JSON.parse(localStorage.getItem("trials"));
    object["trust"] = JSON.parse(localStorage.getItem("trust"));
    object["taskStrt"] = localStorage.getItem("taskStart");
    object["taskEnd"] = localStorage.getItem("taskEnd");
    return JSON.stringify(object);
}