class Hammer {

    constructor(x, y) {
        this.x = x + 50;
        this.y = y - 5;
        this.width = 80;
        this.height = 80;

    }


    draw() {
        const image = new Image()
        image.src = "./images/hammer.png";
        context.drawImage(image, this.x, this.y, this.width, this.height);
    }
}