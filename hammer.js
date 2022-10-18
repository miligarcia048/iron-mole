class Hammer {
    constructor(x, y) {
        this.x = x + 50;
        this.y = y - 5;
        this.width = 80;
        this.height = 80;
    }

    draw() {
        const image = new Image();
        image.src = "./images/hammer.png";
        context.drawImage(image, this.x, this.y, this.width, this.height);
    }

    moveHammer(key) {
        switch (key) {
            case "ArrowLeft":
                if (this.x >= 20) {
                    this.x -= 40;
                }

                break;
            case "ArrowRight":
                if (this.x <= 630) {
                    this.x += 40;
                }
                break;

            case "ArrowUp":
                if (this.y >= 50) {
                    this.y -= 40;
                }
                break;
            case "ArrowDown":
                if (this.y <= 400) {
                    this.y += 40;
                }
        }
    }
    colision(enemy) {
        return !(
            this.y + this.height < enemy.y || this.y > enemy.y + enemy.height || this.x + this.width < enemy.x || this.x > enemy.x + enemy.width)
    }
}