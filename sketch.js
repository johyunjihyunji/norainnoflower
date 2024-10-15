let stillFrame, runningGif, rainGif, grainImage, umbrellaImage, flowerImg;
let speed = 5;
let direction = 0; // -1 for left, 0 for still, 1 for right
let charX;
let charY;

// Star Background
let stars = [];
const numStars = 40;
let starImages;

// Cloud Background
let clouds = [];
const numClouds = 6;

// Grass Background
let grassPokes = []
let numGrassPokes = 100; 

// Umbrella
let showUmbrella = false;

// Score System
let score = 10;

// Flowers
let flowers = [];

// Gamestate
let gameState = false;

function preload() {
    //Images and Gif
    stillFrame = loadImage('./static/stillFrame.png');
    runningGif = loadImage("./static/runFrame.gif");
    yellowStarImage = loadImage('./static/yellow_star.png');
    pinkStarImage = loadImage('./static/pink_star.png');
    rainGif = loadImage("./static/rain.gif");
    cloudGif = loadImage("./static/cloud.gif");
    grainImage = loadImage('./static/grainAttempt2.jpeg');
    umbrellaGif = loadImage('./static/umbrella.gif');
    flowerGif = loadImage('./static/flower.gif');
    landingpage = loadImage('./static/landingpage.png')

    //Sound
    mainTrack = loadSound('./sound/Main_Track.m4a');
    rainSound = loadSound('./sound/rainSound.mp3');
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);
    charX = width / 2;
    charY = height - 250;
    
    // Create stars for background
    starImages = [pinkStarImage, yellowStarImage];
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }

    // Create rain cloud
    rain = new Rain(rainGif, rainSound); 

    // Create clouds for background
    for (let i = 0; i < numClouds; i++) {
        createCloud(clouds, cloudGif);
    }

    // Create grass pokes
    for (let i = 0; i < numGrassPokes; i++) {
        grassPokes.push(new GrassPoke(i));
    }

    // Start button
    startButton = createButton('Start Game');
    startButton.position(width/2 - 70, height/2 + 200);
    startButton.mousePressed(startGame);
    startButton.size(150, 50);
    startButton.style('background-color', '#6B8778');
    startButton.style('font-size', '16px');
    startButton.style('color', 'white');
    startButton.style('border', 'none');
}

function draw() {
    if (gameState) {
        drawgame()
    } else {
        drawlanding ()
    }
}

function drawlanding() {

    // Background - Perplexity.AI helped with creating gradient background
    let c1 = color('#432749'); // purple
    let c2 = color('#E17E84'); // pink
    let c3 = color('#EEE790'); // yellow
    
    for (let y = 0; y < height; y++) {
        let inter1 = map(y, 0, height/2, 0, 1);
        let inter2 = map(y, height/2, height, 0, 1);
        let c;
        
        if (y < height/2) {
          c = lerpColor(c1, c2, inter1);
        } else {
          c = lerpColor(c2, c3, inter2);
        }
        
        stroke(c);
        line(0, y, width, y);
    }

    // Apply grain
    push();
    blendMode(OVERLAY);
    tint(255, 80);
    image(grainImage, 0, 0, width , height);
    image(grainImage, width,  height, width , height);
    image(grainImage, 0,  height, width , height);
    image(grainImage, width,  0, width , height);
    pop();

    // Title
    push();
    image(landingpage, width / 2, height / 2 - 50, landingpage.width * 0.6, landingpage.height * 0.6);
    pop();

    // Instructions
    push();
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("collect your flowers and use the umbrella (up arrow key) when it rains", width/2, height/2 + 170);
    pop()
}

function startGame() {

    // Atempting to fix my audio issue helped by perplexity.ai
    userStartAudio();

    mainTrack.loop();
    startButton.remove();
    gameState = true;
}



function drawgame() {

    // background  

    // Perplexity.AI helped with creating gradient background
    let c1 = color('#432749'); // purple
    let c2 = color('#E17E84'); // pink
    let c3 = color('#EEE790'); // yellow
    
    for (let y = 0; y < height; y++) {
        let inter1 = map(y, 0, height/2, 0, 1);
        let inter2 = map(y, height/2, height, 0, 1);
        let c;
        
        if (y < height/2) {
          c = lerpColor(c1, c2, inter1);
        } else {
          c = lerpColor(c2, c3, inter2);
        }
        
        stroke(c);
        line(0, y, width, y);
    }
    

    // Draw grass
    drawGrass(direction, grassPokes);
    
    // Apply grain
    push();
    blendMode(OVERLAY);
    tint(255, 80);
    image(grainImage, 0, 0, width , height);
    image(grainImage, width,  height, width , height);
    image(grainImage, 0,  height, width , height);
    image(grainImage, width,  0, width , height);
    pop();

    // Check for key presses
    if (keyIsDown(RIGHT_ARROW)) {
        direction = 1;
    } else if (keyIsDown(LEFT_ARROW)) {
        direction = -1;
    } else {
        direction = 0;
    }

    if (keyIsDown(UP_ARROW)) {
        showUmbrella = true;
    } else {
        showUmbrella = false;
    }

    // Update and display stars
    updateAndRenderStars(stars, direction !== 0, -direction, starImages);

    // Update and display rain
    updateAndRenderRain(rain, direction !== 0, direction, rainGif)

    // Update and display clouds
    updateAndRenderClouds(clouds, direction !== 0, direction)

    // Update and display flowers
    updateAndRenderFlowers(rain, flowers, flowerGif, direction);

    // Update and display Score
    displayScore()
    score = updateScoreRain(rain, charX, stillFrame.width * 0.5, showUmbrella, score,  millis())
    score = updateScoreFlower(charX, stillFrame.width * 0.2);
 
    // Display character
    push();
    if (direction !== 0) {
        // Running
        translate(charX, charY);
        scale(direction, 1); // Flip horizontally if moving left
        image(runningGif, 0, 0, runningGif.width * 0.3, runningGif.height * 0.3);
        if (showUmbrella) {
            image(umbrellaGif, 15, -250, umbrellaGif.width * 0.25, umbrellaGif.height * 0.25);
        }
    } else {
        // Standing still
        image(stillFrame, charX, charY, stillFrame.width * 0.3, stillFrame.height * 0.3);
    }
    pop(); 

    // Check if gameover
    checkDeath() 
    displayScore() 
}

function displayScore() {
    push();
    fill('#6B8778')
    noStroke();
    rect(5, 5, 50, 30); 
    fill(255);
    textSize(24);
    textAlign(LEFT, TOP);
    text(score, 10, 10);
    pop();
}

function checkDeath() {
    if (score <= 0) {
        noLoop(); // Stop the game
        push();
        fill(255);
        textSize(48);
        textAlign(CENTER, CENTER);
        text("Game Over", width/2, height/2);
        mainTrack.stop()
        // rain.rainSound.stop()
        pop();
    }
}


