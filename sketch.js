var mode;
var score, hunterScore;
var bg;
var protector, protectorImg, protectorAImg;
var rhinoGroup, rhinoImg;
var hunterGroup, hunterImg;
var birdGroup,bird2Group, birdflyImg, birdflyAni;
var invisibleGround;
var backgroundImg;
var arrowImg, arrowGroup;
var gameOverImg,gameOver;
var dieSound, hunterDieSound, bgMusic, arrowSwoosh;

function preload(){
    //getBackgroundImg();
    bgMusic=loadSound("KazirangaBeats.mp3");
    protectorImg=loadAnimation("Warrior1.png", "Warrior2.png","Warrior3.png","Warrior4.png","Warrior5.png","Warrior6.png","Warrior7.png","Warrior8.png","Warrior9.png","Warrior10.png");
    rhinoImg= loadImage("rhino2.png");
    hunterImg= loadAnimation("hunter1.png","hunter2.png","hunter3.png");
    birdflyImg= loadImage("bird.png");
    birdflyAni= loadAnimation("birdfly1.png","birdfly2.png","birdfly3.png");
    backgroundImg=loadImage("DayForest.jpg");
    arrowImg=loadImage("arrow.png");
    dieSound=loadSound("die.mp3");
    gameOverImg=loadImage("gameOver.png");
    hunterDieSound=loadSound("hunterDie.mp3");
}

function setup(){
    createCanvas(windowWidth,windowHeight);
    mode=0;
    score=0;
    //bgMusic.loop();
    hunterScore=0;
  protector= createSprite(width/2-150,height-200, 50,50);
  protector.addAnimation("protectorAnimation",protectorImg);
  protector.scale=0.12;
  protector.setCollider("rectangle",0,0,protector.width, protector.height);
  
  
  invisibleGround= createSprite(windowWidth,20,height-200,windowWidth,10);
  invisibleGround.visible=false;
  protector.collide(invisibleGround);

  gameOver=createSprite(width/2,height/2,20,20);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.3;
  gameOver.visible=false;

  rhinoGroup= new Group();
  hunterGroup= new Group();
  birdGroup= new Group();
  
  bird2Group= new Group();
  arrowGroup=new Group();
  
}

function draw(){
    background(backgroundImg);
    protector.y= mouseY;

if(mode==0){


    spawnRhinos();
    spawnhunters();
    spawnbirds();
    spawnbirds2();
    score= score+Math.round((getFrameRate()/60));
    if (keyDown("A")|| touches.length>0) { 
      //arrowSwoosh.play(); 
      var temp_arrow=createArrow();
      temp_arrow.addImage(arrowImg);
      temp_arrow.y=mouseY;
      touches=[];
    } protector.collide(invisibleGround);

    if(hunterGroup.isTouching(arrowGroup)){
      hunterDieSound.play();
      hunterScore= hunterScore+1;
      hunterGroup.destroyEach();
       arrowGroup.destroyEach();
    }
    
    if(rhinoGroup.isTouching(protector)||rhinoGroup.isTouching(arrowGroup)){
      dieSound.play();
      rhinoGroup.destroyEach();
      arrowGroup.destroyEach();
      mode=1;
    }
}

if(mode==1){
    gameOver.visible=true;
    textSize(25);
    fill("white");
    text("YoU LoSe!!",width/2-50,height/2+100)
    rhinoGroup.setVelocityEach(0);
    hunterGroup.setVelocityEach(0);
    birdGroup.setVelocityEach(0);
    bird2Group.setVelocityEach(0);
    protector.collide(invisibleGround);

}


textFont('Georgia');
textSize(17);
    fill("white");
    text("Distance Covered: " + score,width/2+200,height/2-200);
    text("Hunters killed: "+ hunterScore,width/2+200,height/2-160);
   drawSprites();
}

function spawnRhinos() {
    if (frameCount % 190 === 0) {
    var rhino = createSprite(width,height-100,20,20);
    rhino.y = Math.round(random(250,350));
    rhino.addImage(rhinoImg);
    rhino.scale = 0.4;
    rhino.velocityX = -4;
    rhino.setCollider("circle",0,0,1);
     //assign lifetime to the variable
    rhino.lifetime = 200;
    
    //add each rhino to the group
    rhinoGroup.add(rhino);
  }
  
}


function spawnhunters() {
  //write code here to spawn the hunters
  if (frameCount % 150 === 0) {
    var hunter = createSprite(width,height-100,20,20);
    hunter.y = Math.round(random(250,350));
    hunter.addAnimation("hunterAnimation",hunterImg);
    hunter.scale = 0.11;
    hunter.velocityX = -4;
    hunter.setCollider("rectangle",0,0,hunter.width,hunter.height);
    hunter.lifetime = 200;
    hunterGroup.add(hunter);
  }
  
}

function spawnbirds() {
  //write code here to spawn the birds
  if (frameCount % 300 === 0) {
    var bird = createSprite(width/2-100,height-50,50,50);
    bird.y = Math.round(random(70,100));
    bird.addImage(birdflyImg);
    bird.scale = 0.3;
    bird.velocityX = 4;
    bird.lifetime = 200;
    birdGroup.add(bird);
  }
  
}


function spawnbirds2(){
  if (frameCount % 200 === 0) {
    var bird2 = createSprite(width,height-50,50,50);
    bird2.y = Math.round(random(70,100));
    bird2.addAnimation("birdflyAnimation",birdflyAni);
    bird2.scale = 0.25;
    bird2.velocityX = -3;
    bird2.lifetime = 500;
    bird2Group.add(bird2);
  }
  
}

 
function createArrow(){
    var arrow=createSprite(width/2-150,height-200, 50,5);
    arrow.addImage(arrowImg);
    arrow.scale=0.3;
    arrow.velocityX=6;
    arrow.setCollider("rectangle",0,0,arrow.width,arrow.height);
    arrowGroup.add(arrow);
    return arrow;
  
  }
