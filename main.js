img="";
objects=[];
status="";

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video= createCapture(380,380);
    video.hide();
    objectDetector= ml5.objectDetector("cocossd",modelLoaded);

}
function modelLoaded(){
    console.log("modelLoaded!");
    status=true;
    
}
function gotResults(error,results){
    if(error){
        console.log(error);

    }
    console.log(results);
    objects=results;
}


function draw(){
    image(video,0,0,380,380);
    if(status!= ""){
        objectDetector.detect(video,gotResults);

        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status:Objects Detected";
document.getElementById("number_of_objects").innerHTML="Number of objects detected are:"+objects.length;
fill("cyan");
percent=floor(objects[i].confidence*100);
text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);

noFill();
stroke("cornflowerblue");
rect(objects[i].x,objects[i].y,objects[i].height,objects[i].width);


        }
value=document.getElementById("text").value;
        if(objects[i].label==value){
            document.getElementById("status").innerHTML=value+" Found";
        }
    }

}

function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    
}
function modelLoaded(){
    console.log("model Loaded!!");
    video.loop();
    video.speed(1);
    video.volume(0);
    status=true;
}
function gotResults(error,results){
    if(error){
        console.log(error);

    }
    console.log(results);
objects=results;
}
