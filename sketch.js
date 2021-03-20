var spaceship, spaceship_img;
var meteorite, meteorite_img, obstacleGroup;
var bg;
var music;
var bg_music;

var life = 5
var score = 0

var PLAY =1
var END =0
var gameState = PLAY

function preload(){
  spaceship_img = loadImage("spaceship.png")
  meteorite_img = loadImage("meteorite.png")
  bg = loadImage("background.jpg")
  music = loadSound("crash.mp3")
  bg_music = loadSound("music.mp3")
}

function setup() {
  createCanvas(1000,650);
  spaceship = createSprite(500, 550, 50, 50);
  spaceship.addImage(spaceship_img);
  spaceship.scale = 0.15

  //meteorite = createSprite(200,100,30,30);
  //meteorite.addImage(meteorite_img);
  //meteorite.scale = 0.2
  //meteorite.velocityY = 3

  obstacleGroup = createGroup()
}

function draw() {
  background(bg); 
  
  textSize(20)
  text("Score: "+score, 20, 50)
  text("Lives: "+life, 900, 50)

  if(gameState === PLAY){
    if(keyDown(RIGHT_ARROW)){
    spaceship.x += 2
  }

  if(keyDown(LEFT_ARROW)){
    spaceship.x -= 2
  }
  
  spawnObstacle();
  
  score = score + Math.round(World.frameRate/60)

  //bg_music.play();
  
  if(obstacleGroup.isTouching(spaceship)){
    music.play()
    gameState = END 
    life -= 1
  }

  
  if(life === 0){
    gameState = END
  }

  }
  else if(gameState === END){
    obstacleGroup.setVelocityXEach(0)
    obstacleGroup.destroyEach() 
    
    if(life>= 1 && life< 5){
      restart()
    }else if (life === 0){
      textSize(38)
      text("GAME OVER", 350, 325)
    }
    


  }


  

  
  
  drawSprites();

  
}

function spawnObstacle(){
  if(frameCount%50 === 0){
    meteorite = createSprite(random(100,850),0,30,30);
    meteorite.addImage(meteorite_img);
    meteorite.scale = 0.2
    meteorite.velocityY = 5+score/100;
    meteorite.lifetime = 325

    obstacleGroup.add(meteorite)

  }
}

function restart(){
  textSize(30)
  text("Press 'space' to restart",350,325)
  if(keyDown("space")){
    gameState = PLAY
    score = 0
  }
}