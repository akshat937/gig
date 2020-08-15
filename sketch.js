const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var dog,happyDog;
var database;
var foodS,foodStock;
var feedButton;
var addButton; 
var fedTime , lastFed;
var foodObj;

function preload()
{
  dog_image = loadImage("images/dogImg.png");
  dog_image2 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  engine = Engine.create();
    world = engine.world;

  dog = createSprite(350,370,10,10);
  dog.addImage(dog_image);
  dog.scale = 0.3;

  database = firebase.database();
  foodStock = database.ref('Food');;
  foodStock.on("value",readStock);

  feedButton = createButton("Feed The Dog");
  feedButton.position(350,90);
  feedButton.mousePressed(feedDog);

  addButton = createButton("add Food");
  addButton.position(450,90);
  addButton.mousePressed(addFood);

  foodObj = new Food(100,250,40,40);
}


function draw() {  
  background(46,139,87);

  Engine.update(engine);
  
  
  
  

  drawSprites();
  foodObj.display();

  fill(255,255,254);
  textSize(15);
  if(lastFed>= 12){
    text("last fed: " + lastFed%12 + "PM",250,50);
  }else if(lastFed === 0){
    text("last Fed: 12 AM",250,50);
  }else{
    text("last Feed: " + lastFed + "AM",250,50);
  }

  textSize(15);
  fill("black")
  text("NOTE:- Press UP_ARROW Key to Feed Tom Milk",90,20)

  if(foodS !== undefined){
    textSize(25);
    stroke(15);
    fill("black")
    text("Food Remaining:- " + foodS,130,200);
  }

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food: x - 1
  })
}

function addFood(){
foodS++;
database.ref('/').update({
  Food:foodS
})

}
function feedDog(){

  dog.addImage(dog_image2);
  writeStock(foodS)

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime: hour()
  })
  }



