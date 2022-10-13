class Hole {
    constructor() {
        this.x = 200;
        this.y = 200;
        this.width = 120;
        this.height = 120;

    }

    draw() {
        const image = new Image()
        image.src = "./images/hole.png";
        context.drawImage(image, this.x, this.y, this.width, this.height);
    }
}