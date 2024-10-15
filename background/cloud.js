class Cloud {
    constructor(cloudGif) {
        this.cloudSpeed = 5; 
        this.x = random(10, windowWidth);
        this.y = random(10, windowHeight/2);
        this.scalefactor = random(0.07, 0.17);
        this.cloudGif = cloudGif;
    }

    collidesWith(otherCloud) {
        return (
            this.x < otherCloud.x + otherCloud.cloudGif.width &&
            this.x + this.cloudGif.width > otherCloud.x &&
            this.y < otherCloud.y + otherCloud.cloudGif.height &&
            this.y + this.cloudGif.height > otherCloud.y
        );
    }

    move(direction) {
        if (direction < 0) {
            this.x += this.cloudSpeed;
        } else {
            this.x -= this.cloudSpeed;
        }
    
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
    }

    render() {
        push();
        imageMode(CENTER);
        image(this.cloudGif, this.x, this.y, this.cloudGif.width * this.scalefactor, this.cloudGif.height * this.scalefactor);
        pop();
        // if (cloudGif) {

        // }
    }
}

function updateAndRenderClouds(clouds, moving, direction) {
    for (let cloud of clouds) {
        if (moving) {
            cloud.move(direction);
        }
        cloud.render();
    }
}


function createCloud(clouds, cloudGif) {
    let newCloud;
    let attempts = 0;
    const maxAttempts = 100;  // Prevent infinite loop

    while (attempts < maxAttempts) {
        newCloud = new Cloud(cloudGif);
        attempts++;

        // Check collision with existing clouds
        let collided = clouds.some(cloud => newCloud.collidesWith(cloud));

        if (!collided || attempts >= maxAttempts) {
            clouds.push(newCloud);
            break;
        }
    }
}