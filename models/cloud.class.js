/**
 * Represents a cloud in the game.
 * Extends MovableObject to inherit movement capabilities.
 * @class
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    /**
     * The vertical starting position of the cloud.
     * @type {number} y
     * @type {number} width
     * @type {number} height
     */
    y = 20;
    width = 500;
    height = 270;

    /**
     * Array of image paths for the cloud.
     * @type {string[]}
     */
    cloudsImages = [
        './img/5_background/layers/4_clouds/1.png',
        './img/5_background/layers/4_clouds/2.png',
    ];
    
    /**
     * Constructs a new Cloud instance.
     * Loads a random image from the cloudsImages array, sets a random horizontal position,
     * and initiates the animation.
     */
    constructor() {
        super().loadImage(this.cloudsImages[Math.floor(Math.random() * this.cloudsImages.length)]);
        this.x = Math.random() * level_end_x;
        this.animate();
    }

    /**
     * Animates the cloud by moving it to the left.
     */
    animate() {
        this.moveLeft();
    }
}