class MovableObject extends DrawableObject {
    speed = 0.2;
    speedY = 0;
    acceleration = 1.2;
    life = 100;
    lasthit = 0;
    coinbar = 0;
    bottlebar = 0;
    otherDirection = false;

    applyGravity() {
        setStoppableInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){ 
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            };
        }, 1000 / 60);
    }


    isAboveGround(){
        if(this instanceof ThrowableObject){ // throwable objects are not affected by gravity
            return true;
        } else if (this.life == 0) { // dead character
            return true;
        } else {
            return (this.y + this.height) < 510;
        }
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;  
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        if(!this.isAboveGround()){
            this.speedY += 20;
        }
    }

    hit() {
        let timePassed = new Date().getTime() - this.lasthit;
        timePassed = timePassed / 1000;
        if (timePassed > 1) {
            this.life -= 20;
            if (this.life < 0) {
                this.life = 0;
            } else {
                this.lasthit = new Date().getTime();
            }
        }
    }

    collectCoin() {
        this.coinbar += 20;
        if (this.coinbar > 100) {
            this.coinbar = 100;
        }
        this.world.coinStatusBar.setCoinPercentage(this.coinbar); // Update coin bar
    }

    collectBottle(){
        this.bottlebar += 20;
        if(this.bottlebar > 100){
            this.bottlebar = 100;
        }
        this.world.bottleStatusBar.setBottlePercentage(this.bottlebar); // Update bottle bar
    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lasthit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead(){
        return this.life == 0;
    }



    isColliding(MO) {
        const collision = (
            this.x + this.width > MO.x &&
            this.x < MO.x + MO.width &&
            this.y + this.height > MO.y &&
            this.y < MO.y + MO.height
        );
        return collision;
    }

    flipImage(ctx){
        ctx.save();
        ctx.translate(this.x + this.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(this.img, 0, this.y, this.width, this.height);
        ctx.restore();
    }
}