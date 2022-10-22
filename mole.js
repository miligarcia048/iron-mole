class Mole {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 100;
        this.crashedMole = false;
    }

    draw(crashed) {
        const image = new Image()
        if (crashed) {
            debugger
            image.src = "./images/killed-mole.png";
        } else {
            image.src = "./images/mole.png";
        }
        context.drawImage(image, this.x, this.y, this.width, this.height);
    }



}