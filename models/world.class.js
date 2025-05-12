class World {
    character = new Character();
    level = level1;
    ctx;
    canvas;
    Keyboard;
    camera_x = 0;
    healthStatusBar = new Statusbars('health', 100);
    bottleStatusBar = new Statusbars('bottle', 0);
    coinStatusBar = new Statusbars('coin', 0);
    bossStatusBar = new Statusbars('boss', 100);
    throwableObjects = [new ThrowableObject()];

    constructor(canvas, Keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.Keyboard = Keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setStoppableInterval(() => this.checkCollision(), 1000 / 60);
    }

    checkCollision() {
        this.enemiesCollision();
        this.coinCollision();
        this.bottleCollision();
    }

    enemiesCollision() {
        return this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !(enemy instanceof Endboss)) {
                if (this.isCharacterAboveEnemy(enemy)) { 
                    this.characterKillEnemy(enemy);
                } else if (enemy.alive) {
                    this.character.hit();
                    this.healthStatusBar.setHealthPercentage(this.character.life);
                }
            } else if (this.bottleColliding(enemy)) {
                playGameSound('./audio/bottlesmash.mp3', 1)
                this.throwableObjects.some(throwable => {
                    if (throwable.isColliding(enemy)) {
                        throwable.bottlecontact = true;
                        this.character.bottleRotatingAudio.pause();
                        setTimeout(() => {
                            this.throwableObjects = this.throwableObjects.filter(t => t !== throwable); 
                        }, 1000);
                    }
                });
                if (!(enemy instanceof Endboss)) {
                    this.characterKillEnemy(enemy);
                } else if (enemy instanceof Endboss) {
                    this.level.enemies[0].endbosslife -= 20
                    this.bossStatusBar.setBossPercentage(this.level.enemies[0].endbosslife)
                    if (this.level.enemies[0].endbosslife <= 0) {
                        this.level.enemies[0].alive = false;
                    }
                }
            }
        });
    }

    bottleColliding(enemy) {
        return this.throwableObjects.some(throwable => throwable.isColliding(enemy) && enemy.alive && throwable.bottlecontact === false); // Check if the throwable object collides with the enemy and is not already marked as having hit the enemy
    }

    coinCollision() {
        return this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin) && !coin.collected) {
                coin.collected = true;
                this.character.collectCoin();
                this.level.coins = this.level.coins.filter(c => c !== coin);
                playGameSound('./audio/coinrecieved.mp3', 0.1)
            }
        });
    }

    bottleCollision() {
        return this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && !bottle.collected && this.character.bottlebar < 100) {
                bottle.collected = true;
                this.character.collectBottle();
                this.level.bottles = this.level.bottles.filter(b => b !== bottle);
                playGameSound('./audio/bottlecollect.mp3', 0.1)
            }
        });
    }

    isCharacterAboveEnemy(enemy) {
        return (this.character.y + this.character.height < enemy.y + enemy.height / 2) && this.character.speedY < 0;
    }

    characterKillEnemy(enemy) {
        enemy.alive = false;
        setTimeout(() => {
            this.level.enemies = this.level.enemies.filter(e => e !== enemy);
        }
        , 2000);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addEnvironment();
        this.ctx.translate(-this.camera_x, 0);
        // Space for fixed objects
        this.addStatusBars();
        this.ctx.translate(this.camera_x, 0);
        //
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw()); // built-in JS Function, calling itself recursively and, ensures smooth animation and matching the refresh rate of the display
    }

    addEnvironment() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
    }

    addStatusBars() {
        this.addToMap(this.healthStatusBar);
        this.addToMap(this.bottleStatusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.bossStatusBar);
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(MO) {
        if (MO.img) { // Ensure img is valid
            this.handleObjectDirection(MO);
            MO.drawFrame(this.ctx); // Draw frame if needed
        }
    }

    handleObjectDirection(MO) {
        if (MO.otherDirection) {
            this.flipObjectHorizontally(MO);
        } else {
            this.drawObject(MO);
        }
    }

    flipObjectHorizontally(MO) {
        this.ctx.save();
        this.ctx.translate(MO.x + MO.width, 0);
        this.ctx.scale(-1, 1);
        this.drawCharacterOrObject(MO, 0, MO.y);
        this.ctx.restore();
    }

    drawObject(MO) {
        this.ctx.drawImage(MO.img, MO.x, MO.y, MO.width, MO.height);
    }

    drawCharacterOrObject(MO, x, y) {
        if (MO instanceof Character) {
            this.ctx.drawImage(MO.img, x, y, MO.width, MO.height);
        }
    }
    
    stopBottleSound() {
        // Assuming you have access to your character instance (e.g., this.character)
        if (this.character && typeof this.character.stopBottleRotatingSound === 'function') {
            this.character.stopBottleRotatingSound();
        }
    }
}