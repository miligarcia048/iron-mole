const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

document.getElementById("game-board").style.display = "none";
document.getElementById("start-button").onclick = () => {
  document.getElementById("game-board").style.display = "block";
  document.getElementById("start-button").style.display = "none";
  startGame();
};

let currentGame;

const randomCoordinateHammer = Math.floor(Math.random() * 8);

const holesCoordinates = [
  {
    x: 70,
    y: 70,
  },
  {
    x: 270,
    y: 70,
  },
  {
    x: 470,
    y: 70,
  },
  {
    x: 70,
    y: 200,
  },
  {
    x: 270,
    y: 200,
  },
  {
    x: 470,
    y: 200,
  },
  {
    x: 70,
    y: 330,
  },
  {
    x: 270,
    y: 330,
  },
  {
    x: 470,
    y: 330,
  },
];
const showHammer = new Hammer(470, 330);
function startGame() {
  currentGame = new Game();

  updateCanvas();
}

const intervalId = setInterval(() => {
  updateCanvas();
}, 1000 / 60);

function updateCanvas() {
  currentGame.frames++;
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  holes();
  currentGame.enemies.forEach((mole) => {
    mole.draw();
  });
  mole();

  hammer();
}

function holes() {
  holesCoordinates.forEach((coord) => {
    const hole = new Hole(coord.x, coord.y);
    hole.draw();
  });
}

function mole() {
  if (currentGame.frames % 120 === 0) {
    const randomCoordinate = Math.floor(Math.random() * 8);
    const showMole = new Mole(
      holesCoordinates[randomCoordinate].x,
      holesCoordinates[randomCoordinate].y
    );

    currentGame.enemies = [];
    currentGame.enemies.push(showMole);
  }
}

function hammer() {
  showHammer.draw();

  document.addEventListener("keyup", (keyboardEvent) => {
    /* debugger */
    showHammer.moveHammer(keyboardEvent.key);
    console.log(keyboardEvent.key);
  });
}
