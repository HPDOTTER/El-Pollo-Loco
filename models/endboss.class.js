class Endboss extends MovableObject {
    height = 350;
    width = 300;
    y = 185;
    alive = true;
    
    Endboss_allert = Array(12).fill('./img/4_enemie_boss_chicken/2_alert/G5.png')
    .concat(Array(12).fill('./img/4_enemie_boss_chicken/2_alert/G6.png'))
    .concat(Array(12).fill('./img/4_enemie_boss_chicken/2_alert/G7.png'))
    .concat(Array(12).fill('./img/4_enemie_boss_chicken/2_alert/G8.png'))
    .concat(Array(12).fill('./img/4_enemie_boss_chicken/2_alert/G9.png'))
    .concat(Array(12).fill('./img/4_enemie_boss_chicken/2_alert/G10.png'))
    .concat(Array(12).fill('./img/4_enemie_boss_chicken/2_alert/G11.png'))
    .concat(Array(12).fill('./img/4_enemie_boss_chicken/2_alert/G12.png'));

    Endboss_Walk = Array(5).fill('./img/4_enemie_boss_chicken/1_walk/G1.png')
        .concat(Array(5).fill('./img/4_enemie_boss_chicken/1_walk/G2.png'))
        .concat(Array(5).fill('./img/4_enemie_boss_chicken/1_walk/G3.png'))
        .concat(Array(5).fill('./img/4_enemie_boss_chicken/1_walk/G4.png'));

    Endboss_attack =  Array(5).fill('./img/4_enemie_boss_chicken/3_attack/G13.png')
        .concat(Array(5).fill('./img/4_enemie_boss_chicken/3_attack/G14.png'))
        .concat(Array(5).fill('./img/4_enemie_boss_chicken/3_attack/G15.png'))
        .concat(Array(5).fill('./img/4_enemie_boss_chicken/3_attack/G16.png'))
        .concat(Array(5).fill('./img/4_enemie_boss_chicken/3_attack/G17.png'))
        .concat(Array(5).fill('./img/4_enemie_boss_chicken/3_attack/G18.png'))
        .concat(Array(5).fill('./img/4_enemie_boss_chicken/3_attack/G19.png'))
        .concat(Array(5).fill('./img/4_enemie_boss_chicken/3_attack/G20.png'));

    Endboss_hurt = Array(5).fill('./img/4_enemie_boss_chicken/4_hurt/G21.png')
        .concat(Array(5).fill('./img/4_enemie_boss_chicken/4_hurt/G22.png'))
        .concat(Array(5).fill('./img/4_enemie_boss_chicken/4_hurt/G23.png'));

    Endboss_dead = Array(5).fill('./img/4_enemie_boss_chicken/5_dead/G24.png')
        .concat(Array(5).fill('./img/4_enemie_boss_chicken/5_dead/G25.png'))
        .concat(Array(5).fill('./img/4_enemie_boss_chicken/5_dead/G26.png'))
    

    constructor(){
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.Endboss_allert);
        this.x = level_end_x - 200;
        this.animate();
    }

    animate(){
        setStoppableInterval(() => {
            this.playAnimation(this.Endboss_allert);
        }, 1000 / 60);
    }
}