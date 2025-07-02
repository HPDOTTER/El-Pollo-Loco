/**
 * Represents a Coin in the game.
 * Extends MovableObject to inherit movement and animation capabilities.
 * @class
 * @extends MovableObject
 */
class Coin extends MovableObject {

    /**
     * Array of image paths for the coin's animation.
     * @type {string[]}
     */
    IMAGES_COIN = [
        './img/8_coin/coin_3.png',
        './img/8_coin/coin_4.png',
    ];

    /**
     * Constructs a new Coin instance.
     * Loads the initial coin image, preloads the animation images,
     * sets a random position within given boundaries, defines the size,
     * and starts the coin animation.
     */
    constructor() {
        super().loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = 200 + (Math.random() * (level_end_x - 400));
        this.y = 210 + Math.random() * 100;
        this.height = 40;
        this.width = 40;
        this.animate();
    }

    /**
     * Animates the coin by continuously cycling through its images.
     * The animation runs at a rate of 2 frames per second.
     */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 1000 / 2);
    }
}