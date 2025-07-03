/**
 * Represents any movable object in the game.
 * Extends DrawableObject to inherit drawing capabilities.
 * Provides functionality for movement, gravity, collision detection, and animations.
 * @class
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    /**
     * @type {number} speed x
     * @type {number} speed y
     * @type {number} acceleration
     * @type {number} life
     * @type {number} lasthit
     * @type {number} coinbar
     * @type {number} bottlebar
     * @type {boolean} otherDirection
     */
    speed = 0.2;
    speedY = 0;
    acceleration = 1.2;
    life = 100;
    lasthit = 0;
    coinbar = 0;
    bottlebar = 0;
    otherDirection = false;

    /**
     * Applies gravity to the object.
     * Continuously updates the vertical position and speed,
     * simulating free-fall dynamics.
     */
    applyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) { 
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } 
        }, 1000 / 60);
    }

    /**
     * Determines whether the object is above ground.
     * Special cases are provided for ThrowableObject and Endboss, as well as when life is zero.
     *
     * @returns {boolean} True if the object is above ground; otherwise, false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else if (this.world && this.world.character && this.world.character.life == 0) {
            return true;
        } else if (world.level.enemies[0].endbosslife <= 0 && this instanceof Endboss) {
            return true;
        } else {
            return (this.y + this.height) <= 510;
        }   
    }

    /**
     * Plays an animation by cycling through a given array of image paths.
     * Updates the current image based on the internal counter.
     *
     * @param {string[]} images - Array of image paths to cycle through.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;  
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationOnce(images) {
        if (this.currentImage < images.length) {
            let path = images[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
        } else {
            this.currentImage = 0; // Reset to allow re-animation
        }
    }

    /**
     * Moves the object to the right by incrementing its x-coordinate.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by decrementing its x-coordinate.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by increasing its vertical speed.
     * Jump is only applied when the object is not already above ground.
     */
    jump() {
        if (!this.isAboveGround()) {
            this.speedY += 20;
        }
    }

    /**
     * Handles the object being hit.
     * Decreases life if more than 1 second has passed since the last hit.
     * Ensures life does not drop below zero.
     */
    hit() {
        let timePassed = new Date().getTime() - this.lasthit;
        timePassed = timePassed / 1000;
        if (timePassed > 1) {
            this.life -= 20;
            if (this.life < 0) {
                this.life = 0;
            } else {
                this.lasthit = new Date().getTime();
            }
        }
    }

    /**
     * Increases the coinbar by 20.
     * Caps the coinbar at 100 and updates the coin status bar in the world.
     */
    collectCoin() {
        this.coinbar += 20;
        if (this.coinbar > 100) {
            this.coinbar = 100;
        }
        this.world.coinStatusBar.setCoinPercentage(this.coinbar);
    }

    /**
     * Increases the bottlebar by 20.
     * Caps the bottlebar at 100 and updates the bottle status bar in the world.
     */
    collectBottle() {
        this.bottlebar += 20;
        if (this.bottlebar > 100) {
            this.bottlebar = 100;
        }
        this.world.bottleStatusBar.setBottlePercentage(this.bottlebar);
    }

    /**
     * Checks whether the object is currently hurt.
     * An object is considered hurt if less than 1 second has passed since last hit.
     *
     * @returns {boolean} True if the object is hurt; otherwise, false.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lasthit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks whether the object is dead.
     *
     * @returns {boolean} True if life is zero; otherwise, false.
     */
    isDead() {
        return this.life == 0;
    }

    /**
     * Checks for collision with another movable object using their hitboxes.
     * Hitboxes are adjusted by optional offset properties.
     *
     * @param {MovableObject} MO - Another movable object to check collision against.
     * @returns {boolean} True if a collision is detected; otherwise, false.
     */
    isColliding(MO) {
        const x1 = this.x + (this.xOffset || 0);
        const y1 = this.y + (this.yOffset || 0);
        const w1 = (this.width || 0) - (this.widthOffset || 0);
        const h1 = (this.height || 0) - (this.heightOffset || 0);

        const x2 = MO.x + (MO.xOffset || 0);
        const y2 = MO.y + (MO.yOffset || 0);
        const w2 = (MO.width || 0) - (MO.widthOffset || 0);
        const h2 = (MO.height || 0) - (MO.heightOffset || 0);

        return (
            x1 < x2 + w2 &&
            x1 + w1 > x2 &&
            y1 < y2 + h2 &&
            y1 + h1 > y2
        );
    }

    /**
     * Flips the image horizontally for rendering.
     * This is useful for displaying objects facing the opposite direction.
     *
     * @param {CanvasRenderingContext2D} ctx - The drawing context of the canvas.
     */
    flipImage(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(this.img, 0, this.y, this.width, this.height);
        ctx.restore();
    }
}