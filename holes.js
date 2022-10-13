class Hole {
    constructor(x, y) {

        this.x = x;
        this.y = y;
        this.width = 180;
        this.height = 150;

    }

    draw() {
        const image = new Image()
        image.src = "./images/hole.png";
        context.drawImage(image, this.x, this.y, this.width, this.height);
    }

}