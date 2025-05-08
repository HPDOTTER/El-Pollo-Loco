class Character extends MovableObject {
    height = 230;
    y = 180; 
    speed = 10;
    alive = true;
    deadAnimationTriggered = false;
    i = 0;
    bottleRotatingAudio = new Audio('./audio/rotatingbottle.mp3');
    
    Images_walking = 
        Array(2).fill('./img/2_character_pepe/2_walk/W-21.png')
        .concat(Array(2).fill('./img/2_character_pepe/2_walk/W-22.png'))
        .concat(Array(2).fill('./img/2_character_pepe/2_walk/W-23.png'))
        .concat(Array(2).fill('./img/2_character_pepe/2_walk/W-24.png'))
        .concat(Array(2).fill('./img/2_character_pepe/2_walk/W-25.png'))
        .concat(Array(2).fill('./img/2_character_pepe/2_walk/W-26.png'));

    Images_jumping = 
        Array(2).fill('./img/2_character_pepe/3_jump/J-31.png')
        .concat(Array(2).fill('./img/2_character_pepe/3_jump/J-32.png'))
        .concat(Array(2).fill('./img/2_character_pepe/3_jump/J-33.png'))
        .concat(Array(2).fill('./img/2_character_pepe/3_jump/J-34.png'))
        .concat(Array(2).fill('./img/2_character_pepe/3_jump/J-35.png'))
        .concat(Array(2).fill('./img/2_character_pepe/3_jump/J-36.png'))
        .concat(Array(2).fill('./img/2_character_pepe/3_jump/J-37.png'))
        .concat(Array(2).fill('./img/2_character_pepe/3_jump/J-38.png'))
        .concat(Array(2).fill('./img/2_character_pepe/3_jump/J-39.png'));

    Images_hurt = 
        Array(3).fill('./img/2_character_pepe/4_hurt/H-41.png')
        .concat(Array(3).fill('./img/2_character_pepe/4_hurt/H-42.png'))
        .concat(Array(3).fill('./img/2_character_pepe/4_hurt/H-43.png'));

    Images_dead = 
        Array(2).fill('./img/2_character_pepe/5_dead/D-51.png')
        .concat(Array(2).fill('./img/2_character_pepe/5_dead/D-52.png'))
        .concat(Array(2).fill('./img/2_character_pepe/5_dead/D-53.png'))
        .concat(Array(2).fill('./img/2_character_pepe/5_dead/D-54.png'))
        .concat(Array(2).fill('./img/2_character_pepe/5_dead/D-55.png'))
        .concat(Array(2).fill('./img/2_character_pepe/5_dead/D-56.png'))
        .concat(Array(2).fill('./img/2_character_pepe/5_dead/D-57.png'));

    Images_idle =
        Array(8).fill('./img/2_character_pepe/1_idle/idle/I-1.png')
        .concat(Array(8).fill('./img/2_character_pepe/1_idle/idle/I-2.png'))
        .concat(Array(8).fill('./img/2_character_pepe/1_idle/idle/I-3.png'))
        .concat(Array(8).fill('./img/2_character_pepe/1_idle/idle/I-4.png'))
        .concat(Array(8).fill('./img/2_character_pepe/1_idle/idle/I-5.png'))
        .concat(Array(8).fill('./img/2_character_pepe/1_idle/idle/I-6.png'))
        .concat(Array(8).fill('./img/2_character_pepe/1_idle/idle/I-7.png'))
        .concat(Array(8).fill('./img/2_character_pepe/1_idle/idle/I-8.png'))
        .concat(Array(8).fill('./img/2_character_pepe/1_idle/idle/I-9.png'))
        .concat(Array(8).fill('./img/2_character_pepe/1_idle/idle/I-10.png'));

    Images_sleeping =
        Array(5).fill('./img/2_character_pepe/1_idle/long_idle/I-11.png')
        .concat(Array(5).fill('./img/2_character_pepe/1_idle/long_idle/I-12.png'))
        .concat(Array(5).fill('./img/2_character_pepe/1_idle/long_idle/I-13.png'))
        .concat(Array(5).fill('./img/2_character_pepe/1_idle/long_idle/I-14.png'))
        .concat(Array(5).fill('./img/2_character_pepe/1_idle/long_idle/I-15.png'))
        .concat(Array(5).fill('./img/2_character_pepe/1_idle/long_idle/I-16.png'))
        .concat(Array(5).fill('./img/2_character_pepe/1_idle/long_idle/I-17.png'))
        .concat(Array(5).fill('./img/2_character_pepe/1_idle/long_idle/I-18.png'))
        .concat(Array(5).fill('./img/2_character_pepe/1_idle/long_idle/I-19.png'))
        .concat(Array(5).fill('./img/2_character_pepe/1_idle/long_idle/I-20.png'));
        
    world;


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
    
    animate() {
        setStoppableInterval(() => {
            if (this.isDead()) { // dead animation
                if (!this.deadAnimationTriggered) {
                    this.speedY += 40;
                    this.deadAnimationTriggered = true;
                }
                this.alive = false;
                this.playAnimation(this.Images_dead);
                setTimeout(() => {
                    stopAllIntervals();
                    if (window.allIntervals) {
                        window.allIntervals.forEach(intervalId => clearInterval(intervalId));
                        window.allIntervals = [];
                    }
                    backgroundMusic.pause()
                    if (gameStarted) {
                        showGameOver();
                        gameStarted = false;
                    }
                }, 2000);
            } else if (this.world.Keyboard.SPACE || this.world.Keyboard.UP && !this.isAboveGround() && this.alive) {
                this.jump(); // jump animation
                this.i = 0;
                playGameSound('./audio/jumping.mp3', 1);
            } else if (this.isAboveGround()) { // jump animation
                this.playAnimation(this.Images_jumping);
            } else if (this.isHurt() && !this.isDead()) {
                this.playAnimation(this.Images_hurt);
                const now = new Date().getTime();
                if (!this.lastHurtSoundTime || now - this.lastHurtSoundTime > 1000) {
                    playGameSound('./audio/ouchtwo.mp3', 1);
                    this.lastHurtSoundTime = now;
                }
            } else if (this.speedY < 0) { // jump animation
                this.i++;
                if (this.i > 300){
                    this.playAnimation(this.Images_sleeping); // sleeping animation 
                    if (!this.snoringSound) {
                        this.snoringSound = playGameSound('./audio/snoring.mp3', 0.1, true);
                    }
                } else {
                    this.playAnimation(this.Images_idle) // idle animation
                    if (this.snoringSound) {
                        this.snoringSound.pause();
                        this.snoringSound.currentTime = 0;
                        this.snoringSound = null;
                    }
                }
            }
            this.world.camera_x = -this.x + 150;
        }, 1000 / 30);

        setStoppableInterval(() => { // throw bottle
            if (this.world.Keyboard.DOWN && this.world.character.bottlebar !== 0) {
                if (!this.lastThrow || new Date().getTime() - this.lastThrow > 200) {
                    this.world.throwableObjects.push(new ThrowableObject(this.x, this.y));
                    this.lastThrow = new Date().getTime();
                    this.world.character.bottlebar -= 20;
                    this.world.bottleStatusBar.setBottlePercentage(this.bottlebar);
                }
                if (!gameMuted){
                    this.bottleRotatingAudio.play();
                    setTimeout(() => {
                        this.bottleRotatingAudio.pause();
                        this.bottleRotatingAudio.currentTime = 0;
                    }, 1000);
                }
            }
            if ((this.world.Keyboard.RIGHT || this.world.Keyboard.LEFT) && !this.isAboveGround() && this.speed > 0 && this.alive) {
                this.playAnimation(this.Images_walking);
                this.i = 0;
                const now = new Date().getTime();
                if (!this.lastFootstepSoundTime || now - this.lastFootstepSoundTime > 150) {
                    playGameSound('./audio/footsteps.mp3', 1);
                    this.lastFootstepSoundTime = now;
                }
            } else {
                // Reset so that the sound will play the next time we start running
                this.lastFootstepSoundTime = null;
            }
            if (this.world.Keyboard.RIGHT && this.x < this.world.level.level_end_x && this.alive) {
                otherDirection = false;
                this.otherDirection = false;
                this.moveRight();
            }
            if (this.world.Keyboard.LEFT && this.x > 0 && this.alive) {
                otherDirection = true;
                this.otherDirection = true;
                this.moveLeft();
            }
        }, 1000 / 30);
    }
}