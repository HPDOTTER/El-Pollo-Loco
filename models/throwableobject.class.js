class ThrowableObject extends MovableObject {
    height = 60;
    width = 60;
    speedY = 20;
    bottlecontact = false;
    throwLeftIntervall = null;
    throwRightIntervall = null;


    Bottle_rotating = 
        Array(4).fill('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
        .concat(Array(4).fill('img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png'))
        .concat(Array(4).fill('img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png'))
        .concat(Array(4).fill('img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'));

    Bottle_exploding =
        Array(16).fill('img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png')
        .concat(Array(16).fill('img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png'))
        .concat(Array(16).fill('img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png'))
        .concat(Array(16).fill('img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png'))
        .concat(Array(16).fill('img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png'))
        .concat(Array(16).fill('img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'));
        

    constructor(x, y) {
        super();
        this.loadImages(this.Bottle_rotating);
        this.loadImages(this.Bottle_exploding);
        this.x = x + 50;
        this.y = y +  80;
        this.animate();
    }

    animate(){
        setStoppableInterval(() => {
            if (this.bottlecontact) {
                clearInterval(this.throwLeftIntervall);
                clearInterval(this.throwRightIntervall);
                this.speedY = -1;
                this.x += 0.5;
                this.playAnimation(this.Bottle_exploding);
            } else {
                this.playAnimation(this.Bottle_rotating);
            }
        }, 1000 / 60);
        if (otherDirection && !this.bottlecontact) {
            this.throwleft();
        }
        if (!otherDirection && !this.bottlecontact) {
            this.throwright();
        } 
    };

    throwleft() {
        this.speedY = 16;
        this.applyGravity();
        this.x -= 50;
        this.throwLeftIntervall = setInterval(() => {
            this.x -= 10;
        }, 1000 / 60);
    }

    throwright() {
        this.speedY = 16;
        this.applyGravity();
        this.throwRightIntervall = setInterval(() => {
            this.x += 10;
        }, 1000 / 60);
    }
}

