class Rain {
    constructor(rainGif) {
        this.isRaining = false;
        this.timeBetweenRain = random(200, 500);
        this.rainSpeed = 5; 
        this.x = windowWidth + 300;
        this.y = 300;
        this.rainGif = rainGif;
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

    render() {
        if (this.isRaining && rain.rainGif) {
            push();
            imageMode(CENTER);
            image(rain.rainGif, this.x, this.y, rain.rainGif.width * 0.3, rain.rainGif.height * 0.3);
            pop();
        }
    }
}

function updateAndRenderRain(rain, moving, direction) {
    rain.move(moving, direction);
    rain.render();
}

let lastScoreDecrease = 0
scoreDecreaseInterval = 1000

function updateScoreRain(rain, charX, charWidth, showUmbrella, score, currentTime) {
    let collided = collidesWith(rain, charX, charWidth)

    if (showUmbrella) {
        return score; // No score decrease if umbrella is shown
    }

    if (collided && rain.isRaining && !showUmbrella && currentTime - lastScoreDecrease >= scoreDecreaseInterval) {
        lastScoreDecrease = currentTime;
        return Math.max(0, score - 1); // Ensure score doesn't go below 0
    }
    else {
        return score
    }
}


function collidesWith(rain, charX, charWidth) {
    return (
        rain.x < charX + charWidth &&
        rain.x + rain.rainGif.width - 50 > charX
    );
}