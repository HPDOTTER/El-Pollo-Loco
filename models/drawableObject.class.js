class DrawableObject {
    x = 120;
    y = 400;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;


    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    
    drawFrame(ctx){
        if(this instanceof Chicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottle || this instanceof ThrowableObject || this instanceof SmallChicken) { // enemy hitbox
            ctx.beginPath();  //start new path
            ctx.strokeStyle = 'green';
            ctx.lineWidth = 1;
            ctx.rect(this.x, this.y, this.width, this.height); // Render hitbox
            ctx.stroke(); //draw path
        } else if(this instanceof Character) { // character hitbox
            ctx.beginPath();
            ctx.strokeStyle = 'green';
            ctx.lineWidth = 1;
            ctx.rect(this.x, this.y + 220, this.width, this.height - 400);  
            ctx.stroke();
        }
    }

    loadImages(arr){
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}