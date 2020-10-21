// 1. scan the frame
// 2. detect every face
// 3. store positions into arrays
// 4. look at every face closeup and check for mask

console.log(ml5.version)

let cW = 400
let cH = 300

let zoomFactor = 0.1

let classifier;
let imageModelURL = "/model/"

let boxes = []

function modelReady() {
    console.log("Model loaded");
    faceapi.detect(gotResults)
}

function maskClassifierReady() {
    console.log("Mask-Classifier Ready");
}



function gotMaskResult(error, results) {
    console.log("Mask result")
        //console.log(results)
    textSize(32);
    fill(0, 102, 153);
    console.log(results[0].label, results[0].confidence)
    $("#prediction").text(results[0].label + ": " + results[0].confidence);
}

function gotResults(error, results) {
    if (error) {
        console.error(error)
    } else {
        //console.log(results);
        boxes = []
        results.forEach(res => {
            box = {
                "x": parseInt(res._box._x),
                "y": parseInt(res._box._y),
                "w": parseInt(res._box._width),
                "h": parseInt(res._box._height)
            }
            boxes.push(box)
            classifier.classify(video.get(box.x + (box.x * zoomFactor * -1), box.y + (box.y * zoomFactor * -1), box.w + (box.w * zoomFactor), box.h + (box.h * zoomFactor)), gotMaskResult)
                //classifier.classify(video, gotMaskResult)
            stroke(255, 255, 255)
                //rect(box.x + (box.x * zoomFactor * -1), box.y + (box.y * zoomFactor * -1), box.w + (box.w * 2 * zoomFactor), box.h + (box.h * 2 * zoomFactor))
        });

    }
}

function drawBox(boxes, r, g, b) {

    // circle(x,y,10)

    boxes.forEach(box => {
        stroke(r, g, b)
        line(box.x, box.y, box.x + box.w, box.y)
        line(box.x + box.w, box.y, box.x + box.w, box.y + box.h)
        line(box.x + box.w, box.y + box.h, box.x, box.y + box.h)
        line(box.x, box.y + box.h, box.x, box.y)
            //console.log("Box")
    });



}

const detectionOptions = {
    withLandmarks: false,
    withDescriptors: false,
};
// Initialize the magicFeature




function setup() {

    createCanvas(cW, cH);
    video = createCapture(VIDEO);
    video.size(cW, cH);
    video.hide();
    // video.hide(); // Hide the video element, and just show the canvas
    classifier = ml5.imageClassifier(imageModelURL + "model.json", maskClassifierReady)
    faceapi = ml5.faceApi(video, detectionOptions, modelReady)

}

function draw() {


    if (frameCount % 1 == 0) {

        faceapi.detect(gotResults)

    }

    image(video, 0, 0, cW, cH)
    drawBox(boxes, 226, 0, 116);

}