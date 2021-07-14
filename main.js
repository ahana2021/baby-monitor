status="";
objects = [];
alarm="";

function preload(){
  alarm = loadSound("alarm.mp3");
}

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Baby";
}
function draw(){
  image(video,0,0,380,380);
}
function modelLoaded(){
  console.log("model loaded");
  status = true;
}
function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 380, 380);
      if(status != "")
      {
        r =  random(255);
        g =  random(255);
        b =  random(255);      
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Baby Found";
 
          fill(r,g,b);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

          if(object[i].label=="person"){
            document.getElementById("number_of_objects").innerHTML="Baby Found";
            console.log("stop");
            alarm.stop();
          }
          else{
            document.getElementById("number_of_objects").innerHTML="Baby Not Found!!";
            console.log("play");
            alarm.play();
          }
        }
          if(objects.lenght=0){
            document.getElementById("number_of_objects").innerHTML="Baby Not Found!!";
            console.log("play");
            alarm.play();
        }
      }
    }

