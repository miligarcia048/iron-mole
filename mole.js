class Mole {
    constructor(x, y) {

        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 100;

    }

    draw() {
        const image = new Image()
        image.src = "./images/mole.png";
        context.drawImage(image, this.x, this.y, this.width, this.height);
    }

}