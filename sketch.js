var edges;
var bubbleG;


var PLAY=1;

var END=0;
var gameState=PLAY;


function preload(){
  backgroundImg = loadImage("background.jpg");
  dragonImg = loadImage("dragon.png");
  bubble1Img  = loadImage("bubble1.png");
  bubble2Img  = loadImage("bubble2.png");
  bubble3Img  = loadImage("bubble3.png");
  bubble4Img  = loadImage("bubble4.png");
  gameOverImg = loadImage("gameOver.png");
  
}



function setup() {
  createCanvas(500, 500);
  backg = createSprite(300, 300);
  backg.addImage(backgroundImg);
  backg.scale = 1.2;
  backg.velocityY = 2; 
  dragon = createSprite(300, 450,20,20);
  dragon.addImage(dragonImg);
  dragon.scale = 0.4;
  gameOver = createSprite(250, 200);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.4;
  gameOver.visible = false;
  bubbleG = new Group();
  
}

function draw() {
  
    background(220);
   
  //Game State play
  if(gameState===PLAY)
 {
  if(backg.y>350){
    backg.y = height/2;    
  }
  if(keyDown("left")){
   dragon.x = dragon.x - 4;
  
  }
   if(keyDown("right")){
    dragon.x = dragon.x + 4;
   }
 
  for(var i = 0; i < bubbleG.length; i ++){
   if(bubbleG.get(i).isTouching(dragon)){
    bubbleG.get(i).remove();
     gameState=END;
    gameOver.visible=true;
     }
  }
      spawnBubbles();
   }
  
  //End state
 else if(gameState===END)
 {
   gameOver.visible=true;
    //bubbleG.visible=false;
   bubbleG.setVelocityYEach(0);
   bubbleG.setVelocityXEach(0);
    bubbleG.setLifetimeEach(-1);
    
    if(mousePressedOver(gameOver)){
    reset();
    
  }
   //  dragon.velocityX=0;
   // dragon.velocityY=0;
      //dragon.visible=false;
  //  
  

  }
  dragon.debug = false;
  dragon.setCollider("circle", 0, 0, 200);
 
  
  

  edges = createEdgeSprites();
  dragon.bounceOff(edges[0]);
  dragon.bounceOff(edges[1]);
  dragon.bounceOff(edges[2]);
  dragon.bounceOff(edges[3]);
  
  drawSprites();

}
 function reset(){
     gameState = PLAY;
    gameOver.visible = false;
  // dragon.visible = true;
  //backg.visible = true;
  // bubbleG.destroyEach();
  
   
  }



function spawnBubbles(){
  if(frameCount%100 === 0){
    var bubble = createSprite(random(10, 350), 0);
    bubble.velocityY = 5;
    bubble.scale = 0.5;
    
    var rand = Math.round(random(1,4));
    switch(rand){
        case 1:bubble.addImage(bubble1Img);
        break;
        case 2:bubble.addImage(bubble2Img);
        break;
        case 3:bubble.addImage(bubble3Img);
        break;
        case 4:bubble.addImage(bubble4Img);
        break;
        default:break;   
        
    }
    bubbleG.add(bubble);
    bubble.debug = false;
  bubble.setCollider("circle", 0, 0, 30);
    bubble.lifetime=200;
  }
}






