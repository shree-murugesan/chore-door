/** GLOBAL VARIABLES **/
let door1 = document.getElementById('door1');
let door2 = document.getElementById('door2');
let door3 = document.getElementById('door3');
let botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
let beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
let spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
let closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";
let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let startButton = document.getElementById('start');
let currentlyPlaying = true;
let score = 0;
let highestScore = 0;
let currentStreak = document.getElementById('score-num');
let bestStreak = document.getElementById('high-score-num'); 
currentStreak.innerHTML = score;
bestStreak.innerHTML = highestScore;


/** FUNCTIONS **/
function isBot(door) {
  if (door.src === botDoorPath) {
      return true;
  } else {
      return false;
  }
}

function isClicked(door) {
  if (door.src === closedDoorPath) {
      return false;
  }
  else {
      return true;
  }
}


function playDoor(door) {
  numClosedDoors--;
  if (numClosedDoors === 0) {
    gameOver("win");
  }
  else if (isBot(door)) {
    gameOver();
  }
}

function randomChoreDoorGenerator() {
  let choreDoor = Math.floor(Math.random() * 3);
  if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = spaceDoorPath;
    openDoor3 = beachDoorPath;
  }
  else if (choreDoor === 1) {
    openDoor1 = beachDoorPath;
    openDoor2 = botDoorPath;
    openDoor3 = spaceDoorPath;
  }
  else {
    openDoor1 = spaceDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = botDoorPath;
  }
}

door1.onclick = () => {
  if (!isClicked(door1) && currentlyPlaying) {
      door1.src = openDoor1;
      playDoor(door1);
  }
}
door2.onclick = () => {
  if (!isClicked(door2) && currentlyPlaying) {
      door2.src = openDoor2;
      playDoor(door2);
  }
}
door3.onclick = () => {
  if (!isClicked(door3) && currentlyPlaying) {
      door3.src = openDoor3;
      playDoor(door3);
  }
}

startButton.onclick = () => {
  if (!currentlyPlaying) {
      startRound();
  }
}

function startRound() {
  door1.src = closedDoorPath;
  door2.src = closedDoorPath;
  door3.src = closedDoorPath;
  numClosedDoors = 3;
  startButton.innerHTML = 'Good luck!';
  currentlyPlaying = true;
  randomChoreDoorGenerator();
}

function gameOver (status) {
  if (status === "win") {
    startButton.innerHTML = 'You win! Play again?';
    getScores();
  }
  else {
    startButton.innerHTML = 'Game over! Play again?';
      score = 0;
      currentStreak.innerHTML = score;
  }
  currentlyPlaying = false;
}

function getScores (status) {
    score++;
    currentStreak.innerHTML = score;
    if (score > highestScore) {
        highestScore = score;
        bestStreak.innerHTML = highestScore;
    }
}

startRound();



