class Food{

    constructor(x,y,width,height){

        this.body = Bodies.rectangle(x,y,width,height);
        this.width = width;
        this.height = height;
        this.image = loadImage("images/Milk.png");
        this.foodStock = 0;
        this.lastFed = 0;
        World.add(world,this.body);
    }

    display(){
var x = 80, y = 100;

imageMode(CENTER);
image(this.image,100,230,40,40);

if(this.foodStock !=0){
    for(var i = 0; i<this.foodStock;i++){
        if(i%10==0){
            x=80;
            y = y + 50;
        }
        image(this.image,x,y,40,40);
        x=x+30
    }
}


    }

    getFoodStock(){

    }

    updateFoodStock(){

    }

    deductFood(){

    }
}