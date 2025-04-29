class Chicken extends MovableObject {
    height = 70;
    width = 60;
    y = 455;
    alive = true;

    Chicken_walking = 
        Array(5).fill('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        .concat(Array(5).fill('./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png'))
        .concat(Array(5).fill('./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'));

    Chicken_dead = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 300 + Math.random() * (level_end_x - 400);
        this.loadImages(this.Chicken_walking);
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            if(this.alive){
                this.moveLeft();
                this.playAnimation(this.Chicken_walking);
            } else if (!this.alive) {
                this.loadImage('./img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
            }
        }, 1000 / 60);
    }
}