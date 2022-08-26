var currentDate = moment().format('dddd MMMM Do, YYYY');
var currentTime = moment().format('hh:mm:ss a');
var currentHour = moment().format('HH');
let amPM = "AM";
let finalHour = "";
let timeMap = new Map();
// i put all my arrays and constants in the global part

$('#currentDay').text(currentDate);


// this calls the local storage from the page

if (localStorage.getItem("myMap")) {
    timeMap = new Map(JSON.parse(localStorage.myMap));

} else {
    let timeMap = new Map();
}


// this is the time blocks but only a certain amount of hours 
for (let hour = 10; hour < 19; hour++) {

    // this makes the divs devide into smaller ones 
    let timeBlock = $('<div>');

    // this column helps with the hour that it displays

    if (hour < 12) {
        amPM = "AM";
    } else {
        amPM = "PM";
    }

    let timeDiv = $('<div>');
    if (hour > 12) {
        finalHour = hour - 12;
    } else {
        finalHour = hour;
    }

    if (finalHour < 10) {
        // this makes the hour work thankfully
        finalHour = "  " + finalHour;
    }

    timeDiv.text(finalHour + amPM);
    timeDiv.addClass('time-div');

    // this makes the text area work inside the div
    let descriptionDiv = $("<div>");
    let textAreaForDiv = $("<textarea>");
    textAreaForDiv.attr('id', 'textarea' + hour);
    // this helps fill the gap in the area
    descriptionDiv.append(textAreaForDiv);
    descriptionDiv.addClass("description");
    descriptionDiv.css("width", "80%");



    //this was extremely hard to figure out and it was the floppy disk save. or just save
    let saveIcon = $('<i>');
    saveIcon.addClass("fa fa-save");

    // this is the button for the save
    let saveDiv = $("<div>");
    saveDiv.addClass("saveBtn ");
    saveDiv.attr('id', hour);


    // add icon to save button
    saveDiv.append(saveIcon);

    // append all three individual blocks to the bigger div
    timeBlock.append(timeDiv, descriptionDiv, saveDiv);

    timeBlock.addClass("time-block row");

    if (currentHour > hour) {

        // if the hour has passed, make the background grey
        timeBlock.addClass("past");

    } else if (currentHour < hour) {

        // if the hour happens in the future, make the background green
        timeBlock.addClass("future");
        textAreaForDiv.attr("placeholder", "What task would you like to do?");

    } else {

        // make the background red
        timeBlock.addClass("present");
        textAreaForDiv.attr("placeholder", "What task Would you like to do?");
    }

    // add completed time block to the main container 
    $("#main-contain").append(timeBlock);



}

timeMap.forEach(function (text, key) {

    // load anything saved in localStorage onto the calendar

    let textAreaVar = "#textarea" + key;
    document.querySelector(textAreaVar).value = text;

});

// when the user clicks the save button on that hour it will be written to memory and persist with window reloads
$(".saveBtn").on('click', function () {

    let textAreaVar = "#textarea" + (this.id);

    // write to the daily timeMap Map
    timeMap.set((this.id), document.querySelector(textAreaVar).value);

    // write the Map to storage  
    localStorage.myMap = JSON.stringify(Array.from(timeMap.entries()));


});