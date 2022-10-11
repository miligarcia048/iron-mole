const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let currentGame;


function startGame() {
    currentGame = new Game();
    currentGame.hammer = new Hammer()
    console.log(currentGame.hammer.image.src)
    currentGame.hammer.draw();
    updateCanvas();
}



function updateCanvas() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    currentGame.hammer.draw();
}

startGame();