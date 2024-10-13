let stillFrame, runningGif;
let speed = 5;
let direction = 0; // -1 for left, 0 for still, 1 for right
let curPos;

let stars = [];
const numStars = 100;
let starImages;

function preload() {
    stillFrame = loadImage('./static/stillFrame.png');
    runningGif = loadImage("./static/runFrame.gif");
    yellowStarImage = loadImage('./static/yellow_star.png');
    pinkStarImage = loadImage('./static/pink_star.png');
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
}

function centerCanvas() {
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    canvas.position(x, y);
}

function draw() {
    background('#010101');
    
    // Check for key presses
    if (keyIsDown(RIGHT_ARROW)) {
        direction = 1;
    } else if (keyIsDown(LEFT_ARROW)) {
        direction = -1;
    } else {
        direction = 0;
    }

    // Move and display stars
    updateAndDisplayStars(stars, direction !== 0, -direction, starImages);
    
    // Calculate y position to place the bottom of the image at the bottom of the canvas
    let yPos = height - (stillFrame.height * 0.4/ 2);
    
    // Display character
    push();
    if (direction !== 0) {
        // Running
        translate(curPos, yPos - 30);
        scale(direction, 1); // Flip horizontally if moving left
        image(runningGif, 0, 0, runningGif.width * 0.37, runningGif.height * 0.37);
    } else {
        // Standing still
        image(stillFrame, curPos, yPos - 30, stillFrame.width * 0.37, stillFrame.height * 0.37);
    }
    pop();
}