let timer;
let timeLeft = 60;
let currentGame;
let level;
let intervalId;
let volumeOn = false;
let volumeOnHome = false;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let myBackgroundSound = new Audio("./sounds/Fluffing-a-Duck.mp3");
let myBackgroundSound2 = new Audio("./sounds/Sneaky-Snitch.mp3");
let whacSound = new Audio("./sounds/whack04-105536.mp3");
let gameOverSound = new Audio("./sounds/ooh-123103.mp3");
let swooshSound = new Audio("./sounds/whoosh-6316.mp3");
let winSound = new Audio("./sounds/tadaa-47995.mp3");

const radioButtons = document.querySelectorAll("input[name=level]");


document.getElementById("start-button").onclick = () => {
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            level = radioButton.value;
            document.getElementById("game-board").style.display = "flex";
            document.getElementById("first-screen").style.display = "none";
            startGame();
            document.getElementById("score").innerHTML = currentGame.score;
        } else {
            document.getElementById("errorMessage").innerHTML =
                "You must select a level to start the game";
        }
    }
};

document.getElementById("levels").onclick = () => {
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            document.getElementById("errorMessage").innerHTML = " ";
        }
    }
};

document.getElementById("playAgain").onclick = () => {
    document.getElementById("errorMessage").innerHTML = " ";
    currentGame.score = 0;
    timeLeft = 60;
    clearInterval(intervalId);
    clearInterval(timer);
    document.getElementById("first-screen").style.display = "flex";
    document.getElementById("game-over").style.display = "none";

    ///check volume state when starting again
    if (volumeOn) {
        myBackgroundSound.play();
        document.querySelector(".vol-start").src = "/images/volOn.png";
    } else if (!volumeOn) {
        document.querySelector(".vol-start").src = "/images/volOff.png";
    }
};


//volume on game screen
document.querySelector(".vol-on").onclick = () => {
    if (volumeOn) {
        debugger
        volumeOn = false;
        document.querySelector(".vol-on").src = "/images/volOff.png";
        myBackgroundSound2.pause();
    } else if (!volumeOn) {
        volumeOn = true;
        document.querySelector(".vol-on").src = "/images/volOn.png";
        myBackgroundSound2.play();
    }
}

//volume on start screen
document.querySelector(".vol-start").onclick = () => {
    if (volumeOn) {
        volumeOn = false;
        document.querySelector(".vol-start").src = "/images/volOff.png";
        myBackgroundSound.pause();
    } else if (!volumeOn) {
        volumeOn = true;
        document.querySelector(".vol-start").src = "/images/volOn.png";
        myBackgroundSound.play();
    }
}

const randomCoordinateHammer = Math.floor(Math.random() * 8);
const hammer = new Hammer(470, 330);

//coordinates of the holes
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

function startGame() {
    myBackgroundSound.pause();
    //check if volume was on or off
    if (volumeOn) {
        myBackgroundSound2.play();
        document.querySelector(".vol-on").src = "/images/volOn.png";
    } else if (!volumeOn) {
        document.querySelector(".vol-on").src = "/images/volOff.png";
    }
    document.querySelector(".mode-level").innerHTML = level + " mode";

    timer = setInterval(updateTimer, 1000);
    updateTimer();

    currentGame = new Game();
    currentGame.hammer = hammer;
    const randomCoordinate = Math.floor(Math.random() * 8);
    currentGame.mole = new Mole(
        holesCoordinates[randomCoordinate].x,
        holesCoordinates[randomCoordinate].y
    );

    intervalId = setInterval(() => {
        updateCanvas();
    }, 1000 / 60);
}

function updateCanvas() {
    currentGame.frames++;
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    holes();
    currentGame.enemies.forEach((mole) => {
        if (currentGame.crashedMole) {
            mole.draw(true);
        } else {
            mole.draw();
        }
    });

    handleMole();
    currentGame.obstacle.forEach((hammer) => {
        hammer.draw();
    });
    handleHammer();
}

function holes() {
    holesCoordinates.forEach((coord) => {
        const hole = new Hole(coord.x, coord.y);
        hole.draw();
    });
}

function handleMole() {
    switch (level) {
        case "easy":
            gameSpeed = 200;
            break;
        case "medium":
            gameSpeed = 120;
            break;
        case "hard":
            gameSpeed = 70;
            break;
    }

    if (currentGame.frames % gameSpeed === 0) {
        currentGame.crashedMole = false;
        const randomCoordinate = Math.floor(Math.random() * 8);
        currentGame.mole.x = holesCoordinates[randomCoordinate].x;
        currentGame.mole.y = holesCoordinates[randomCoordinate].y;
        currentGame.enemies = [];
        currentGame.enemies.push(currentGame.mole);
    }
    if (currentGame.frames === 10) {
        currentGame.crashedMole = false;
        const randomCoordinate = Math.floor(Math.random() * 8);
        currentGame.mole.x = holesCoordinates[randomCoordinate].x;
        currentGame.mole.y = holesCoordinates[randomCoordinate].y;
        currentGame.enemies = [];
        currentGame.enemies.push(currentGame.mole);
    }
}

function handleHammer() {
    currentGame.obstacle = [];
    currentGame.obstacle.push(currentGame.hammer);
}

document.addEventListener("keyup", (keyboardEvent) => {
    currentGame.hammer.moveHammer(keyboardEvent.key);
});



//collision

document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
        currentGame.hammer.down = false;
        currentGame.hammer.draw();
        detectCollision();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        currentGame.hammer.down = true;
        currentGame.hammer.draw();
    }
});

//detect collision
function detectCollision() {
    const hammer = currentGame.obstacle[0];
    const crashed = currentGame.enemies.some(function(handleMole) {
        return hammer.colision(handleMole);
    });

    if (crashed) {
        currentGame.crashedMole = true;
        console.log("kill the mole");
        setTimeout(() => {
            currentGame.enemies = [];
            handleMole();
        }, 500);
        currentGame.score++;
        document.getElementById("score").innerHTML = currentGame.score;
        if (volumeOn) {
            whacSound.play();
        }
    } else {
        currentGame.mole.crashedMole = false;
        console.log("lost one point");

        currentGame.score--;
        if (volumeOn) {
            swooshSound.play();
        }
        if (currentGame.score === -6) {
            gameOver();
        } else {
            document.getElementById("score").innerHTML = currentGame.score;
        }
    }
}

//TIMER
function updateTimer() {
    timeLeft = timeLeft - 1;
    if (timeLeft > 0) { document.getElementById("timer").innerHTML = timeLeft; } else {
        gameOver();
    }
}

//Game over
function gameOver() {

    // only play final sound if audio is on
    if (volumeOn) {
        if (currentGame.score >= 12) {
            document.getElementById("title-game-over").innerHTML = "Hurray you beat the mole!";
            winSound.play();
            winSound.loop = false;
        } else {
            gameOverSound.play();
        }
    }


    myBackgroundSound2.pause();
    clearInterval(intervalId);
    clearInterval(timer);

    document.getElementById("final-score").innerHTML = currentGame.score;
    document.getElementById("game-board").style.display = "none";
    document.getElementById("game-over").style.display = "flex";
}