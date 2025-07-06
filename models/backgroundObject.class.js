/**
 * Represents a background object in the game.
 * Extends MovableObject to inherit movement capabilities.
 * @class
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {

    /**
     * The width of the background object.
     * @type {number} width
     * @type {number} height
     */
    width = 800;
    height = 600;   
    /**
     * Creates an instance of BackgroundObject.
     * Loads the image from the specified path and positions the object.
     *
     * @param {string} imagePath - The path to the image file.
     * @param {number} x - The horizontal starting position of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x; 
        this.y = 600 - this.height;
    }
}