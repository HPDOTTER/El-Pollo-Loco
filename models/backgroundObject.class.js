class BackgroundObject extends MovableObject {
    width = 800;
    height = 600;
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x; 
        this.y = 600 - this.height;
    }
}