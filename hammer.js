class Hammer {
    constructor() {
        this.x = 350;
        this.y = 710;
        this.width = 50;
        this.height = 50;
        this.image = new Image()
    }

    draw() {
        this.image.src = "./images/hammer.png";
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}