class SmallChicken extends MovableObject {
    height = 55;
    width = 45;
    y = 180;
    alive = true;
    speed = 0.15 + Math.random() * 0.25;
    lastjump = 0;

    Small_chicken_walking = 
        Array(5).fill('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        .concat(Array(5).fill('./img/3_enemies_chicken/chicken_small/1_walk/2_w.png'))
        .concat(Array(5).fill('./img/3_enemies_chicken/chicken_small/1_walk/3_w.png'));

    Small_Chicken_dead = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = 300 + Math.random() * (level_end_x - 400);
        this.loadImages(this.Small_chicken_walking);
        this.animate();
        this.applyGravity();
    }

    animate() {
        setStoppableInterval(() => {
            if(this.alive && !this.isAboveGround()) {
                this.moveLeft();
                this.playAnimation(this.Small_chicken_walking);
                if (new Date().getTime() - this.lastjump > 18000 * Math.random()) {
                    this.jump(); // jump animation
                    this.lastjump = new Date().getTime();
                }
            } else if (!this.alive) {
                this.loadImage('./img/3_enemies_chicken/chicken_small/2_dead/dead.png');
            } 
        }, 1000 / 60); 
    }
}