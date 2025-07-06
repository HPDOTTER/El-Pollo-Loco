/**
 * Represents a throwable object (e.g., a bottle) in the game.
 * Extends MovableObject to inherit movement, gravity, and animation capabilities.
 *
 * @class
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    /**
     * The height of the throwable object.
     * @type {number} height
     * @type {number} width
     * @type {number} speed y
     * @type {boolean} bottle contact
     * @type {?number} throw left interval
     * @type {?number} throw right interval
     */
    height = 60;
    width = 60;
    speedY = 20;
    bottlecontact = false;
    throwLeftIntervall = null;
    throwRightIntervall = null;

    xOffset = 16;
    yOffset = 16;
    widthOffset = 45;
    heightOffset = 45;

    /**
     * Array of image paths for the bottle rotating animation.
     * @type {string[]}
     */
    Bottle_rotating =
        Array(4).fill('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
        .concat(Array(4).fill('./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png'))
        .concat(Array(4).fill('./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png'))
        .concat(Array(4).fill('./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'));

    /**
     * Array of image paths for the bottle exploding animation.
     * @type {string[]}
     */
    Bottle_exploding =
        Array(16).fill('./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png')
        .concat(Array(16).fill('./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png'))
        .concat(Array(16).fill('./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png'))
        .concat(Array(16).fill('./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png'))
        .concat(Array(16).fill('./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png'))
        .concat(Array(16).fill('./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'));

    /**
     * Constructs a new ThrowableObject instance.
     *
     * @constructor
     * @param {number} x - The initial x-coordinate of the throwable object.
     * @param {number} y - The initial y-coordinate of the throwable object.
     */
    constructor(x, y) {
        super();
        this.loadImages(this.Bottle_rotating);
        this.loadImages(this.Bottle_exploding);
        this.x = x + 50;
        this.y = y + 80;
        this.animate();
    }

    /**
     * Animates the throwable object.
     * If the bottle has made contact, clears throw intervals, adjusts speed and position,
     * and plays the exploding animation. Otherwise, plays the rotating animation.
     * Also initiates a throw left or right based on the object's direction.
     *
     * @method
     */
    animate() {
        setStoppableInterval(() => {
            if (this.bottlecontact && otherDirection == false) {
                this.handleBottleContactRight();
            } else if (this.bottlecontact && otherDirection == true) {
                this.handleBottleContactLeft();
            }
            else {
                this.playAnimation(this.Bottle_rotating);
            }
        }, 1000 / 60);

        if (otherDirection && !this.bottlecontact) {
            this.throwleft();
        }
        if (!otherDirection && !this.bottlecontact) {
            this.throwright();
        }
    }

    /**
     * Handles the bottle's contact with an object.
     * If the bottle has made contact with an object, it clears the throw intervals,
     * adjusts the speed and position of the bottle, and plays the exploding animation.
     */
    handleBottleContactRight() {
        clearInterval(this.throwLeftIntervall);
        clearInterval(this.throwRightIntervall);
        this.speedY = -0.5;
        this.x += 0.25;
        setTimeout(() => {
            this.playAnimation(this.Bottle_exploding);
        }, 1000 / 15);
    }

    /**
     * Handles the bottle's contact with an object when thrown left.
     * Clears the throw intervals, adjusts the speed and position of the bottle,
     * and plays the exploding animation.
     */
    handleBottleContactLeft() {
        clearInterval(this.throwLeftIntervall);
        clearInterval(this.throwRightIntervall);
        this.speedY = -0.5;
        this.x -= 0.25;
        setTimeout(() => {
            this.playAnimation(this.Bottle_exploding);
        }, 1000 / 15);
    }

    /**
     * Initiates the leftward throw.
     * Sets upward speed, applies gravity, moves left immediately,
     * and sets an interval to continue moving left.
     */
    throwleft() {
        this.speedY = 16;
        this.applyGravity();
        this.x -= 50;
        this.throwLeftIntervall = setInterval(() => {
            this.x -= 10;
        }, 1000 / 60);
    }

    /**
     * Initiates the rightward throw.
     * Sets upward speed, applies gravity, and sets an interval to move right continuously.
     */
    throwright() {
        this.speedY = 16;
        this.applyGravity();
        this.throwRightIntervall = setInterval(() => {
            this.x += 10;
        }, 1000 / 60);
    }
}

