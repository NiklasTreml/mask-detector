// 1. scan the frame
// 2. detect every face
// 3. store positions into arrays
// 4. look at every face closeup and check for mask

console.log(ml5.version)

let cW = 800
let cH = 600

let boxes = []

function modelReady(){
    console.log("Model loaded");
    faceapi.detect(gotResults)

}

function gotResults(error, results) {
    if (error){
        console.error(error)
    }else{
        console.log(results);
        boxes = []
        results.forEach(res => {
            box = {
                "x" : res._box._x,
            "y" : res._box._y,
            "w" : res._box._width,
            "h" : res._box._height
            }
            boxes.push(box)
        });
        
    }
}

function drawBox(boxes){
    
    // circle(x,y,10)
    boxes.forEach(box => {
        line(box.x,box.y,box.x+box.w,box.y)
        line(box.x+box.w,box.y,box.x+box.w,box.y+box.h)
        line(box.x+box.w,box.y+box.h,box.x,box.y+box.h)
        line(box.x,box.y+box.h,box.x,box.y)
        console.log("Box")
    });
    
    
    
}

const detectionOptions = {
    withLandmarks: false,
    withDescriptors: false,
  };
  // Initialize the magicFeature
  

function setup(){
    createCanvas(cW,cH);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    // video.hide(); // Hide the video element, and just show the canvas
    faceapi = ml5.faceApi(video, detectionOptions, modelReady)
      
}

function draw(){
    
    
    if(frameCount % 5 == 0)
    {
    
    faceapi.detect(gotResults)
    image(video,0,0, cW,cH)
}
    drawBox(boxes);

}