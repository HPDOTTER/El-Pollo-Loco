/**
 * Represents the main playable character in the game, handling movement, animation, and interactions.
 * Inherits from MovableObject and manages state such as walking, jumping, idle, hurt, dead, and sleeping.
 * Handles user input, gravity, sound effects, and animation cycles.
 *
 * @class
 * @extends MovableObject
 * Initializes the character, loads all animation images, applies gravity, and starts animation loops.
 */

class Character extends MovableObject {
    /**    
     * * @property {number} height - The height of the character.
     * @property {number} y - The vertical position of the character.
     * @property {number} speed - The movement speed of the character.
     * @property {boolean} alive - Indicates if the character is alive.
     * @property {boolean} deadAnimationTriggered - Indicates if the death animation has been triggered.
     * @property {number} i - Internal counter for idle/sleeping animation.
     * @property {Audio} bottleRotatingAudio - Audio object for the bottle rotating sound.
     * @property {number} xOffset - Horizontal offset for collision detection.
     * @property {number} yOffset - Vertical offset for collision detection.
     * @property {number} widthOffset - Width offset for collision detection.
     * @property {number} heightOffset - Height offset for collision detection.
     * @property {string[]} Images_walking - Array of image paths for walking animation.
     * @property {string[]} Images_jumping - Array of image paths for jumping animation.
     * @property {string[]} Images_hurt - Array of image paths for hurt animation.
     * @property {string[]} Images_dead - Array of image paths for dead animation.
     * @property {string[]} Images_idle - Array of image paths for idle animation.
     * @property {string[]} Images_sleeping - Array of image paths for sleeping animation.
     * @property {Object} world - Reference to the game world instance.
    */
    height = 230;
    y = 180; 
    speed = 5;
    alive = true;
    deadAnimationTriggered = false;
    i = 0;
    bottleRotatingAudio = new Audio('./audio/rotatingbottle.mp3');

    xOffset = 10;
    yOffset = 95;
    widthOffset = 30;
    heightOffset = 105;
    
    Images_walking = 
        Array(12).fill('./img/2_character_pepe/2_walk/W-21.png')
        .concat(Array(12).fill('./img/2_character_pepe/2_walk/W-22.png'))
        .concat(Array(12).fill('./img/2_character_pepe/2_walk/W-23.png'))
        .concat(Array(12).fill('./img/2_character_pepe/2_walk/W-24.png'))
        .concat(Array(12).fill('./img/2_character_pepe/2_walk/W-25.png'))
        .concat(Array(12).fill('./img/2_character_pepe/2_walk/W-26.png'));

    Images_jumping = 
        Array(1).fill('./img/2_character_pepe/3_jump/J-32.png')
        .concat(Array(5).fill('./img/2_character_pepe/3_jump/J-33.png'))
        .concat(Array(5).fill('./img/2_character_pepe/3_jump/J-34.png'))
        .concat(Array(5).fill('./img/2_character_pepe/3_jump/J-35.png'))
        .concat(Array(5).fill('./img/2_character_pepe/3_jump/J-36.png'))
        .concat(Array(5).fill('./img/2_character_pepe/3_jump/J-37.png'))
        .concat(Array(5).fill('./img/2_character_pepe/3_jump/J-38.png'))
        .concat(Array(5).fill('./img/2_character_pepe/3_jump/J-39.png'));

    Images_hurt = 
        Array(6).fill('./img/2_character_pepe/4_hurt/H-41.png')
        .concat(Array(6).fill('./img/2_character_pepe/4_hurt/H-42.png'))
        .concat(Array(6).fill('./img/2_character_pepe/4_hurt/H-43.png'));

    Images_dead = 
        Array(4).fill('./img/2_character_pepe/5_dead/D-51.png')
        .concat(Array(4).fill('./img/2_character_pepe/5_dead/D-52.png'))
        .concat(Array(4).fill('./img/2_character_pepe/5_dead/D-53.png'))
        .concat(Array(4).fill('./img/2_character_pepe/5_dead/D-54.png'))
        .concat(Array(4).fill('./img/2_character_pepe/5_dead/D-55.png'))
        .concat(Array(4).fill('./img/2_character_pepe/5_dead/D-56.png'))
        .concat(Array(4).fill('./img/2_character_pepe/5_dead/D-57.png'));

