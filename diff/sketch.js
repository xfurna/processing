var grid;
var next;
var Da=1;
var Db=0.5;


var k=0.0549;
var feed=0.0767;

function setup(){
    createCanvas(200,200);
    pixelDensity(1);
    grid=[];
    next=[];
    for(var i=0; i<width;i++){
        grid[i]=[];
        next[i]=[];
        
        for(var j=0;j<height;j++){
            grid[i][j]={a:1,b:0};
            next[i][j]={a:1,b:0};
            // grid[i][j]={a:1,b:0};
        }
    }
    for(var x=88;x<112;x++){
        for(var y=88;y<112;y++)
        grid[x][y].b=1;
    }
}

function draw(){
    background(51);

    for(var i=1; i<width-1;i++){
        for(var j=1;j<height-1;j++){
            var a=grid[i][j].a;
            var b=grid[i][j].b;
            next[i][j].a=a + Da*lapA(i,j) - a*b*b + feed*(1-a);
            next[i][j].b=b + Db*lapB(i,j) + a*b*b - (k+feed)*b;
        }
        if(i>width/2){
            feed=0.055;
            k=0.062;
        }
    }


    loadPixels(); 
    for(var i=0; i<width;i++){
        for(var j=0;j<height;j++){
            var pix = (i+j*width)*4
            var c = floor((next[i][j].a - next[i][j].b) * 255);
            c = constrain(c, 0, 255);
            pixels[pix + 0] = (1+cos(i))*1;
            pixels[pix + 1] = (1+sin(i*j))*5;
            pixels[pix + 2] = (1+cos(j*i))*100;
            pixels[pix + 3] = c;
        }
    }
    updatePixels();
    var temp;
    temp=grid;
    grid=next;
    next=temp;
}

function lapA(i,j){
    var sum=0;
    sum+= grid[i][j].a*-1
    sum+= grid[i-1][j].a*0.2
    sum+= grid[i+1][j].a*0.2
    sum+= grid[i][j-1].a*0.2
    sum+= grid[i][j+1].a*0.2
    sum+= grid[i+1][j-1].a*0.05
    sum+= grid[i-1][j+1].a*0.05
    sum+= grid[i-1][j-1].a*0.05
    sum+= grid[i+1][j+1].a*0.05
    return sum;
}

function lapB(i,j){
    var sum=0;
    sum+= grid[i][j].b*-1
    sum+= grid[i-1][j].b*0.2
    sum+= grid[i+1][j].b*0.2
    sum+= grid[i][j-1].b*0.2
    sum+= grid[i][j+1].b*0.2
    sum+= grid[i+1][j-1].b*0.05
    sum+= grid[i-1][j+1].b*0.05
    sum+= grid[i-1][j-1].b*0.05
    sum+= grid[i+1][j+1].b*0.05
    return sum;
}