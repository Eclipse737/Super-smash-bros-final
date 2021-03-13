var bg_img,bg;
var Marioimg,Mario,Marioimgleft;
var Sonicimg,Sonic;
var plat1,plat2;
var plat3,plat4;
var plat5,plat6;
var Fireball_img,Fireball,Fireball_imgleft,Fireballleft;
var Fireballgrp,Fireballleftgrp;
var gameState="START";
var gameOver,gameOver_img;
var restart,restart_img;
var deadSound,FireSound
function setup() {
  createCanvas(1800,700);
  bg=createSprite(770, 350, 50, 50);
  bg.addImage(bg_img)
  bg.scale=0.8
  plat1=createSprite(1200,500,0,0)
plat1.addImage(plat1img)
plat1.scale=0.6
//plat1.debug=true
plat2=createSprite(350,500,0,0)
plat2.addImage(plat2img)
plat2.scale=0.6
//plat2.debug=true
plat1.setCollider("rectangle",0,0,300,100)
plat2.setCollider("rectangle",0,0,300,100)
Mario=createSprite(350,460,0,0)
Mario.addImage(Mario_standing)
Sonic=createSprite(1200,460,0,0)
Sonic.addImage(Sonic_standingleft)
bg.visible=false
    plat1.visible=false
    plat2.visible=false
    Mario.visible=false
    Sonic.visible=false
    gameOver=createSprite(700,200,0,0)
  gameOver.addImage(gameOver_img);
  restart=createSprite(700,400,0,0)
  restart.addImage(restart_img)
  Fireballgrp=createGroup()
  Fireballleftgrp=createGroup()
  
}
function preload(){
  bg_img=loadImage("Images/Background.png")
  plat1img=loadImage("Images/Platform.png")
  plat2img=loadImage("Images/Platform.png")
  //Marioimg=loadAnimation("Images/Mario 1.png","Images/Mario 2.png","Images/Mario 3.png","Images/Mario 4.png")
  //Marioimgleft=loadAnimation("Images/Mario 1 left.png","Images/Mario 2 left.png","Images/mario 3 left.png","Images/mario 4 left.png")
  //Sonicimg=loadAnimation("Images/Sonic.png","Images/Sonic 1.png","Images/Sonic 2.png","Images/Sonic 3.png","Images/Sonic 4.png","Images/Sonic 5.png","Images/Sonic 6.png")
  //Sonicimgleft=loadAnimation("Images/Sonic left.png","Images/Sonic 1 left.png","Images/Sonic 2 left.png","Images/Sonic 3 left.png","Images/Sonic 4 left.png","Images/Sonic 5 left.png","Images/Sonic 6 left.png")
  Mario_standing=loadImage("Images/Mario 1.png")
  Mario_standingleft=loadImage("Images/Mario 1 left.png")
  Sonic_standing=loadImage("Images/Sonic 1.png")
  Sonic_standingleft=loadImage("Images/Sonic 1 left.png")
  Fireball_img=loadImage("Images/Fire ball.png")
  Fireball_imgleft=loadImage("Images/Fire ball left.png")
  gameOver_img=loadImage("Images/gameOver.png")
  restart_img=loadImage("Images/restart.png")
  FireSound=loadSound("Fireball.mp3")
  deadSound=loadSound("Dead sound.wav")
}
function draw() {
  background(255,255,255); 
  if(gameState==="START"){
    
    
    background("red")
    gameOver.visible=false
  restart.visible=false
  textSize(24)
    text("These are the keys we are using",200,100)
    text("For Mario press space for throwing a fireball",200,130)
    text("For Sonic press g for throwing a fireball",200,160)
    text("For Mario to jump press w",200,190)
    text("For Sonic to jump press up arrow",200,220)
    text("For starting the game press enter",200,250)
    if(keyDown("ENTER")){
      gameState="PLAY"
    }
  }
  if(gameState==="PLAY"){
    bg.visible=true
    plat1.visible=true
    plat2.visible=true
    Mario.visible=true
    Sonic.visible=true
  if(keyDown(UP_ARROW)){
    Sonic.velocityY=-10
    
  }
Sonic.velocityY=Sonic.velocityY+1
  if(keyDown("w")){
    Mario.velocityY=-10
    
  }

  Mario.velocityY=Mario.velocityY+1
  Sonic.collide(plat1)
  Mario.collide(plat2)
  if(keyDown("space")){
    if(frameCount%10===0){

    
    Fireball=createSprite(Mario.x,Mario.y,0,0)
    FireSound.play()
    Fireball.addImage(Fireball_img)
    Fireball.scale=0.1
    Fireball.velocityX=5
    Fireballgrp.add(Fireball)
  }
}
  if(keyDown("g")){
    if(frameCount%10===0){

    
    Fireballleft=createSprite(Sonic.x,Sonic.y,0,0)
    FireSound.play();
    Fireballleft.addImage(Fireball_imgleft)
    Fireballleft.scale=0.1
    Fireballleft.velocityX=-5
    Fireballleftgrp.add(Fireballleft)
  }
}
  if(Fireballgrp.isTouching(Fireballleft)){
    Fireballgrp.destroyEach()
    Fireballleftgrp.destroyEach()
    }
    if(Fireballleftgrp.isTouching(Mario)||Fireballgrp.isTouching(Sonic)){
      gameState="END"
      deadSound.play()

    }
}
if(gameState==="END"){
  bg.visible=false
  plat1.visible=false
  plat2.visible=false
  Mario.visible=false
  Sonic.visible=false
  gameOver.visible=true
  restart.visible=true
  background("white")
  Fireballgrp.destroyEach()
  Fireballleftgrp.destroyEach()
  
  if(mousePressedOver(restart)){
    reset();
  }
} 
  drawSprites();
}
function reset(){
  gameState="START"
  gameOver.visible=false
  restart.visible=false
}