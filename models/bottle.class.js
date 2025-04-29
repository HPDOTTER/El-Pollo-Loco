class Bottle extends MovableObject {

    IMAGES_BOTTLE = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_BOTTLE[Math.floor(Math.random() * this.IMAGES_BOTTLE.length)]); // Load a random image
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 200 +(Math.random() * (level_end_x - 400));
        this.y = 460;
        this.height = 60;
        this.width = 60;
    }
}