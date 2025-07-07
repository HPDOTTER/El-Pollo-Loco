/**
 * Represents the Endboss enemy in the game.
 * Extends MovableObject to inherit movement, gravity, and animation capabilities.
 * @class
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    /**
     * The presettings of the Endboss.
     * @type {number} height
     * @type {number} width
     * @type {number} speed
     * @type {number} y position
     * @type {boolean} alive
     * @type {number} endbosslife
     * @type {number} i
     * @type {boolean} deadAnimationTriggered
     * @type {number} previousEndbosslife
     * @type {boolean} isHurting
     * @type {number} hurtStartTime
     * @type {number} xOffset
     * @type {number} yOffset
     * @type {number} widthOffset
     * @type {number} heightOffset
     */
    height = 350;
    width = 300;
    speed = 1.5;
    y = 185;
    alive = true;
    endbosslife = 100;
    i = 0;
    deadAnimationTriggered = false;
    previousEndbosslife = 100;
    isHurting = false;
    hurtStartTime = 0;
    xOffset = 20;
    yOffset = 50;
    widthOffset = 30;
    heightOffset = 60;

    /**
     * Array of image paths for the Endboss alert animation.
     * @type {string[]}
     */
    Endboss_allert = Array(12).fill('./img/4_enemie_boss_chicken/2_alert/G5.png')
        .concat(Array(12).fill('./img/4_enemie_boss_chicken/2_alert/G6.png'))
        .concat(Array(12).fill('./img/4_enemie_boss_chicken/2_alert/G7.png'))
        .concat(Array(12).fill('./img/4_enemie_boss_chicken/2_alert/G8.png'))
        .concat(Array(12).fill('./img/4_enemie_boss_chicken/2_alert/G9.png'))
        .concat(Array(12).fill('./img/4_enemie_boss_chicken/2_alert/G10.png'))
        .concat(Array(12).fill('./img/4_enemie_boss_chicken/2_alert/G11.png'))
        .concat(Array(12).fill('./img/4_enemie_boss_chicken/2_alert/G12.png'));

    /**
     * Array of image paths for the Endboss walking animation.
     * @type {string[]}
     */
    Endboss_Walk = Array(8).fill('./img/4_enemie_boss_chicken/1_walk/G1.png')
        .concat(Array(8).fill('./img/4_enemie_boss_chicken/1_walk/G2.png'))
        .concat(Array(8).fill('./img/4_enemie_boss_chicken/1_walk/G3.png'))
        .concat(Array(8).fill('./img/4_enemie_boss_chicken/1_walk/G4.png'));

    /**
     * Array of image paths for the Endboss attack animation.
     * @type {string[]}
     */
    Endboss_attack = Array(8).fill('./img/4_enemie_boss_chicken/3_attack/G13.png')
        .concat(Array(8).fill('./img/4_enemie_boss_chicken/3_attack/G14.png'))
        .concat(Array(8).fill('./img/4_enemie_boss_chicken/3_attack/G15.png'))
        .concat(Array(8).fill('./img/4_enemie_boss_chicken/3_attack/G16.png'))
        .concat(Array(8).fill('./img/4_enemie_boss_chicken/3_attack/G17.png'))
        .concat(Array(8).fill('./img/4_enemie_boss_chicken/3_attack/G18.png'))
        .concat(Array(8).fill('./img/4_enemie_boss_chicken/3_attack/G19.png'))
        .concat(Array(8).fill('./img/4_enemie_boss_chicken/3_attack/G20.png'));

    /**
     * Array of image paths for the Endboss hurt animation.
     * @type {string[]}
     */
    Endboss_hurt = Array(5).fill('./img/4_enemie_boss_chicken/4_hurt/G21.png')
        .concat(Array(5).fill('./img/4_enemie_boss_chicken/4_hurt/G22.png'))
        .concat(Array(5).fill('./img/4_enemie_boss_chicken/4_hurt/G23.png'));

    /**
     * Array of image paths for the Endboss death animation.
     * @type {string[]}
     */
    Endboss_dead = Array(16).fill('./img/4_enemie_boss_chicken/5_dead/G24.png')
        .concat(Array(16).fill('./img/4_enemie_boss_chicken/5_dead/G25.png'))
        .concat(Array(16).fill('./img/4_enemie_boss_chicken/5_dead/G26.png'));

    /**
     * Constructs an instance of the Endboss.
     * Loads initial images, preloads all animation frames, positions the Endboss,
     * starts the animation loop, and applies gravity.
     *
     * @constructor
     */
    constructor(){
        super().loadImage('./img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.Endboss_allert);
        this.loadImages(this.Endboss_Walk);
        this.loadImages(this.Endboss_attack);
        this.loadImages(this.Endboss_hurt);
        this.loadImages(this.Endboss_dead);
        this.x = level_end_x - 200;
        this.animate();
        this.applyGravity();
    }

    /**
     * Animates the Endboss based on its current state.
     * Evaluates various conditions to determine which animation to play:
     * - If the Endboss is dead, triggers the death animation, plays the death sound,
     *   displays the death frames, and calls winGame().
     * - If the Endboss is hurting, plays the hurt animation.
     * - If the character is approaching (and an internal counter is below a threshold),
     *   plays the alert animation.
     * - If the Endboss life has changed, initiates a hurt delay.
     * - If the character is within attack range and after the approach phase,
     *   plays the attack animation.
     * - Otherwise, if the character is further out and the approach phase is complete,
     *   plays the walking animation and moves the Endboss left.
     *
     * The animation loop is executed at 60 frames per second.
     *
     * @method
     */
    animate(){
        setStoppableInterval(() => {
            if (!this.alive) {
                this.endBossDeathAnimation();
                this.dyingEndbossSound();
                this.playAnimation(this.Endboss_dead);
                this.winGame();
            } else if(this.isHurting) this.endbossHurtAnimation();
            else if (world.character.x > 3000 && (this.i < 180)) this.endbossAproachAnimation();
            else if (this.previousEndbosslife !== this.endbosslife) this.endbossHurtDelay();
            else if (this.isColliding(world.character)) this.playAnimation(this.Endboss_attack);
            else if (world.character.x > (this.x + 250) && this.endbossApproachstarted && world.character.alive) {
                this.otherDirection = true;
                this.playAnimation(this.Endboss_Walk);
                this.moveRight();
            }
            else if (this.endbossApproachstarted && world.character.alive) {
                this.otherDirection = false;
                this.playAnimation(this.Endboss_Walk);
                this.moveLeft(); 
            }
        }, 1000 / 60);
    }

    /**
     * Initiates the win game sequence for the Endboss.
     * After a delay of 2 seconds, stops all intervals, shows the win screen,
     * and pauses the background music.
     *
     * @method
     */
    winGame() {
        if (!this.wonGame){
            this.wonGame = true;
            setTimeout(() => {
            stopAllIntervals();
            if (gameStarted) {
                showYouWin();
                gameStarted = false;
            }
            playGameSound('./audio/victory.mp3', 0.3);
            bgMusicAudio.pause();
        }, 2000);
        }
        
    }

    /**
     * Triggers a hurt delay for the Endboss.
     * Sets the hurting flag, records the current time as the hurt start time,
     * plays the hurt animation, and updates the previous life value.
     *
     * @method
     */
    endbossHurtDelay(){
        this.isHurting = true;
        this.hurtStartTime = new Date().getTime();
        this.playAnimation(this.Endboss_hurt);
        this.previousEndbosslife = this.endbosslife;
    }

    /**
     * Initiates the death animation for the Endboss.
     * Increases vertical speed to simulate falling and ensures the death animation
     * is triggered only once.
     *
     * @method
     */
    endBossDeathAnimation() {
        if (!this.deadAnimationTriggered) {
            this.speedY += 20;
            this.deadAnimationTriggered = true;
        }
    }

    /**
     * Plays the death sound for the Endboss if it has not already been played.
     *
     * @method
     */
    dyingEndbossSound(){
        if (!this.soundPlayed) {
            playGameSound('./audio/roostersound.mp3', 0.3);
            this.soundPlayed = true;
        }
    }

    /**
     * Plays the hurt animation for the Endboss.
     * If less than 1 second has elapsed since the hurt animation started,
     * continues to display the hurt animation and plays the hurt sound once.
     * After 1 second, resets the hurting state and sound flag.
     *
     * @method
     */
    endbossHurtAnimation(){
        if (new Date().getTime() - this.hurtStartTime < 500) {
            this.playAnimation(this.Endboss_hurt);
            if (!this.hurtSoundPlayed) {
                playGameSound('./audio/chickenouch.mp3', 1);
                this.hurtSoundPlayed = true;
            }
            return;
        } else {
            this.isHurting = false;
            this.hurtSoundPlayed = false;
        }
    }

    /**
     * Plays the Endboss's approach (alert) animation.
     * Increments an internal counter and, if this is the first frame of approach,
     * plays the approach sound.
     *
     * @method
     */
    endbossAproachAnimation(){
        this.playAnimation(this.Endboss_allert);
        this.i++;
        this.endbossApproachstarted = true;
        if(this.i == 1) {
            playGameSound('./audio/endbossaproach.mp3', 0.7);
        }
    }
}