class Star {
    constructor() {
        this.x = random(10, width);
        this.y = random(10, height);
        this.size = random(30, 50);
        this.speed = random(1, 3);
    }
  
    move(direction) {
        // Move stars in the opposite direction of character movement
        if (direction > 0) {
            this.x += this.speed;
        } else {
            this.x -= this.speed;
        }
        
        // Wrap around the screen
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
    } 
  
    render(starImages) {
        if (starImages && starImages.length > 0) {
            let starIndex = floor(random(starImages.length));
            let starImage = starImages[starIndex];
            if (starImage) {
                push();
                imageMode(CENTER);
                image(starImage, this.x, this.y, this.size, this.size);
                pop();
            }
        }
    }
}
  
function updateAndRenderStars(stars, moving, direction, starImages) {
    for (let sparklestar of stars) {
        if (moving) {
            sparklestar.move(direction);
        }
        sparklestar.render(starImages);
    }
}