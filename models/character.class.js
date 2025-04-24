class Character extends MovableObject {
    height = 230;
    y = 180; 
    speed = 10;
    
    Images_walking = 
        Array(2).fill('img/2_character_pepe/2_walk/W-21.png')
        .concat(Array(2).fill('img/2_character_pepe/2_walk/W-22.png'))
        .concat(Array(2).fill('img/2_character_pepe/2_walk/W-23.png'))
        .concat(Array(2).fill('img/2_character_pepe/2_walk/W-24.png'))
        .concat(Array(2).fill('img/2_character_pepe/2_walk/W-25.png'))
        .concat(Array(2).fill('img/2_character_pepe/2_walk/W-26.png'));

    Images_jumping = 
        Array(2).fill('img/2_character_pepe/3_jump/J-31.png')
        .concat(Array(2).fill('img/2_character_pepe/3_jump/J-32.png'))
        .concat(Array(2).fill('img/2_character_pepe/3_jump/J-33.png'))
        .concat(Array(2).fill('img/2_character_pepe/3_jump/J-34.png'))
        .concat(Array(2).fill('img/2_character_pepe/3_jump/J-35.png'))
        .concat(Array(2).fill('img/2_character_pepe/3_jump/J-36.png'))
        .concat(Array(2).fill('img/2_character_pepe/3_jump/J-37.png'))
        .concat(Array(2).fill('img/2_character_pepe/3_jump/J-38.png'))
        .concat(Array(2).fill('img/2_character_pepe/3_jump/J-39.png'));

    Images_hurt = 
        Array(3).fill('img/2_character_pepe/4_hurt/H-41.png')
        .concat(Array(3).fill('img/2_character_pepe/4_hurt/H-42.png'))
        .concat(Array(3).fill('img/2_character_pepe/4_hurt/H-43.png'));

    Images_dead = 
        Array(2).fill('img/2_character_pepe/5_dead/D-51.png')
        .concat(Array(2).fill('img/2_character_pepe/5_dead/D-52.png'))
        .concat(Array(2).fill('img/2_character_pepe/5_dead/D-53.png'))
        .concat(Array(2).fill('img/2_character_pepe/5_dead/D-54.png'))
        .concat(Array(2).fill('img/2_character_pepe/5_dead/D-55.png'))
        .concat(Array(2).fill('img/2_character_pepe/5_dead/D-56.png'))
        .concat(Array(2).fill('img/2_character_pepe/5_dead/D-57.png'));

    Images_idle =
        Array(5).fill('img/2_character_pepe/1_idle/idle/I-1.png')
        .concat(Array(5).fill('img/2_character_pepe/1_idle/idle/I-2.png'))
        .concat(Array(5).fill('img/2_character_pepe/1_idle/idle/I-3.png'))
        .concat(Array(5).fill('img/2_character_pepe/1_idle/idle/I-4.png'))
        .concat(Array(5).fill('img/2_character_pepe/1_idle/idle/I-5.png'))
        .concat(Array(5).fill('img/2_character_pepe/1_idle/idle/I-6.png'))
        .concat(Array(5).fill('img/2_character_pepe/1_idle/idle/I-7.png'))
        .concat(Array(5).fill('img/2_character_pepe/1_idle/idle/I-8.png'))
        .concat(Array(5).fill('img/2_character_pepe/1_idle/idle/I-9.png'))
        .concat(Array(5).fill('img/2_character_pepe/1_idle/idle/I-10.png'));
    world;


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.Images_walking);
        this.loadImages(this.Images_jumping);
        this.loadImages(this.Images_idle);
        this.loadImages(this.Images_hurt);
        this.loadImages(this.Images_dead);
        this.applyGravity();
        this.animate();
        this.playAnimation(this.Images_idle);
    }
    
    animate() {
        setStoppableInterval(() => {
            if (this.isDead()) { // dead animation
                this.playAnimation(this.Images_dead);
            } else if (this.world.Keyboard.SPACE || this.world.Keyboard.UP && !this.isAboveGround()) {
                this.jump(); // jump animation
            } else if (this.isAboveGround()) { // jump animation
                this.playAnimation(this.Images_jumping);
            } else if (this.isHurt() && !this.isDead()) {
                this.playAnimation(this.Images_hurt);
            } else if (this.speedY < 0) { // jump animation
                this.playAnimation(this.Images_idle) // idle animation
            }
            this.world.camera_x = -this.x + 150;
        }, 1000 / 30);

        setStoppableInterval(() => { // throw bottle
            if (this.world.Keyboard.DOWN && this.world.character.bottlebar !== 0) {
                if (!this.lastThrow || new Date().getTime() - this.lastThrow > 150) {
                    this.world.throwableObjects.push(new ThrowableObject(this.x, this.y));
                    this.lastThrow = new Date().getTime();
                    this.world.character.bottlebar -= 20;
                    this.world.bottleStatusBar.setBottlePercentage(this.bottlebar);
                }
            }
            if ((this.world.Keyboard.RIGHT || this.world.Keyboard.LEFT) && !this.isAboveGround() && this.speed > 0) {
                //walk animation
                this.playAnimation(this.Images_walking);
            }
            if (this.world.Keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                otherDirection = false;
                this.otherDirection = false;
                this.moveRight();
            }
            if (this.world.Keyboard.LEFT && this.x > 0) {
                otherDirection = true;
                this.otherDirection = true;
                this.moveLeft();
            }
        }, 1000 / 30);
    }
}