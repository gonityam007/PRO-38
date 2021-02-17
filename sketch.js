var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana ,bananaImage, obstacle, obstacleImage
var END =0;
var PLAY =1;
var gameState = PLAY;
var score;
function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.6;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  

  obstacleGroup=createGroup();
foodGroup=createGroup();
score=0;
}

function draw() { 
  background(0);

  if(gameState===PLAY){
    camera.position.y=player.y
    camera.position.x=player.x
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  if(keyDown("space")&&player.y>300){
    player.velocityY = -15;  
    
} 
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);


    if(player.isTouching(foodGroup)){
      score=score+2;
      
     
      foodGroup[0].destroy();
    }
    text("Score: "+ score, 250,50);

    if(player.isTouching(obstacleGroup)){
      player.velocityY=0;
      gameState=0;
      backgr.destroy();
    }
    spawnObstacles()
  spawnBanana()
  }
  if(gameState===END){
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    player.destroy(); 
   textSize(50);
    text("GAME OVER",400,200);
    camera.position.y=200
    camera.position.x=400
  }
  
  drawSprites();
  fill("red");
  textSize(15)
  text("Score: "+ score, 250,player.y-150);
}
function spawnObstacles(){
  if (frameCount % 300 === 0){
    var obstacle = createSprite(800,330,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -5;
     obstacle.scale = 0.19;
     obstacle.lifetime = 300;
     obstacleGroup.add(obstacle);
  }
 
 }
 
 function spawnBanana(){
   
   if (frameCount % 100 === 0){
    var banana = createSprite(800,340,10,10);
     banana.y=Math.round(random(200,260));
    banana.addImage(bananaImage);
    banana.velocityX = -5;
     banana.scale = 0.08;
     banana.lifetime = 300;
     foodGroup.add(banana);
   
 }
 }