/**
 * Represents a Small Chicken enemy in the game.
 * Extends MovableObject to inherit movement, gravity, and animation capabilities.
 * @class
 * @extends MovableObject
 */
class SmallChicken extends MovableObject {
    /**
     * The height of the small chicken.
     * @type {number} height
     * @type {number} width
     * @type {number} y position
     * @type {boolean} alive
     * @type {number} speed
     * @type {number} lastjump
     * @property {number} xOffset - Horizontal offset for collision detection.
     * @property {number} yOffset - Vertical offset for collision detection.
     * @property {number} widthOffset - Width offset for collision detection.
     * @property {number} heightOffset - Height offset for collision detection.
     */
    height = 55;
    width = 45;
    y = 180;
    alive = true;
    speed = 0.15 + Math.random() * 0.25;
    lastjump = 0;

    xOffset = 5;
    yOffset = 3;
    widthOffset = 7;
    heightOffset = 5;

    /**
     * Array of image paths for the small chicken walking animation.
     * @type {string[]}
     */
    Small_chicken_walking = 
        Array(5).fill('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        .concat(Array(5).fill('./img/3_enemies_chicken/chicken_small/1_walk/2_w.png'))
        .concat(Array(5).fill('./img/3_enemies_chicken/chicken_small/1_walk/3_w.png'));

    /**
     * Array of image paths for the small chicken dead state.
     * @type {string[]}
     */
    Small_Chicken_dead = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Constructs a new SmallChicken instance.
     * Loads the initial image, sets a random x-position within level boundaries,
     * preloads walking images, starts the animation loop, and applies gravity.
     */
    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = 300 + Math.random() * (level_end_x - 400);
        this.loadImages(this.Small_chicken_walking);
        this.animate();
        this.applyGravity();
    }

    /**
     * Animates the small chicken.
     * If alive and on the ground, continuously moves left and cycles through the walking animation.
     * Also causes the chicken to jump at random intervals.
     * If dead, loads the dead image and plays a death sound (only once).
     *
     * @method
     */
    animate() {
        setStoppableInterval(() => {
            if (this.shouldSnapToGround()) this.y = 457;
            if (this.alive && !this.isAboveGround()) {
                this.moveLeft();
                this.playAnimation(this.Small_chicken_walking);
                if (this.shouldJump()) this.jumpAndUpdateLastJump();
            } else if (!this.alive) {
                this.handleDeath();
            }
        }, 1000 / 60);
    }

    shouldSnapToGround() {
        return !this.isAboveGround() && this.y > 455 && new Date().getTime() - this.lastjump > 500 && this.alive;
    }

    shouldJump() {
        return new Date().getTime() - this.lastjump > 18000 * Math.random();
    }

    jumpAndUpdateLastJump() {
        this.jump();
        this.lastjump = new Date().getTime();
    }

    handleDeath() {
        this.loadImage('./img/3_enemies_chicken/chicken_small/2_dead/dead.png');
        if (!this.soundPlayed) {
            playGameSound('./audio/chickentoy.mp3', 0.3);
            this.soundPlayed = true;
        }
    }
}