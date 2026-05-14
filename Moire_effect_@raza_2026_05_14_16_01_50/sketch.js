let mode = 1;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  
  // Base Layer: Oscillating Sine Wave Grid
  // This creates a dense background of waves to increase interference complexity
  stroke(0);
  noFill();
  strokeWeight(0.7);
  
  for (let y = -20; y < height + 20; y += 8) {
    beginShape();
    for (let x = 0; x <= width; x += 15) {
      // Background waves shift slightly over time
      let yOffset = sin(frameCount * 0.02 + x * 0.01) * 6;
      vertex(x, y + yOffset);
    }
    endShape();
  }
  
  push();
  // Interaction Layer: Defined by the current mode
  if (mode === 1) {
    // STYLE 1: Linear Wave Interference
    // Offset controlled by mouse position to create shifting fringe patterns
    translate(0, mouseY - height/2);
    stroke(255, 0, 100, 160);
    drawWaveGrid();
    
  } else if (mode === 2) {
    // STYLE 2: Rotational Concentric Geometry
    // Creates a moire effect through angular misalignment
    translate(width/2, height/2);
    rotate(map(mouseX, 0, width, 0, TWO_PI));
    stroke(0, 120, 255, 160);
    drawRadialGrid();
    
  } else if (mode === 3) {
    // STYLE 3: Pulsing Scale Interference
    // Uses a sine function to automate the scaling, mimicking a heartbeat
    translate(width/2, height/2);
    let pulse = map(sin(frameCount * 0.03), -1, 1, 0.4, 2.2);
    scale(pulse);
    stroke(40, 180, 40, 160);
    drawRadialGrid();
  }
  pop();
  
  renderInstructions();
}

// Helper function for Style 1: Linear waves
function drawWaveGrid() {
  for (let y = -height; y < height * 2; y += 6) {
    line(0, y, width, y);
  }
}

// Helper function for Style 2 & 3: Centered lines
function drawRadialGrid() {
  for (let i = -width; i < width; i += 7) {
    line(-width, i, width, i);
  }
}

// Interface to display the current state to the user/marker
function renderInstructions() {
  noStroke();
  fill(30);
  rect(0, height - 40, width, 40);
  fill(255);
  textSize(13);
  text("Moire Style: " + mode + " | Press [1], [2], or [3] to toggle", 20, height - 15);
}

function keyPressed() {
  if (key === '1') mode = 1;
  if (key === '2') mode = 2;
  if (key === '3') mode = 3;
}