const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

document.getElementById("game-board").style.display = "none";
document.getElementById("start-button").onclick = () => {
    document.getElementById("game-board").style.display = "block";
    document.getElementById("start-button").style.display = "none";
    startGame();
}

let currentGame;

const holesCoordinates = [{
        x: 70,
        y: 70
    }, {
        x: 270,
        y: 70
    },
    {
        x: 470,
        y: 70
    }, {
        x: 70,
        y: 200
    },
    {
        x: 270,
        y: 200
    },
    {
        x: 470,
        y: 200
    },
    {
        x: 70,
        y: 320
    },
    {
        x: 270,
        y: 320
    },
    {
        x: 470,
        y: 320
    },
]

function startGame() {
    currentGame = new Game();
    const hammer = new Hammer();
    currentGame.hammer = hammer;
    currentGame.hammer.draw();
    updateCanvas();
}


const intervalId = setInterval(() => {
    updateCanvas();
}, 2000)


function updateCanvas() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    holes();
    mole();
    hammer();
}


function holes() {
    holesCoordinates.forEach((coord) => {
        const hole = new Hole(coord.x, coord.y);
        hole.draw();
    })
}

function mole() {
    const randomCoordinate = Math.floor(Math.random() * 8);
    const showMole = new Mole(holesCoordinates[randomCoordinate].x, holesCoordinates[randomCoordinate].y);
    showMole.draw();
}

function hammer() {
    currentGame.hammer.draw();
}