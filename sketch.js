
var dog, sadDog, happyDog;
var  foodS, foodStock;
var database;



function preload()
{
	sadDog=loadImage("images/dogImg1.png");
  happyDog=loadImage("images/dogImg.png");
}

function setup() {
  createCanvas(500, 500);  
  database=firebase.database()
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
  foodStock.set(20);

  dog=createSprite(250,350,10,60);
  dog.addImage(sadDog);
  dog.scale=0.2;

  }


function draw() {  
  background(46,139,87)

  if(foodS!==undefined){
    textSize(20);
    fill(255);
    text("NOTE: Press UP ARROW to feed DRAGO milk",50,50);
    text("Food Remaining: "+foodS,150,150)
  }
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog)
  }
  if(keyWentUp(UP_ARROW)){
    dog.addImage(sadDog);
  }

  if(foodS===0){
    foodS=30;
  }
  drawSprites();

}


function writeStock(x){
if(x<=0){
  x=0;
}
else{
  x=x-1
}
database.ref("/").update({
  Food:x
});
}

function readStock(data){
foodS=data.val();
}
