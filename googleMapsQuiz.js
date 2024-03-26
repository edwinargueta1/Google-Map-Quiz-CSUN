//Global Variables
var questionNum = 0;
var response =  null;
var map;
var rec;
var score = 0;

window.onload = function() {
    initMap();
    setQuestion();
}

//Bounds for locations
const jacaranda = {north: 34.242128, south: 34.241002, east: -118.527791, west: -118.529473};
const jerome = {north: 34.239110, south: 34.238609, east: -118.530195, west: -118.531579};
const bookStore = {north: 34.237784, south: 34.236990, east: -118.527607, west: -118.528784};
const sierra = {north: 34.238474, south: 34.238093, east: -118.530001, west: -118.531433};
const liveOak = {north: 34.238392, south: 34.238175, east: -118.527601, west: -118.528811};


function initMap(){
    //Map Config
    var options = {
        zoom: 15.9,
        center:{lat: 34.2394448, lng: -118.529148},
        zoomControl: false,
        gestureHandling: "none",
        disableDefaultUI: true,
        mapTypeId: 'satellite'
    };
    //Map Object
    map =  new google.maps.Map(document.getElementById("map"), options);

    //Rectangle Object
    rec = new google.maps.Rectangle();

    //Checks wether the click is in the correct area.
    rec.addListener("dblclick", function() {
        withinBounds(rec);
    });
    map.addListener("dblclick", function() {
        outOfBounds(rec);
    });
}


function withinBounds(shape){
    if(response == null){
        shape.setOptions({
            strokeColor:"green",
            fillColor: "green",
            strokeOpacity: 1,
            fillOpacity: 0.5
        })
        document.getElementById("status").innerHTML = "Answer is correct!";
        document.getElementById("error").innerHTML = "";
        response = true;
        score += 1;
    }
}
function outOfBounds(shape){
    if(response == null){
        shape.setOptions({
            strokeColor:"red",
            fillColor: "red",
            strokeOpacity: 1,
            fillOpacity: 0.5
        })
        document.getElementById("status").innerHTML = "Answer is wrong!";
        document.getElementById("error").innerHTML = "";
        response = false;
    }
}
function setNewBox(region){
    new google.maps.Rectangle(rec, rec.setOptions({
        map: map,
        strokeOpacity: 0, 
        fillOpacity: 0,
        fillColor:"black",
        strokeColor: "black",
        clickable: true,
        bounds: region
    }));
}
//Resetting attributes
function removeRectangle() {  
    rec.setMap(null);
    rec.setBounds(null);
 }

 //Overlay for displaying score
 function overlay(){
    document.getElementById("overlay").style.display = "block";
    document.getElementById("score").innerHTML = "You scored "+ score + " out of a possible 5 correct!";
 }
 function offOverlay(){
    document.getElementById("overlay").style.display = "none";
    location.reload();
 }

//Quiz Functions
function setQuestion(){
    document.getElementById("error").innerHTML = "";
    document.getElementById("status").innerHTML = "";
    if(response != null || questionNum == 0){
        switch (questionNum) {
            case 0:
                //Question 1
                removeRectangle();
                document.getElementById("question").innerHTML = "Where is the Jerome Richfield Building?";
                setNewBox(jerome);
                break;
            case 1:
                //Question 2
                removeRectangle();
                document.getElementById("question").innerHTML = "Where is the Live Oak Building?";
                setNewBox(liveOak);
                break;
            case 2:
                //Question 3
                removeRectangle();
                document.getElementById("question").innerHTML = "Where is the Sierra Building?";
                setNewBox(sierra);
                break;
            case 3:
                //Question 4
                removeRectangle();
                document.getElementById("question").innerHTML = "Where is the Book Store?";
                setNewBox(bookStore);
                break;
            case 4:
                //Question 5
                removeRectangle();
                document.getElementById("question").innerHTML = "Where is the Jacaranda?";
                setNewBox(jacaranda);
                //Changing to make value to submit.
                document.getElementById("next").type = "submit";
                document.getElementById("next").value = "Submit";
    
                break;
            case 5:
                //Finished with the Quiz and add overlay.
                document.getElementById("next").onclick = overlay();
                break;
            default:
                //Error
                document.getElementById("error").innerHTML = "Something Broke :(";
                break;
        }
    
        //Increment to the next question.
        questionNum += 1;
        response = null;

    } else{
        //Error case for it there is no selection.
        document.getElementById("error").innerHTML = "First make a selection.";
    }
}

