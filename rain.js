class Rain {
    constructor() {
        this.isRaining = false;
        this.timeBetweenRain = random(200, 500);
        this.rainSpeed = 5; // Adjust this for faster/slower rain movement
        this.x = windowWidth + 300; // Start off-screen to the right
        this.y = 300;
    }

    move(moving, direction) {
        if (moving) {
            if (!this.isRaining) {
                if (this.timeBetweenRain <= 0) {
                    this.isRaining = true;
                    this.x = windowWidth + 300; // Always start from the right
                } else {
                    this.timeBetweenRain--;
                }
            } else {
                // Move rain based on character's direction
                this.x -= this.rainSpeed * direction;

                // Stop raining when rain moves off screen on either side
                if (this.x < -300 || this.x > windowWidth + 300) {
                    this.isRaining = false;
                    this.timeBetweenRain = random(200, 500);
                }
            }
        } else {
            // If character stops, gradually slow down the rain
            if (this.isRaining) {
                this.x -= this.rainSpeed * 0.5; // Slow movement
                if (this.x < -300) {
                    this.isRaining = false;
                    this.timeBetweenRain = random(200, 500);
                }
            }
        }
    }

    render(rainGif) {
        if (this.isRaining && rainGif) {
            push();
            imageMode(CENTER);
            image(rainGif, this.x, this.y, rainGif.width * 0.3, rainGif.height * 0.3);
            pop();
        }
    }
}

function updateAndRenderRain(rain, moving, direction, rainGif) {
    rain.move(moving, direction);
    rain.render(rainGif);
}