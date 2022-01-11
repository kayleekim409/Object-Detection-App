var img ="";
var status = "";
var object = [];
function preload() {
    img = loadImage("dog_cat.jpg");
}
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);

    detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detected Object";
}
function draw() {
    image(video, 0, 0, 380, 380);
    

    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        detector.detect(video, gotResult);
        for (i=0; i<object.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("objects").innerHTML = "Number of objects detected are " + object.length;
            fill(r, g, b);
            var percentage = floor(object[i].confidence * 100);
            
            text(object[i].label +"  "+ percentage + "%", object[i].x, object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

        }

    }
}
function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    detector.detect(video, gotResult);
}
function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}