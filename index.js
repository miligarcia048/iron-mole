const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

debugger
let randomCoordinate = Math.floor(Math.random() * 8);

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

    // const mole = new Mole();
    // currentGame.mole = mole;
    // currentGame.mole.draw();

    cancelAnimationFrame(currentGame.animationId);
    updateCanvas();
}


function updateCanvas() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);


    holesCoordinates.forEach((coord) => {
        const hole = new Hole(coord.x, coord.y);
        hole.draw();
    })

    const randomMole = new Mole(holesCoordinates[randomCoordinate].x, holesCoordinates[randomCoordinate].y);
    randomMole.draw();



    currentGame.hammer.draw();
    currentGame.animationId = requestAnimationFrame(updateCanvas);
}


startGame();