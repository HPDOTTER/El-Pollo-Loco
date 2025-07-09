/**
 * Represents a bottle object in the game.
 * Extends MovableObject to inherit movement capabilities.
 * @class
 * @extends MovableObject
 */
class Bottle extends MovableObject {

    /**
     * offset for the bottle's hitbox.
     * @type {number} xOffset
     * @type {number} yOffset
     * @type {number} widthOffset
     * @type {number} heightOffset
     */
    xOffset = 25;
    yOffset = 10;
    widthOffset = 50;
    heightOffset = 10;

    /**
     * Array of image paths representing the bottle in different states.
     * @type {string[]}
     */
    IMAGES_BOTTLE = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    /**
     * Constructs a new Bottle instance.
     * Loads a random image from IMAGES_BOTTLE, loads all images,
     * sets a random horizontal position within the level bounds,
     * and initializes the position and size of the bottle.
     */
    constructor() {
        super().loadImage(this.IMAGES_BOTTLE[Math.floor(Math.random() * this.IMAGES_BOTTLE.length)]);
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 200 + (Math.random() * (level_end_x - 400));
        this.y = 460;
        this.height = 60;
        this.width = 60;
    }
}