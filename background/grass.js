class GrassPoke {
    constructor(index) {
        this.x = map(index, 0, 100 - 1, 0, width)
        this.y =  random(130, 150);
        this.controlPointY = random(10, 30);
        this.speed = 5
    }
}

function drawGrass(direction, grassPokes) {
    push();
    
    let grassTipColor = color('#9EB287');
    let grassBaseColor = color('#66816D');

    // Move grass pokes
    for (let poke of grassPokes) {
        poke.x -= direction * poke.speed;
        if (poke.x < 0) poke.x += width;
        if (poke.x > width) poke.x -= width;
    }

    // Sort pokes by x
    grassPokes.sort((a, b) => a.x - b.x);

    // Draw grass pokes
    noStroke();
    beginShape();
    
    // Start at the bottom-left corner
    vertex(0, height);

    // Draw each poke
    for (let poke of grassPokes) {
        let gradient = drawingContext.createLinearGradient(poke.x, height, poke.x, height - poke.y);
        gradient.addColorStop(0, grassBaseColor.toString());
        gradient.addColorStop(1, grassTipColor.toString());
        drawingContext.fillStyle = gradient;

        // Draw the poke
        curveVertex(poke.x, height - poke.y);
    }

    // End at the bottom-right corner
    vertex(width, height);
    
    endShape(CLOSE);
    
  }
