class Bunny {

    constructor (tempR, tempX, tempY, tempColR, tempColG, tempColB) {
      this.r = tempR;
      this.x = tempX;
      this.y = tempY;
      this.colR = tempColR
      this.colG = tempColG
      this.colB = tempColB
      this.speed = random(3)
  
      this.follow = function(mx, my){
        if (dist(this.x, this.y, mx, my) < this.r)
        { if(mx<this.x){
          print("bunny is following you")
          this.x -= 1}
          else{this.x+=1}
        }
      };
     
  
      this.gravity = (g) => {
        this.speed = this.speed + g
      }
  
      this.move = () => {
        this.y = this.y + this.speed
        if (this.y > height) {
          this.speed = this.speed * -.99
          this.y = height
        }
      }
      this.caught = function(){
        this.speed = 0
        this.x = -1000
  
      }
  
      this.display = function() {
        fill(tempColR, tempColG, tempColB)
        stroke(tempColR, tempColG, tempColB)
        ellipseMode(CENTER)
        //ears
        ellipse(this.x-this.r/2, this.y-this.r, this.r/3, this.r*3)
        ellipse(this.x+this.r/2, this.y-this.r, this.r/3, this.r*3)
        ellipse(this.x,this.y+this.r, this.r/2, this.r/2)
        fill(tempColR, 186, 177)
        ellipse(this.x-this.r/2, this.y-this.r, this.r/5, this.r*2)
        ellipse(this.x+this.r/2, this.y-this.r, this.r/5, this.r*2)
        //end ears
        //head
        fill(tempColR, tempColG, tempColB)
        stroke(tempColR, tempColG, tempColB)
        ellipse(this.x, this.y, this.r*2,)
        //end head
        //face
        stroke(148, 104, 95)
        noFill()
        beginShape()
        vertex(this.x-this.r/4, this.y)
        vertex(this.x, this.y+this.r/6)
        vertex(this.x+this.r/4, this.y)
        endShape()
        beginShape()
        vertex(this.x-this.r/4, this.y+this.r/3)
        vertex(this.x, this.y+this.r/6)
        vertex(this.x+this.r/4, this.y+this.r/3)
        endShape()
        fill(148, 104, 95)
        ellipse(this.x-this.r/2, this.y-this.r/4, this.r/3, this.r/3)
        ellipse(this.x+this.r/2, this.y-this.r/4, this.r/3, this.r/3)
        //end face
  
      }
    }
  }
  
  let bnuuy;
  let den = Array(1)
  let num_bnuuys;
  let gravity = .05
  let denLocation;
  let denSize;
  
  let gameOver = false
  let score = 0
  let timer = 30
  let level = 1
  let lives = 3
  let levelCounter = 0
  
  function setup() {
    createCanvas(750, 500);
    num_bnuuys = floor(random(3,5));
    bnuuy = new Array(num_bnuuys);
    for(let i=0; i<bnuuy.length; i++){
      bnuuy[i] = new Bunny((random(25, 50)), random(50+(i*width/(num_bnuuys+1)), 150+(i*width/(num_bnuuys+1))), random(0, 10), random (215, 255), random (185, 255), random (175, 255))
    }
      denLocation = random(50, 730)
      denSize = random(50, 200)
    den[0] = new Den(denLocation, denSize)
      
  }
  
  function draw() {
    background(184, 226, 227);
    
    
    //clouds
    stroke(250, 235, 147)
    fill(250, 235, 147)
    ellipseMode(CENTER)
    ellipse(750, 0, 250, 250)
    stroke(255)
    fill(255)
    ellipse(75, 75, 75, 75)
    ellipse(100, 100, 80,80)
    ellipse(130, 75, 90, 90)
  
    ellipse(340, 220, 80, 80)
    ellipse(380, 220, 100, 100)
    ellipse(430, 190, 120, 120)
    ellipse(360, 190, 80, 80)
  
    ellipse(670, 150, 90,90)
    ellipse(700, 120, 120, 120)
    ellipse(730, 150, 90,90)
    stroke(197, 227, 184)
    fill(197, 227, 184)
    rect(0, 450, 750, 475)
  //end clouds
    
  if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer --;
  }
  
  //text
    textFont("Courier New");
    textSize(48);
      textAlign(CENTER);
      stroke(240, 168)
      fill(240, 168, 194);
      text("Hoppy Easter! <3", width/2, height/2);
      textSize(24);
      textAlign(CENTER);
      text("help lead them to their dens!", width/2, height/1.5)
      text("Score:" + score, 100,100)
      text("Timer:" + timer, 100, 150)
  
      if (timer == 0) {
        if (score <5){
        textSize(70);
        stroke(255);
        fill(255, 0, 0)
        text("GAME OVER!", width/2, height/2);
        textSize(40)
        text("Not enough rabbits went home!", width/2, height/1.5)
        mouseX=2000
        }else if (score>5){
          textSize(70);
        stroke(255);
        fill(255, 138, 130)
        text("YOU WIN!", width/2, height/2);
        textSize(30)
        text("The den is full of happy bunnies!", width/2, height/1.5)
        }
      }
    
  
  //end text
  
  drawCarrot()
  
  for (let i = 0; i < den.length; i++) {
    den[i].display()
  }
  
  for (let i = 0; i < bnuuy.length; i ++) {
    bnuuy[i].gravity(gravity);
    bnuuy[i].move();
    bnuuy[i].follow(mouseX, mouseY);
    bnuuy[i].display();
    if (den[0].intersect(bnuuy[i])){
      bnuuy[i] = new Bunny((random(25, 50)), random(50+(random(width)), 150+(random(width))), random(0, 10), random (215, 255), random (185, 255), random (175, 255));
      score+=1
    }
      }
      
    }
  
  
  
    function drawCarrot() {
      //start leaves
      strokeWeight(3)
      stroke(158, 191, 98)
      fill(182, 217, 117)
      beginShape()
      vertex(mouseX,mouseY-10)
      vertex(mouseX-5,mouseY-30)
      vertex(mouseX+5,mouseY-30)
      endShape()
      beginShape()
      vertex(mouseX,mouseY-10)
      vertex(mouseX-25,mouseY-20)
      vertex(mouseX-15,mouseY-25)
      endShape()
      beginShape()
      vertex(mouseX,mouseY-10)
      vertex(mouseX+25,mouseY-20)
      vertex(mouseX+15,mouseY-25)
      endShape()
      //end leaves
      //start carrot
      stroke(201, 109, 34)
      fill(235, 134, 52)
      beginShape()
      vertex(mouseX,mouseY-17.5)
      vertex(mouseX+15, mouseY-15)
      vertex(mouseX+20,mouseY)
      vertex(mouseX+15, mouseY+10)
      vertex(mouseX,mouseY+50)
      vertex(mouseX-15, mouseY+10)
      vertex(mouseX-20,mouseY)
      vertex(mouseX-15,mouseY-15)
      vertex(mouseX,mouseY-17.5)
      endShape()
      //end carrot
      strokeWeight(3);
      }
  /*
      function drawDen(denLocation, denSize) {
        stroke(112, 84, 64)
        fill(166, 127, 99)
        ellipseMode(CENTER)
        //print ("denLocation:", denLocation)
        ellipse(denLocation, 470, denSize, 50)
        
      }*/
      class Den {
        constructor(denLocation, denSize) {
          this.x = denLocation
          this.y = 470
          this.x1 = denSize
          this.y1 = 50
          
          this.display = function() {
            fill(166, 127, 99)
            stroke(112, 84, 64)
            ellipseMode(CENTER)
            ellipse(this.x, this.y, this.x1, this.y1)
          }
          this.intersect = function(d) {
            let distance = dist(this.x, this.y, d.x, d.y); 
            if (distance < this.x1/2 + d.r) { 
              return true;
            } else {
              return false;
            }
          };
        }
      }