var angle
var sider
var Len=500
function setup() { 
  createCanvas(width*18, height*8);
  slider = createSlider(0, 2 * PI, PI / 4, 0.01)
  slider.position(10, height);
} 

function draw() { 
  var len=Len;
  background(51);
  stroke(255);
  angle = slider.value();
  translate(width/2, height);
  var llen= len*0.75
  branch(len); 
  branchup(llen)
}

function branch(len) {
  line(0,0,0,-len);
  translate(0,-len*0.5)
  if(len>10){
    push();
    rotate(angle*0.7);
    branch(len*0.6);
    pop();
    push();
    rotate(-angle*0.7);
    branch(len * 0.6)
    pop();  
  }
}
function branchup(len) {
  line(0,0,0,-len);
  translate(0,-len*0.5)
  if(len>10){
    push();
    rotate(angle*0.7);
    branchup(len*0.5);
    pop();
    push();
    rotate(-angle*0.7);
    branchup(len * 0.5)
    pop();  
  }
}