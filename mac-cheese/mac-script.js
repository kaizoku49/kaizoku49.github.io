let startX = -1;
let startY = -1;
let isDown = false;
let type = "noodle";

window.addEventListener('mousedown', down);
window.addEventListener('mousemove', move);
window.addEventListener('mouseup', up);

window.addEventListener('touchstart', down);
window.addEventListener('touchmove', move);
window.addEventListener('touchend', up);


function down(e){
  e.preventDefault();
  e.stopPropagation();
  console.log("Down");
  isDown = true;
  
  let clientX;
  let clientY;
  
  if(e.type === "touchstart"){
     clientX = e.touches[0].clientX; 
     clientY = e.touches[0].clientY; 
  }else{
     clientX = e.clientX;
     clientY = e.clientY;
  }
  
  console.log(e);
  
  if(startX == -1 && startY == -1){
    startX = clientX; 
    startY = clientY;
  }
}

function move(e){
  e.preventDefault();
  e.stopPropagation();
  console.log(e);  
  let clientX;
  let clientY;
  
  if(e.type === "touchmove"){
     clientX = e.touches[0].clientX; 
     clientY = e.touches[0].clientY; 
  }else{
     clientX = e.clientX;
     clientY = e.clientY;
  }
  if(isDown){
     let dist = getDistance(startX, startY, clientX, clientY);
     if(type === "noodle"){
         if(dist > 40){
           var noodle = document.createElement('img');
           noodle.classList.add("noodle");
           
           let curAngle = angle(startX, startY, clientX, clientY) * (180/Math.PI) + 220;
           
           noodle.setAttribute("style", `left: ${startX - 20}px; top: ${startY - 20}px; transform: rotate(${curAngle}deg);`);
           noodle.src = "https://cdn.glitch.com/26c9b2a0-25e1-4ee0-b069-12e7269a1009%2Fmacaroni4.svg?1554246493313";
           
           document.body.appendChild(noodle);
           document.getElementById("tutorial").style = "display: none";
           //Change starting point
           startX = clientX;
           startY = clientY;
         }
       }else if(type === "fusilli"){
         if(dist > 40){
           var noodle = document.createElement('img');
           noodle.classList.add("long");
           
           let curAngle = angle(startX, startY, clientX, clientY) * (180/Math.PI) + 220;
           
           noodle.setAttribute("style", `left: ${startX - 20}px; top: ${startY - 20}px; transform: rotate(${curAngle}deg);`);
           //noodle.style.top = startY;
           noodle.src = "https://cdn.glitch.com/26c9b2a0-25e1-4ee0-b069-12e7269a1009%2Ffusilli5.svg?1554246450461";
           
           document.body.appendChild(noodle);
           document.getElementById("tutorial").style = "display: none";
           //Change starting point
           startX = clientX;
           startY = clientY;
         }
       }else if(type === "sauce"){
         if(dist > 5){
           let sauce = document.createElement('div');
           sauce.classList.add("sauce");
          
           
           sauce.setAttribute("style", `left: ${startX - 25}px; top: ${startY - 25}px;`);
           document.body.appendChild(sauce);
           document.getElementById("tutorial").style = "display: none";
           //Change starting point
           startX = clientX;
           startY = clientY;
         }
       }else if(type === "cheese"){
         if(dist > 40){
           var noodle = document.createElement('img');
           noodle.classList.add("cheese");
           
           let curAngle = angle(startX, startY, clientX, clientY) * (180/Math.PI) + 220;
           
           noodle.setAttribute("style", `left: ${startX - 20}px; top: ${startY - 20}px; transform: rotate(${curAngle}deg);`);
           //noodle.style.top = startY;
           noodle.src = "https://cdn.glitch.com/26c9b2a0-25e1-4ee0-b069-12e7269a1009%2Fshredded2.svg?1554428627200";
           
           document.body.appendChild(noodle);
           document.getElementById("tutorial").style = "display: none";
           //Change starting point
           startX = clientX;
           startY = clientY;
         }
       }
     }
}

function up(){
  isDown = false; 
  startX = -1;
  startY = -1;
}

function change(event, val){
  event.preventDefault();
  event.stopPropagation();
  
  //reset others
  document.getElementById("noodle-but").style = "";
  document.getElementById("fusilli-but").style = "";
  document.getElementById("sauce-but").style = "";
  document.getElementById("cheese-but").style = "";
  
  document.getElementById(val + "-but").style = "width: 50px; height: 50px; border-radius: 50px;";
  type = val;
}

function getDistance(x1, y1, x2, y2){
  return Math.pow(Math.pow(x2-x1,2) + Math.pow(y2-y1,2), .5);
}

function angle(x1, y1, x2, y2){
  let slope = (y2 - y1)/(x2-x1);
  return Math.atan(slope);
}