    Images_idle =
        Array(16).fill('./img/2_character_pepe/1_idle/idle/I-1.png')
        .concat(Array(16).fill('./img/2_character_pepe/1_idle/idle/I-2.png'))
        .concat(Array(16).fill('./img/2_character_pepe/1_idle/idle/I-3.png'))
        .concat(Array(16).fill('./img/2_character_pepe/1_idle/idle/I-4.png'))
        .concat(Array(16).fill('./img/2_character_pepe/1_idle/idle/I-5.png'))
        .concat(Array(16).fill('./img/2_character_pepe/1_idle/idle/I-6.png'))
        .concat(Array(16).fill('./img/2_character_pepe/1_idle/idle/I-7.png'))
        .concat(Array(16).fill('./img/2_character_pepe/1_idle/idle/I-8.png'))
        .concat(Array(16).fill('./img/2_character_pepe/1_idle/idle/I-9.png'))
        .concat(Array(16).fill('./img/2_character_pepe/1_idle/idle/I-10.png'));

    Images_sleeping =
        Array(10).fill('./img/2_character_pepe/1_idle/long_idle/I-11.png')
        .concat(Array(10).fill('./img/2_character_pepe/1_idle/long_idle/I-12.png'))
        .concat(Array(10).fill('./img/2_character_pepe/1_idle/long_idle/I-13.png'))
        .concat(Array(10).fill('./img/2_character_pepe/1_idle/long_idle/I-14.png'))
        .concat(Array(10).fill('./img/2_character_pepe/1_idle/long_idle/I-15.png'))
        .concat(Array(10).fill('./img/2_character_pepe/1_idle/long_idle/I-16.png'))
        .concat(Array(10).fill('./img/2_character_pepe/1_idle/long_idle/I-17.png'))
        .concat(Array(10).fill('./img/2_character_pepe/1_idle/long_idle/I-18.png'))
        .concat(Array(10).fill('./img/2_character_pepe/1_idle/long_idle/I-19.png'))
        .concat(Array(10).fill('./img/2_character_pepe/1_idle/long_idle/I-20.png'));
        
    world;


