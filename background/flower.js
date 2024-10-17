class Flower {
    constructor(flowerGif, flowerSounds) {
        this.x = width + 50;
        this.y = windowHeight/2
        this.flowerGif = flowerGif;
        this.collected = false;
        this.speed = 3;
        this.flowerSounds = flowerSounds;
    }

    collidesWith(charX, charWidth) {
        let flowerWidth = this.flowerGif.width * 0.5;
        return (
            this.x < charX + charWidth &&
            this.x + flowerWidth > charX 
        );
    }
    
    move(direction) {
        if (direction < 0) {
            this.x += this.speed;
        } else {
            this.x -= this.speed;
        }
    }

    render() {
        if (!this.collected) {
            image(this.flowerGif, this.x, this.y, this.flowerGif.width * 0.1, this.flowerGif.height * 0.1);
        }    
    }

    isOffScreen() {
        return this.x < -50; // Check if flower has moved off-screen to the left
    }
}

let timeSinceLastFlower = 0;
let flowerInterval = 450;
let soundIndex = 0

function updateAndRenderFlowers(rain, flowers, flowerGif, direction, flowerSounds) {
    if (!rain.isRaining) {
        timeSinceLastFlower++

        if (flowers.length === 0 && timeSinceLastFlower >= flowerInterval) {
            flowers.push(new Flower(flowerGif, flowerSounds));
            timeSinceLastFlower = 0
            flowerInterval = random(100, 240)
        }
    }

    for (let i = flowers.length - 1; i >= 0; i--) {
        let flower = flowers[i];
        flower.move(direction);
        flower.render();

        // Remove flowers that have gone off-screen
        if (flower.isOffScreen()) {
            flowers.splice(i, 1);
        }
    }
}

function updateScoreFlower(charX, charWidth) {
    for (let i = flowers.length - 1; i >= 0; i--) {
        if (flowers[i].collidesWith(charX, charWidth)) {
            flowers.splice(i, 1);
            flowers.collected = true
            flowerSounds[soundIndex].play()
            soundIndex += 1
            if (soundIndex > 3) {
                soundIndex = 0
            }
            return score += 1; 
        }
        else {
            return score
        }
    }
    return score
}