class Coin extends MovableObject {

    IMAGES_COIN = [
        'img/8_coin/coin_3.png',
        'img/8_coin/coin_4.png',
    ];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = 200 +(Math.random() * (level_end_x - 400));
        this.y = 300 + Math.random() * 100;
        this.height = 40;
        this.width = 40;
        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 1000 / 2);
    }
}