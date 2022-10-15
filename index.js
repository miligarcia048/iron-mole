const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

document.getElementById("game-board").style.display = "none";
document.getElementById("gameOver").style.display = "none";
document.getElementById("start-button").onclick = () => {
    document.getElementById("game-board").style.display = "block";
    document.getElementById("start-button").style.display = "none";
    startGame();
};
//document.getElementById("playAgain").onclick = () => {
//    document.getElementById("game-board").style.display = "block";
//    document.getElementById("playAgain").style.display = "none";
//    document.getElementById("gameOver").style.display = "none";
//    startGame();
//    debugger
//};

let timer;
let timeLeft = 60;

let currentGame;

const randomCoordinateHammer = Math.floor(Math.random() * 8);

const holesCoordinates = [{
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
    timer = setInterval(updateTimer, 1000);
    updateTimer();

    currentGame = new Game();
    intervalId = setInterval(() => {
        updateCanvas();
    }, 1000 / 60);
}

function updateCanvas() {
    currentGame.frames++;
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    holes();
    currentGame.enemies.forEach((mole) => {
        mole.draw();
    });



    mole();
    currentGame.obstacle.forEach((hammer) => {
        hammer.draw();
    });
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
    currentGame.obstacle = [];
    currentGame.obstacle.push(showHammer);

}


document.addEventListener("keyup", (keyboardEvent) => {
    /* debugger */
    showHammer.moveHammer(keyboardEvent.key);
    console.log(keyboardEvent.key);
});


//collision 
document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        detectCollision();
    }
})

//detect collision
function detectCollision() {

    const hammer = currentGame.obstacle[0];
    const crashed = currentGame.enemies.some(function(mole) {
        return hammer.colision(mole);
    })

    if (crashed) {
        console.log("kill the mole")
        currentGame.enemies = [];
        mole();
        currentGame.score++;
        document.getElementById('score').innerHTML = currentGame.score;

    } else {
        console.log("lost one point")
        currentGame.score--;

        if (currentGame.score === -6) {
            gameOver();
        } else { document.getElementById('score').innerHTML = currentGame.score; }

    }

}

//TIMER
function updateTimer() {
    timeLeft = timeLeft - 1;
    if (timeLeft > 0)
        document.getElementById('timer').innerHTML = timeLeft;
    else {
        gameOver();

    }
}

//Game over
function gameOver() {
    document.getElementById("game-board").style.display = "none";
    document.getElementById("gameOver").style.display = "block";
}