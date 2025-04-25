class Endboss extends MovableObject {
    height = 350;
    width = 300;
    speed = 0.5;
    y = 185;
    alive = true;
    endbosslife = 100;
    i = 0;
    deadAnimationTriggered = false;
    previousEndbosslife = 100; // Initialize previousEndbosslife
    isHurting = false;
    hurtStartTime = 0;

    Endboss_allert = Array(12).fill('./img/4_enemie_boss_chicken/2_alert/G5.png')
        .concat(Array(12).fill('./img/4_enemie_boss_chicken/2_alert/G6.png'))
        .concat(Array(12).fill('./img/4_enemie_boss_chicken/2_alert/G7.png'))
        .concat(Array(12).fill('./img/4_enemie_boss_chicken/2_alert/G8.png'))
        .concat(Array(12).fill('./img/4_enemie_boss_chicken/2_alert/G9.png'))
        .concat(Array(12).fill('./img/4_enemie_boss_chicken/2_alert/G10.png'))
        .concat(Array(12).fill('./img/4_enemie_boss_chicken/2_alert/G11.png'))
        .concat(Array(12).fill('./img/4_enemie_boss_chicken/2_alert/G12.png'));

    Endboss_Walk = Array(8).fill('./img/4_enemie_boss_chicken/1_walk/G1.png')
        .concat(Array(8).fill('./img/4_enemie_boss_chicken/1_walk/G2.png'))
        .concat(Array(8).fill('./img/4_enemie_boss_chicken/1_walk/G3.png'))
        .concat(Array(8).fill('./img/4_enemie_boss_chicken/1_walk/G4.png'));

    Endboss_attack =  Array(8).fill('./img/4_enemie_boss_chicken/3_attack/G13.png')
        .concat(Array(8).fill('./img/4_enemie_boss_chicken/3_attack/G14.png'))
        .concat(Array(8).fill('./img/4_enemie_boss_chicken/3_attack/G15.png'))
        .concat(Array(8).fill('./img/4_enemie_boss_chicken/3_attack/G16.png'))
        .concat(Array(8).fill('./img/4_enemie_boss_chicken/3_attack/G17.png'))
        .concat(Array(8).fill('./img/4_enemie_boss_chicken/3_attack/G18.png'))
        .concat(Array(8).fill('./img/4_enemie_boss_chicken/3_attack/G19.png'))
        .concat(Array(8).fill('./img/4_enemie_boss_chicken/3_attack/G20.png'));

    Endboss_hurt = Array(5).fill('./img/4_enemie_boss_chicken/4_hurt/G21.png')
        .concat(Array(5).fill('./img/4_enemie_boss_chicken/4_hurt/G22.png'))
        .concat(Array(5).fill('./img/4_enemie_boss_chicken/4_hurt/G23.png'));

    Endboss_dead = Array(16).fill('./img/4_enemie_boss_chicken/5_dead/G24.png')
        .concat(Array(16).fill('./img/4_enemie_boss_chicken/5_dead/G25.png'))
        .concat(Array(16).fill('./img/4_enemie_boss_chicken/5_dead/G26.png'));
    

    constructor(){
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.Endboss_allert);
        this.loadImages(this.Endboss_Walk);
        this.loadImages(this.Endboss_attack);
        this.loadImages(this.Endboss_hurt);
        this.loadImages(this.Endboss_dead);
        this.x = level_end_x - 200;
        this.animate();
        this.applyGravity();
    }

    animate(){
        setStoppableInterval(() => {
            // If hurt animation is active and less than 1 second has passed, keep displaying it.
            if(this.isHurting){
                if(new Date().getTime() - this.hurtStartTime < 1000) {
                    this.playAnimation(this.Endboss_hurt);
                    return;
                } else {
                    this.isHurting = false;
                }
            }

            if (world.character.x > 3200 && (this.i < 180)) {
                this.playAnimation(this.Endboss_allert);
                this.i++;
                console.log(this.i);
            } else if (!this.alive) {
                if (!this.deadAnimationTriggered) {
                    this.speedY += 20;
                    this.deadAnimationTriggered = true;
                }
                this.playAnimation(this.Endboss_dead);
            } else if (this.previousEndbosslife !== this.endbosslife) {
                // Trigger hurt animation for 1 second when life changes.
                this.isHurting = true;
                this.hurtStartTime = new Date().getTime();
                this.playAnimation(this.Endboss_hurt);
                this.previousEndbosslife = this.endbosslife;
            } else if ((world.character.x - this.x) > -100 && this.i > 179 && world.character.alive) {
                this.playAnimation(this.Endboss_attack);
            } else if (world.character.x > 3200 && this.i > 179) {
                this.playAnimation(this.Endboss_Walk);
                this.moveLeft();
            } 
        }, 1000 / 60);
    }
}