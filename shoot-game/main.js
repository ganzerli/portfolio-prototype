const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;
const UP_KEY = 38;
const SPACE_KEY = 32;
let heroMovement = 1; // defined in check collision
let laserSpeed = 3;
let enemysSpeed = 1;
let enemysArray = new Array();
let score = 0;
let hit = false;
let power = 0;

function createObject(element, x, y, w, h) {
  let instance = new Object();
  instance.element = element;
  instance.x = x;
  instance.y = y;
  instance.w = w;
  instance.h = h;
  return instance;
}

function setPosition(sprite) {
  //renders objects in DOM
  let e = document.getElementById(sprite.element);
  e.style.left = sprite.x + "px";
  e.style.top = sprite.y + "px";
}

let controller = new Object();
function handleControls() {
  controller.up ? (hero.y -= heroMovement) : false;
  controller.down ? (hero.y += heroMovement) : false;
  controller.right ? (hero.x += heroMovement) : false;
  controller.left ? (hero.x -= heroMovement) : false;
  if (controller.space && laser.y < 10) {
    //t give some time befor to recall the laser(have a shoot possibility)
    laser.x = hero.x + (hero.w / 2 - laser.w / 2);
    laser.y = hero.y;
  }
  ensureBounds(hero); //corrects if out of given fild
}

document.onkeydown = evt => {
  toggleKey(evt.keyCode, true);
};

document.onkeyup = evt => {
  //same
  toggleKey(evt.keyCode, false);
};

function ensureBounds(sprite, withY = true) {
  sprite.x < 20 ? (sprite.x = 20) : false;
  withY && sprite.y < 20 ? (sprite.y = 20) : false;
  sprite.x + sprite.w > 480 ? (sprite.x = 480 - sprite.w) : false;
  withY && sprite.y + sprite.h > 480 ? (sprite.y = 480 - sprite.h) : false;
}
//to make movements smoother than with onkeypressed.
function toggleKey(keyCode, isPressed) {
  //every pressed key check
  switch (keyCode) {
    case UP_KEY:
      controller.up = isPressed;
      break;
    case RIGHT_KEY:
      controller.right = isPressed;
      break;
    case DOWN_KEY:
      controller.down = isPressed;
      break;
    case LEFT_KEY:
      controller.left = isPressed;
      break;
    case SPACE_KEY:
      controller.space = isPressed;
      break;
    default:
      console.log("key not usable");
  }
}

function findOverflow(a, b) {
  return (
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
  );
}

function checkCollision() {
  for (let i = 0; i < enemysArray.length; i++) {
    if (findOverflow(enemysArray[i], laser)) {
      let foundElement = document.getElementById(enemysArray[i].element);
      foundElement.style.opacity = 0;
      foundElement.parentNode.removeChild(foundElement);
      enemysArray.splice(i, 1);
      i--;
      //checking for the laser
      score += 10;
      laser.y = -6;
      power++;
    } else if (findOverflow(hero, enemysArray[i])) {
      gameOver();
    } else if (enemysArray[i].y > 500) {
      // if one is over the bottom/screen or a specific distance from top
      let foundElement = document.getElementById(enemysArray[i].element);
      foundElement.style.opacity = 0;
      foundElement.parentNode.removeChild(foundElement);
      enemysArray.splice(i, 1);
      i--;
    }
  }
  // level 2 : the hero moves a bit faster
  power > 10 ? (heroMovement = 2) : (heroMovement = 1);

  // level 3 : the hero has faster laser
  power > 20 && power <= 30 ? (laserSpeed = 4) : false;

  //level 4	: hero gains super fast laser!!
  power > 30 ? (laserSpeed = 5) : false;
}

function gameOver() {
  hit = true;
  document.getElementById(hero.element).style.transition = "none";
  document.getElementById(hero.element).style.opacity = 0;
  document.getElementById(laser.element).style.opacity = 0;
  document.getElementById("gameOver").style.opacity = 1;
  document.getElementById("score").style.left = "9em";
  document.getElementById("score").style.top = "8em";
  enemysSpeed = -3;
  hero.y = 20;
}

function showSprites() {
  setPosition(hero);
  setPosition(laser);

  for (let i in enemysArray) {
    setPosition(enemysArray[i]);
  }
  var scoreDiv = document.getElementById("score");
  scoreDiv.innerHTML =
    "SCORE: " + score + "<br> laser:" + laserSpeed + " hero:" + heroMovement;
}

function updatePositions() {
  // of anithing without control over

  enemysArray.forEach(enm => {
    enm.y += enemysSpeed;
    enm.x += getRandom(7) - 3; //number between -3 & +3
    ensureBounds(enm, false);
  });
  laser.y -= laserSpeed;
}

function getRandom(maxSize) {
  return parseInt(Math.random() * maxSize);
}

// if the random number between 0 and 99 is 0 make an enemy.will be called every loop, in this case we have an enemy every given calculated time
function addEnemy() {
  if (getRandom(200) == 99) {
    let enemyName = "enemy" + getRandom(10000000); //very unique id
    let enemy = createObject(enemyName, getRandom(450), -40, 30, 30);

    var element = document.createElement("div"); // <----
    element.id = enemy.element;
    element.className = "enemy offset";
    document.querySelector(".container").appendChild(element); //    <----
    //appends the children (div) just created to the 0th child of the document, HTML.
    enemysArray.push(enemy);
  }
}

function reset() {
  hit = false;
  document.getElementById(laser.element).style.opacity = 1;
  document.getElementById("gameOver").style.opacity = 0;
  document.getElementById("score").style.left = "1em";
  document.getElementById("score").style.top = "1em";
  score = 0;
  power = 0;
  enemysArray.splice(0, enemysArray.length);
  enemysSpeed = 1;
  hero.x = 250;
  hero.y = 360;
  document.getElementById(hero.element).style.transition = "opacity 1s";
  document.getElementById(hero.element).style.opacity = 1;
}

function checkGameOver() {
  if (hit) {
    let gO = document.getElementById("gameOver");
    gO.addEventListener("click", () => reset());
  }
}

function loop() {
  let lastLoopRun = 0;
  if (new Date().getTime() - lastLoopRun > 40) {
    // loops every 40 MilliSeconds.
    handleControls(); //updates the values of postion
    addEnemy();
    checkCollision();
    updatePositions(); //...v
    showSprites(); //add the new values of position

    lastLoopRun = new Date().getTime();

    checkGameOver();
  }
  setTimeout("loop()", 4);
}

let hero = createObject("hero", 250, 360, 20, 20);
let laser = createObject("laser", 480, 480, 3, 6);

loop();
