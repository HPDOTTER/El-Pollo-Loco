/**
 * Represents the game world which holds the character, level, status bars, 
 * and all game objects. Responsible for handling collisions, rendering objects,
 * and updating the camera view.
 *
 * @class
 */
class World {
    /**
     * @type {Character} The main character of the game.
     * @property {Level} level The current level of the game.
     * @property {CanvasRenderingContext2D} ctx The drawing context of the canvas.
     * @property {HTMLCanvasElement} canvas The canvas element on which the game is rendered.
     * @property {Keyboard} Keyboard The keyboard input instance.
     * @property {number} camera_x The horizontal offset of the camera.
     * @property {Statusbars} healthStatusBar The health status bar, set to 100% initially.
     * @property {Statusbars} bottleStatusBar The bottle status bar, set to 0% initially.
     * @property {Statusbars} coinStatusBar The coin status bar, set to 0% initially.
     * @property {Statusbars} bossStatusBar The boss status bar, set to 100% initially.
     * @property {ThrowableObject[]} throwableObjects Array of throwable objects present in the world.
     */
    character = new Character();
    level = level1;
    ctx;
    canvas;
    Keyboard;
    camera_x = 0;
    healthStatusBar = new Statusbars('health', 100);
    bottleStatusBar = new Statusbars('bottle', 0);
    coinStatusBar = new Statusbars('coin', 0);
    bossStatusBar = new Statusbars('boss', 100);
    throwableObjects = [new ThrowableObject()];

