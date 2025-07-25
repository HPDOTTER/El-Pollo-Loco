/**
 * Represents a Chicken enemy character in the game.
 * Extends MovableObject to inherit movement and animation capabilities.
 * @class
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    /**
     * The height of the chicken.
     * @type {number} height
     * @type {number} width 
     * @type {number} y
     * @type {boolean} alive
     * @property {number} xOffset - Horizontal offset for collision detection.
     * @property {number} yOffset - Vertical offset for collision detection.
     * @property {number} widthOffset - Width offset for collision detection.
     * @property {number} heightOffset - Height offset for collision detection.
     */
    height = 70;
    width = 60;
    y = 445;
    alive = true;

    xOffset = 3;
    yOffset = 3;
    widthOffset = 7;
    heightOffset = 5;

    /**
     * Array of image paths for the walking animation of the chicken.
     * Generated by concatenating arrays representing different walking frames.
     * @type {string[]}
     */
    Chicken_walking = 
        Array(5).fill('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        .concat(Array(5).fill('./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png'))
        .concat(Array(5).fill('./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'));

    /**
     * Array of image paths for the dead animation of the chicken.
     * @type {string[]}
     */
    Chicken_dead = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Constructs a new Chicken instance.
     * Loads the initial image, randomly positions the chicken,
     * loads the walking images, sets a random speed, and starts the animation.
     */
    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 300 + Math.random() * (level_end_x - 400);
        this.loadImages(this.Chicken_walking);
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Animates the chicken.
     * If the chicken is alive, continuously moves it left and plays the walking animation.
     * If the chicken is dead, loads the dead image and plays a death sound (only once).
     */
    animate() {
        setStoppableInterval(() => {
            if (this.alive) {
                this.moveLeft();
                this.playAnimation(this.Chicken_walking);
            } else {
                this.loadImage('./img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
                if (!this.soundPlayed) {
                    playGameSound('./audio/chickendead.mp3', 0.3);
                    this.soundPlayed = true;
                }
            }
        }, 1000 / 60);
    }
}