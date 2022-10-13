const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let currentGame;


function startGame() {
    currentGame = new Game();
    const hammer = new Hammer();
    currentGame.hammer = hammer;
    currentGame.hammer.draw();
    const hole = new Hole();
    currentGame.hole = hole;
    currentGame.hole.draw();
    cancelAnimationFrame(currentGame.animationId);
    updateCanvas();
}


function updateCanvas() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    currentGame.hammer.draw();
    currentGame.hole.draw();
    currentGame.animationId = requestAnimationFrame(updateCanvas);
}


startGame();