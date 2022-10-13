class Hammer {
    constructor() {
        this.x = 320;
        this.y = 220;
        this.width = 100;
        this.height = 100;

    }

    draw() {
        const image = new Image()
        image.src = "./images/hammer.png";
        context.drawImage(image, this.x, this.y, this.width, this.height);
    }
}