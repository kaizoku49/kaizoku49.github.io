let interval = setInterval(run, 25);

let dvdSize = 160;
let corner = 0;

var width = document.documentElement.clientWidth;
var height = document.documentElement.clientHeight;

let dvds = [];

let colors = ["blue", "red", "green", "purple"];

function dvd(){
   this.x = Math.floor(Math.random() * width/1.5);
   this.y = Math.floor(Math.random() * width/1.5);
   this.xVel = Math.floor((Math.random() * 6 + 4) * (Math.floor(Math.random()*2) == 1 ? 1 : -1));
   this.yVel = Math.floor((Math.random() * 6 + 4) * (Math.floor(Math.random()*2) == 1 ? 1 : -1));
   this.color = colors[Math.floor(Math.random() * colors.length)];
   dvds.push(this);
}

for(let x = 0; x < 10; x++){
  createDVD();
}

function createDVD(){
  var newDvd = document.createElement("img"); 
  newDvd.classList.add("dvd-logo");
  newDvd.src = "https://cdn.glitch.com/86f4ab29-647a-47d9-9006-7a356068646c%2Fdvdwhite.png?1553819694869";
  newDvd.id = "dvd" + dvds.length;
  newDvd.innerText = "DVD";
  newDvd.style = "display: none;";
  document.body.append(newDvd);
  new dvd();
}

function run(){
  width = document.documentElement.clientWidth;
  height = document.documentElement.clientHeight;
  for(let z = 0; z < dvds.length; z++){
    let dvd = document.getElementById("dvd" + z);
    let newX = dvds[z].x + dvds[z].xVel;
    let newY = dvds[z].y + dvds[z].yVel;
    dvd.style = `left: ${newX}px; top: ${newY}px; background-color: ${dvds[z].color}; display: block`;
    dvds[z].x = newX;
    dvds[z].y = newY;
    checkBounds(dvds[z]);
  }
}

function checkBounds(dvd){
    
   let hit = false;
  
   if(dvd.x < 0){
     dvd.x = 0;
     dvd.xVel *= -1;
     hit = true;
   }

   if(dvd.x + dvdSize > width){
     dvd.x = width - dvdSize;
     dvd.xVel *= -1;
     hit = true;
   }
  
   if(dvd.y < 0){
     dvd.y = 0;
     dvd.yVel *= -1;
     hit = true;
   }
  
   if(dvd.y + dvdSize > height){
     dvd.y = height - dvdSize;
     dvd.yVel *= -1;
     hit = true;
   }
  
   //Check if hit corner
   let numWalls = 0;
   if(dvd.x == 0){
     numWalls++;
   }

   if(dvd.x + dvdSize == width){
     numWalls++;
   }
  
   if(dvd.y == 0){
     numWalls++;
   }
  
   if(dvd.y + dvdSize == height){
     numWalls++;
   }
  
   if(numWalls == 2){
     corner++;
     document.getElementById("corner-hits").innerText = "CORNER HITS: " + corner;
   }
}

function changeAmount(){
  let amount = document.getElementById("amount-input").value;
  
  if(amount > 250){
     amount = 250;
     document.getElementById("amount-input").value = 250;
  }
  
  let difference = amount - dvds.length;
  if(difference > 0){
    for(let x = 0; x < difference; x++){
      createDVD();
    }
  }else{
    for(let x = dvds.length - 1; x >= dvds.length + difference; x--){
      console.log(x);
      document.getElementById("dvd" + x).remove(); 
    }
    dvds = dvds.slice(0, dvds.length + difference);
  }
}