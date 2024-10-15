class Rain {
    constructor() {
        this.isRaining = false;
        this.timeBetweenRain = random(200, 500);
        this.rainSpeed = 5; 
        this.x = windowWidth + 300;
        this.y = 300;
        this.rainGif;
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
                this.x -= this.rainSpeed * direction;

                if (this.x < -300 || this.x > windowWidth + 300) {
                    this.isRaining = false;
                    this.timeBetweenRain = random(200, 500);
                }
            }
        } else {
            if (this.isRaining) {
                if (this.x < -300) {
                    this.isRaining = false;
                    this.timeBetweenRain = random(200, 500);
                }
            }
        }
    }

    render(rainGif) {
        rain.rainGif = rainGif
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

let lastScoreDecrease = 0
scoreDecreaseInterval = 1000

function updateScoreRain(rain, moving, charX, charWidth, showUmbrella, score, currentTime) {
    // If it is raining in frame
    if (rain.isRaining && !showUmbrella && currentTime - lastScoreDecrease >= scoreDecreaseInterval) {
        // Entering Rain
        if (charX + charWidth / 2 > rain.x && charX < rain.x + rain.rainGif.width * 0.3){
            lastScoreDecrease = currentTime
            return score - 1
        } 
        // Inside Rain
        else if (rain.x < charX && rain.x + rain.rainGif.width * 0.3 > charX + charWidth / 2){
            lastScoreDecrease = currentTime
            return score - 1
        }
        // Exiting Rain
        else if (rain.x + rain.rainGif.width * 0.3 > charX && charX > rain.x) {
            lastScoreDecrease = currentTime
            return score - 1
        }
        else {
            return score
        }
    }
    else {
        return score
    }
}