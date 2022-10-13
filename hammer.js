class Hammer {

    constructor() {
        this.x = 230;
        this.y = 230;
        this.width = 80;
        this.height = 80;

    }


    draw() {
        const image = new Image()
        image.src = "./images/hammer.png";
        context.drawImage(image, this.x, this.y, this.width, this.height);
    }
}