    /**
     * Represents the character in the game and initializes its properties and behaviors.
     * Extends a base class to inherit common functionality and loads various animations
     * and images for different character states.
     *
     * @constructor
     * @extends {MovableObject}
     * @description
     * - Loads the initial images for the character.
     * - Loads images for walking, jumping, idle, hurt, dead, and sleeping states.
     * - Applies gravity to the character.
     * - Starts the character's animation loop.
     * - Sets the initial animation to the idle state.
     */
    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.Images_walking);
        this.loadImages(this.Images_jumping);
        this.loadImages(this.Images_idle);
        this.loadImages(this.Images_hurt);
        this.loadImages(this.Images_dead);
        this.loadImages(this.Images_sleeping);
        this.applyGravity();
        this.animate();
        this.playAnimation(this.Images_idle);
    }

    /**
     * Starts the character's animation loop.
     * Sets up two intervals:
     * 1. A 60 FPS interval to handle character state changes and camera position.
     * 2. A 60 FPS interval to handle bottle throwing, walking, and movement.
     * */
    animate() {
        setStoppableInterval(() => {
            this.handleCharacterState();
            this.world.camera_x = -this.x + 150;
        }, 1000 / 60);

        setStoppableInterval(() => {
            this.handleBottleThrow();
            this.handleWalking();
            this.handleMovement();
        }, 1000 / 60);
    }

    /**
     * Handles the character's state based on various conditions.
    */
    handleCharacterState() {
        if (this.isDead()) return this.deathAnimation();
        if (this.y > 282 && this.alive && this.speedY <= 0) this.y = 289.2;
        if ((this.world.Keyboard.SPACE || this.world.Keyboard.UP) && !this.isAboveGround() && this.alive) {
            this.jump();
            this.i = 0;
            playGameSound('./audio/jumping.mp3', 1);
        } else if (this.isAboveGround()) this.playAnimationOnce(this.Images_jumping);
        else if (this.speedY < 0) this.idleAndDeepIdleAnimation();
    }

    /**
     * Handles the bottle throwing action.
    */
    handleBottleThrow() {
        if (this.world.Keyboard.DOWN && !this.lastDownPressed && this.world.character.bottlebar !== 0) {
            this.throwBottle();
            this.playBottleRotatingAudio();
            this.i = 0;
        }
        this.lastDownPressed = this.world.Keyboard.DOWN;
    }

    /**
     * Handles the walking animation and sound effects.
    */
    handleWalking() {
        if ((this.world.Keyboard.RIGHT || this.world.Keyboard.LEFT) && !this.isAboveGround() && this.speed > 0 && this.alive) {
            this.walkingAnimation();
        } else {
            this.lastFootstepSoundTime = null;
        }
        if (this.isHurt() && !this.isDead()) {
            this.hurtAnimation();
            this.i = 0;
        }
    }

    /**
     * Handles character movement based on keyboard input.
     */
    handleMovement() {
        if (this.world.Keyboard.RIGHT && this.x < this.world.level.level_end_x && this.alive) {
            this.moveCharacterRight();
        }
        if (this.world.Keyboard.LEFT && this.x > 0 && this.alive) {
            this.moveCharacterLeft();
        }
    }

    /**
     * Moves the character to the right.
     * Sets the direction to right and calls the moveRight method.
     * Resets the otherDirection property to false.
     */
    moveCharacterRight() {
        otherDirection = false;
        this.otherDirection = false;
        this.moveRight();
    }

    /**
     * Moves the character to the left.
     * Sets the direction to left and calls the moveLeft method.
     * Resets the otherDirection property to true.
     */
    moveCharacterLeft() {
        otherDirection = true;
        this.otherDirection = true;
        this.moveLeft();
    }

    /**
     * Triggers the character's death animation.
     * Increases the vertical speed to simulate falling, plays the game over sound,
     * marks the death animation as triggered, sets the character as not alive,
     * plays the dead animation frames and schedules the game over display.
     */
    deathAnimation() {
        if (!this.deadAnimationTriggered) {
            this.speedY += 40;
            this.deadAnimationTriggered = true;
            playGameSound('./audio/gameover.mp3', 0.7);
            this.showGameOverWithDelay();
        }
        this.alive = false;
        this.playAnimation(this.Images_dead);
    }

    /**
     * Displays the game over screen after a delay.
     * Stops all intervals, pauses the background music, and if the game is still active,
     * shows the game over screen and sets the game state to not started.
     */
    showGameOverWithDelay() {
        if (!this.gameovershown) {
            setTimeout(() => {
                stopAllIntervals();
                bgMusicAudio.pause();
                if (gameStarted) {
                    showGameOver();
                    gameStarted = false;
                    this.gameovershown = true;
                }
            }, 2000);
        }
    }

    /**
     * Plays the hurt animation for the character.
     * Updates the animation with the hurt images. If more than 1 second has passed
     * since the last hurt sound, plays the hurt sound and updates the last hurt sound time.
     */
    hurtAnimation() {
        this.playAnimation(this.Images_hurt);
        const now = new Date().getTime();
        if (!this.lastHurtSoundTime || now - this.lastHurtSoundTime > 1000) {
            playGameSound('./audio/ouchtwo.mp3', 1);
            this.lastHurtSoundTime = now;
        }
    }

    /**
     * Handles idle and deep idle (sleeping) animations.
     * Increments an internal counter; once it exceeds a threshold (300 frames),
     * plays the sleeping animation and starts the snoring sound (if not muted).
     * When below the threshold, plays the idle animation and stops the snoring sound if active.
     */
    idleAndDeepIdleAnimation() {
        this.i++;
        if (this.i > 450) {
            this.playAnimation(this.Images_sleeping);
            if (!this.snoringSound && !gameMuted && this.alive) {
                this.snoringSound = playGameSound('./audio/snoring.mp3', 0.1, true);
            }
        } else {
            this.playAnimation(this.Images_idle);
            if (this.snoringSound) {
                this.snoringSound.pause();
                this.snoringSound.currentTime = 0;
                this.snoringSound = null;
            }
        }
    }

    /**
     * Throws a bottle if the time since the last throw exceeds 200 milliseconds.
     * Creates a new ThrowableObject based on the character's current position,
     * pushes it into the world's throwable objects array, updates the last throw time,
     * reduces the character's bottle bar, and updates the bottle status bar.
     */
    throwBottle() {
        if (!this.lastThrow || new Date().getTime() - this.lastThrow > 400) {
            this.world.throwableObjects.push(new ThrowableObject(this.x, this.y));
            this.lastThrow = new Date().getTime();
            this.world.character.bottlebar -= 20;
            this.world.bottleStatusBar.setBottlePercentage(this.bottlebar);
        }
    }

    /**
     * Plays the bottle rotating sound effect.
     * If the game is not muted, plays the sound and resets it after 1 second.
     */
    playBottleRotatingAudio(){
        if (!gameMuted){
            this.bottleRotatingAudio.play();
            setTimeout(() => {
                this.bottleRotatingAudio.pause();
                this.bottleRotatingAudio.currentTime = 0;
            }, 1000);
        }
    }

    /**
     * Plays the walking animation and triggers the footstep sound effect at controlled intervals.
     * This method updates the character's animation to the walking sequence and ensures that
     * the footstep sound is played no more frequently than every 150 milliseconds.
     * 
     * @function
     * @returns {void}
     */
    walkingAnimation() {
        this.playAnimation(this.Images_walking);
        this.i = 0;
        const now = new Date().getTime();
        if (!this.lastFootstepSoundTime || now - this.lastFootstepSoundTime > 150) {
            playGameSound('./audio/footsteps.mp3', 1);
            this.lastFootstepSoundTime = now;
        }
    }
}