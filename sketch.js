let stillFrame
let speed = 5 
let rightDirection = true
let curPos = 30
let frameCount = 0

function preload() {
  stillFrame = loadImage('stillFrame.png')
  rightFrame = loadImage('rightFrame.png')
  leftFrame = loadImage('leftFrame.png') 
}

function setup() {
  createCanvas(600, 200)
  curFrame = stillFrame;
}
function draw() {
  background('#87CEEB')
  
  let moving = false
  
  if (keyIsDown(RIGHT_ARROW)) {
    curPos += speed
    rightDirection = true
    moving = true
  } else if (keyIsDown(LEFT_ARROW)) {
    curPos -= speed
    rightDirection = false
    moving = true
  }
  
  push()
  if (moving) {
    if (rightDirection) {
      image(rightFrame, curPos, height - rightFrame.height - 30)
    } else {
      image(leftFrame, curPos, height - leftFrame.height - 30)
    }
  } else {
    image(stillFrame, curPos, height - stillFrame.height - 5)
  }
  pop()
}