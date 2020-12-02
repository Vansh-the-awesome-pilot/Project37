//gamestates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var doraemon,doraemon_running;
var back,backImg,invisibleGround;
var doraCake,doraCakeImg,car,carImg;
var cakeGroup,carGroup;
var gameOver,gameOverImg;
var restart,restartImg;

var score;

function preload(){
doraemon_running = loadAnimation("Doraemon 1.png","Doraemon 2.png","Doraemon 3.png","Doraemon 4.png","Doraemon 5.png","Doraemon 6.png");
doraemon_still = loadImage("doraemon_fallen.png");
backImg = loadImage("background2.png");

  
doraCakeImg = loadImage("doracake.png");
carImg = loadImage("police_car.png"); 
  
  gameOverImg = loadImage("gameover3.png");
  restartImg = loadImage("restart.png");
}
function setup() {
  createCanvas(600, 600);
  
  
  back = createSprite(600,300,400,20);
  back.addImage(backImg);
  back.scale = 1.2;

  doraemon = createSprite(80,490,20,50);
  doraemon.addAnimation("running",doraemon_running);
  doraemon.scale = 0.9;
  
  gameOver = createSprite(300,150);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,300);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.3;
  restart.scale = 1.2;
  
  invisibleGround = createSprite(200,510,800,10);
  invisibleGround.visible = false;
  
  cakeGroup = createGroup();
  carGroup = createGroup();
  
  doraemon.debug = false;
  
  score = 0;
}

function draw() {
   background(255);
back.velocityX = -5;
  
  //gamestate = play
  if(gameState === PLAY){
    
    gameOver.visible = false;
    restart.visible = false;
    
  back.velocityX = -(6 + 3* score/100);
  
  
  if(back.x < 0){
    back.x = back.width/2;
  }
  
  if(keyDown("space") && doraemon.y >= 300){
    doraemon.velocityY = -20;
  }
    
  doraemon.velocityY = doraemon.velocityY + 1;
  
  cake();
  car();
  
    if(carGroup.isTouching(doraemon)) {
   gameState = END; 
    }
      if(cakeGroup.isTouching(doraemon)){
      cakeGroup.destroyEach();
        score = score+2;
      }
   }
  //gameste = end
  else if(gameState === END){
    
    
    gameOver.visible = true;
      restart.visible = true;
     
     
    if(mousePressedOver(restart)) {
      reset();
    }
    
    back.velocityX = 0;
    doraemon.velocityY = 0;
    doraemon.addAnimation("still",doraemon_still);
    doraemon.scale = 0.9;
    
    carGroup.setLifetimeEach(-1);
    cakeGroup.setLifetimeEach(-1);
    
     carGroup.setVelocityXEach(0);
     cakeGroup.setVelocityXEach(0); 
  
    }
  
  
  doraemon.collide(invisibleGround);
  
  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  textFont("algerian");
  text("SCORE : "+score,250,50);
 

}
//cake function
function cake(){
  if(World.frameCount % 80 === 0){
   var cake = createSprite(550,500,10,10);
    cake.y = Math.round(random(100,450));
    cake.addImage(doraCakeImg);
    cake.scale = 0.06;
    cake.velocityX = -6;
    
    cake.lifetime = 100;
    
    cake.depth = doraemon.depth;
    doraemon.depth = doraemon.depth+1;
  
    cakeGroup.add(cake);
  
  }
}
//car function
function car(){
  if(World.frameCount % 120 === 0){  
  var car = createSprite(400,470,10,10);
  car.addImage(carImg);
  car.velocityX = -(6 + score/100);
  car.scale = 0.6;
  car.lifetime = 100;
  
  carGroup.add(car);
}
}
//reset function
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  doraemon.addAnimation("running",doraemon_running);
  cakeGroup.destroyEach();
  carGroup.destroyEach();
  score = 0;
}