    /**
     * Creates an instance of the World.
     *
     * @constructor
     * @param {HTMLCanvasElement} canvas - The canvas element used for rendering.
     * @param {Keyboard} Keyboard - The keyboard input instance.
     */
    constructor(canvas, Keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.Keyboard = Keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Sets the world property of the character to this world instance.
     *
     * @method
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the main game loop by checking collisions at 60 frames per second.
     *
     * @method
     */
    run() {
        setStoppableInterval(() => this.checkCollision(), 1000 / 100);
    }

    /**
     * Checks various collision scenarios including collisions with enemies,
     * coins, and bottles.
     *
     * @method
     */
    checkCollision() {
        this.enemiesCollision();
        this.coinCollision();
        this.bottleCollision();
    }

    /**
     * Checks for collisions between the character and all enemies.
     * Handles normal enemy collisions, endboss collisions, and bottle hits.
     *
     * @method
     */
    enemiesCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.alive) {
                if (!(enemy instanceof Endboss)) {
                    this.handleNormalEnemyCollision(enemy);
                } else if (enemy.alive) {
                    this.handleEndbossCollision(enemy);
                }
            } else if (this.bottleColliding(enemy)) {
                this.handleBottleHit(enemy);
            }
        });
    }

    /**
     * Handles collisions with normal enemies.
     * If the character is above the enemy, kills the enemy.
     * Otherwise, the character gets hit and updates the health status.
     *
     * @param {Enemy} enemy - The enemy with which the collision occurred.
     * @method
     */
    handleNormalEnemyCollision(enemy) {
        if (this.isCharacterAboveEnemy(enemy)) {
            this.characterKillEnemy(enemy);
        } else if (enemy.alive) {
            this.character.hit();
            this.healthStatusBar.setHealthPercentage(this.character.life);
        }
    }

    /**
     * Handles collisions with the Endboss enemy.
     * The character gets hit and the health status is updated.
     *
     * @param {Endboss} enemy - The Endboss enemy.
     * @method
     */
    handleEndbossCollision(enemy) {
        this.character.hit();
        this.healthStatusBar.setHealthPercentage(this.character.life);
    }

    /**
     * Handles collision when a throwable object hits an enemy.
     * Plays the bottle smash sound, marks the bottle as hit,
     * and kills the enemy if it is not an Endboss.
     *
     * @param {Enemy} enemy - The enemy that was hit.
     * @method
     */
    handleBottleHit(enemy) {
        playGameSound('./audio/bottlesmash.mp3', 1);
        this.markBottleHit(enemy);
        if (!(enemy instanceof Endboss)) {
            this.characterKillEnemy(enemy);
        } else {
            this.handleEndbossBottleHit();
        }
    }

    /**
     * Marks a throwable object as having hit an enemy.
     * Clears the object from the world after a delay.
     *
     * @param {Enemy} enemy - The enemy that was hit.
     * @returns {void}
     * @method
     */
    markBottleHit(enemy) {
        this.throwableObjects.some(throwable => {
            if (throwable.isColliding(enemy)) {
                throwable.bottlecontact = true;
                this.stopBottleSound();
                setTimeout(() => {
                    this.throwableObjects = this.throwableObjects.filter(t => t !== throwable);
                }, 1000);
            }
        });
    }

        /**
     * Stops the bottle rotating sound by calling the character's stopBottleRotatingSound method.
     *
     * @method
     */
    stopBottleSound() {
        if (this.character && typeof this.character.stopBottleRotatingSound === 'function') {
            this.character.stopBottleRotatingSound();
        }
    }

    /**
     * Handles a bottle hit on the Endboss.
     * Reduces the Endboss life, updates the boss status bar,
     * and if the life reaches zero, marks the Endboss as dead.
     *
     * @method
     */
    handleEndbossBottleHit() {
        const endboss = this.level.enemies[0];
        endboss.endbosslife -= 20;
        this.bossStatusBar.setBossPercentage(endboss.endbosslife);
        if (endboss.endbosslife <= 0) {
            endboss.alive = false;
        }
    }

    /**
     * Checks whether any throwable object is colliding with the given enemy.
     *
     * @param {Enemy} enemy - The enemy to check collision against.
     * @returns {boolean} True if a collision is detected; otherwise, false.
     * @method
     */
    bottleColliding(enemy) {
        return this.throwableObjects.some(throwable => 
            throwable.isColliding(enemy) && enemy.alive && throwable.bottlecontact === false
        );
    }

    /**
     * Checks for coin collisions between the character and coins in the level.
     * If a collision occurs, the coin is marked as collected,
     * removed from the level, the coin status is updated, and a sound is played.
     *
     * @method
     */
    coinCollision() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin) && !coin.collected) {
                coin.collected = true;
                this.character.collectCoin();
                this.level.coins = this.level.coins.filter(c => c !== coin);
                playGameSound('./audio/coinrecieved.mp3', 0.1);
            }
        });
    }

    /**
     * Checks for bottle collisions between the character and bottles in the level.
     * If a collision occurs and the character's bottlebar is less than 100,
     * the bottle is marked as collected, removed from the level, the bottle status is updated, and a sound is played.
     *
     * @method
     */
    bottleCollision() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && !bottle.collected && this.character.bottlebar < 100) {
                bottle.collected = true;
                this.character.collectBottle();
                this.level.bottles = this.level.bottles.filter(b => b !== bottle);
                playGameSound('./audio/bottlecollect.mp3', 0.1);
            }
        });
    }

        /**
     * Determines if the character is above the enemy by checking whether
     * the effective bottom of the character (y + height, adjusted by any height offset)
     * is above the midpoint of the enemy (enemy.y plus half of its height, with y offset).
     * Additionally, it ensures that the character's vertical speed is upward.
     *
     * @param {Enemy} enemy - The enemy to check against.
     * @returns {boolean} True if the character is considered above the enemy; otherwise, false.
     */
    isCharacterAboveEnemy(enemy) {
        const charYOffset = this.character.yOffset || 0;
        const charHeightOffset = this.character.heightOffset || 0;
        const characterBottom = this.character.y + charYOffset + this.character.height - charHeightOffset;
        const enemyYOffset = enemy.yOffset || 0;
        const enemyMidpoint = enemy.y + enemyYOffset + enemy.height / 2;
        return (characterBottom < enemyMidpoint) && (this.character.speedY < 0);
    }

    /**
     * Kills the enemy by marking it as not alive and removing it from the level after a delay.
     *
     * @param {Enemy} enemy - The enemy to be killed.
     * @method
     */
    characterKillEnemy(enemy) {
        enemy.alive = false;
        setTimeout(() => {
            this.level.enemies = this.level.enemies.filter(e => e !== enemy);
        }, 2000);
    }

    /**
     * Draws the world by clearing the canvas, updating the camera,
     * drawing environment objects, status bars, and the character.
     * Uses requestAnimationFrame for smooth animation.
     *
     * @method
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addEnvironment();
        this.ctx.translate(-this.camera_x, 0);
        this.addStatusBars();
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
    }

    /**
     * Adds all environment objects (background, clouds, throwable objects, coins, bottles)
     * to the map for drawing.
     *
     * @method
     */
    addEnvironment() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
    }

    /**
     * Adds status bars (health, bottle, coin, boss) to the map for drawing.
     *
     * @method
     */
    addStatusBars() {
        this.addToMap(this.healthStatusBar);
        this.addToMap(this.bottleStatusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.bossStatusBar);
    }

    /**
     * Adds an array of objects to the map by calling addToMap on each.
     *
     * @param {Object[]} objects - An array of drawable objects.
     * @method
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * Adds a single movable object or drawable object to the map.
     * Handles object direction before drawing.
     *
     * @param {DrawableObject} MO - The object to be drawn.
     * @method
     */
    addToMap(MO) {
        if (MO.img) {
            this.handleObjectDirection(MO);
            // Uncomment the following to draw hitboxes:
            // for Development purposes only.
            // MO.drawFrame(this.ctx);
            // MO.drawOffsetFrame(this.ctx);
        }
    }

    /**
     * Handles the drawing of an object based on its direction.
     *
     * @param {DrawableObject} MO - The object to be drawn.
     * @method
     */
    handleObjectDirection(MO) {
        if (MO.otherDirection) {
            this.flipObjectHorizontally(MO);
        } else {
            this.drawObject(MO);
        }
    }

    /**
     * Draws an object with horizontal flipping.
     *
     * @param {DrawableObject} MO - The object to be flipped and drawn.
     * @method
     */
    flipObjectHorizontally(MO) {
        if (MO instanceof Character) {
            this.ctx.save();
            this.ctx.translate(MO.x + MO.width, 0);
            this.ctx.scale(-1, 1);
            this.drawCharacterOrObject(MO, 0, MO.y);
            this.ctx.restore();
        } else {
            this.ctx.save();
            this.ctx.translate(MO.x + MO.width, MO.y);
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(MO.img, 0, 0, MO.width, MO.height);
            this.ctx.restore();
        }
    }

    /**
     * Draws an object normally with no flipping.
     *
     * @param {DrawableObject} MO - The object to be drawn.
     * @method
     */
    drawObject(MO) {
        this.ctx.drawImage(MO.img, MO.x, MO.y, MO.width, MO.height);
    }

    /**
     * Draws a character or object on the canvas.
     *
     * @param {DrawableObject} MO - The object or character to draw.
     * @param {number} x - The x-coordinate where the object is drawn.
     * @param {number} y - The y-coordinate where the object is drawn.
     * @method
     */
    drawCharacterOrObject(MO, x, y) {
        if (MO instanceof Character) {
            this.ctx.drawImage(MO.img, x, y, MO.width, MO.height);
        }
    }

}