/**
 * Represents any drawable object in the game.
 * Provides basic properties and methods for loading, drawing images and hitboxes.
 * @class
 */
class DrawableObject {
    /**
     * The x-coordinate where the object is drawn.
     * @type {number} x
     * @type {number} y
     * @type {number} height
     * @type {number} width
     * @type {HTMLImageElement} img
     * @type {Object.<string, HTMLImageElement>} imageCache
     * @type {number} currentImage
     */
    x = 120;
    y = 400;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads an image from the specified path and assigns it to this object.
     * @param {string} path - The path of the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object's image on a given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The drawing context of the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws the hitbox frame of the object on a given canvas context.
     * Displays different hitboxes depending on the type of object.
     *
     * For enemy objects, the hitbox is drawn in green using the object's own dimensions.
     * For the character, an adjusted hitbox is drawn.
     *
     * @param {CanvasRenderingContext2D} ctx - The drawing context of the canvas.
     */
    drawFrame(ctx) {
        if (this instanceof Chicken || this instanceof Endboss || this instanceof Coin ||
            this instanceof Bottle || this instanceof ThrowableObject || this instanceof SmallChicken) {
            ctx.beginPath();
            ctx.strokeStyle = 'green';
            ctx.lineWidth = 1;
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        } else if (this instanceof Character) {
            ctx.beginPath();
            ctx.strokeStyle = 'green';
            ctx.lineWidth = 1;
            ctx.rect(this.x, this.y + 220, this.width, this.height - 400);
            ctx.stroke();
        }
    }

    /**
     * Draws the offset hitbox frame for the object.
     * The hitbox is adjusted based on the object's offset properties:
     * xOffset, yOffset, widthOffset, and heightOffset.
     * Uses red color for the offset hitbox.
     *
     * @param {CanvasRenderingContext2D} ctx - The drawing context of the canvas.
     */
    drawOffsetFrame(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        const offsetX = this.x + (typeof this.xOffset === 'number' ? this.xOffset : 0);
        const offsetY = this.y + (typeof this.yOffset === 'number' ? this.yOffset : 0);
        const offsetWidth = this.width - (typeof this.widthOffset === 'number' ? this.widthOffset : 0);
        const offsetHeight = this.height - (typeof this.heightOffset === 'number' ? this.heightOffset : 0);

        ctx.rect(offsetX, offsetY, offsetWidth, offsetHeight);
        ctx.stroke();
    }

    /**
     * Loads multiple images from an array of image paths.
     * Preloads each image and stores it in the imageCache.
     *
     * @param {string[]} arr - An array of image file paths.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}