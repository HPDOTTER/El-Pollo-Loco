class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height= 270;
    cloudsImages = [
        './img/5_background/layers/4_clouds/1.png',
        './img/5_background/layers/4_clouds/2.png',
    ]
    
    constructor() {
        super().loadImage(this.cloudsImages[Math.floor(Math.random() * this.cloudsImages.length)]);
        this.x = Math.random() * level_end_x;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }
}