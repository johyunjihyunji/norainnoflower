let stillFrame, runningGif, rainGif;
let speed = 5;
let direction = 0; // -1 for left, 0 for still, 1 for right
let curPos;

// Star Background
let stars = [];
const numStars = 100;
let starImages;

function preload() {
    stillFrame = loadImage('./static/stillFrame.png');
    runningGif = loadImage("./static/runFrame.gif");
    yellowStarImage = loadImage('./static/yellow_star.png');
    pinkStarImage = loadImage('./static/pink_star.png');

    rainGif = loadImage("./static/rainFrame.gif");
}

function setup() {
    //canvas = createCanvas(900, 600);
    canvas = createCanvas(windowWidth, windowHeight);
    centerCanvas();
    imageMode(CENTER);
    curPos = width / 2;
    
    // Create stars for background
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
    starImages = [pinkStarImage, yellowStarImage];
    rain = new Rain(); 
}

function centerCanvas() {
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    canvas.position(x, y);
}

function draw() {
    background('#030b07');
    
    // Check for key presses
    if (keyIsDown(RIGHT_ARROW)) {
        direction = 1;
    } else if (keyIsDown(LEFT_ARROW)) {
        direction = -1;
    } else {
        direction = 0;
    }

    // Move and display stars
    updateAndRenderStars(stars, direction !== 0, -direction, starImages);

    // Update and display rain
    updateAndRenderRain(rain, direction !== 0, direction, rainGif)
    
    // Calculate y position to place the bottom of the image at the bottom of the canvas
    let yPos = height - (stillFrame.height * 0.4/ 2);
    
    // Display character
    push();
    if (direction !== 0) {
        // Running
        translate(curPos, yPos);
        scale(direction, 1); // Flip horizontally if moving left
        image(runningGif, 0, 0, runningGif.width * 0.3, runningGif.height * 0.3);
    } else {
        // Standing still
        image(stillFrame, curPos, yPos, stillFrame.width * 0.3, stillFrame.height * 0.3);
    }
    pop();
}