var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var pegs = [];
var boundaries = [];
var particleFrequency = 60;
var columns = 11;
var rows = 10;
var score = 0;

/**
 * Preloads the font before drawing canvas.
 * 
 * Zach Robinson.
 */
function preload() {
    font = loadFont('assets/OpenSans-Bold.ttf');
}

/**
 * Sets up the engine, world, gravity, and font properties. Initializes canvas to beginning state.
 * 
 * Zach Robinson.
 */
function setup() {
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 1;

    textFont(font);
    textSize(fontSize);
    textAlign(CENTER, CENTER);
    
    initializeCanvas();
}

/**
 * Draws the canvas, calculates the spacing to be used when populating the initial static objects.
 * 
 * Zach Robinson.
 */
function initializeCanvas() {
    createCanvas(600, 700);
    var spacing = width / columns;
    populatePegs(spacing);
    populateCanvasBoundaries();
    populatePointZones(spacing);

}

/**
 * Populates the pegs using a nested for loop. Some manipulation for the spacing
 * of individual rows. Pushes all pegs to the object array designed to hold them.
 * 
 * Zach Robinson.
 */
function populatePegs(spacing) {
    let radius = 4;
    for (var row = 0; row < rows; row++){
        for (var col = 0; col < columns; col++){
            var x = col * spacing + 12;
            if (row % 2 == 1)
                x += spacing/2;
            var y = spacing + row * spacing;
            var p = new Peg(x, y, radius);
            pegs.push(p);
        }
    }
}

/**
 * Populates the point zones using a for loop. Pushes all boundary objects
 * to the object array designed to hold them.
 * 
 * Zach Robinson.
 */
function populatePointZones(spacing) {
    for (var i = 0; i < columns; i++){
        var h = 70;
        var w = 5;
        var x = i * spacing - w / 2;
        var y = height - h / 2;
        var wall = new Boundary(x, y, w, h);
        boundaries.push(wall);
    }
}

/**
 * Populates the canvas boundaries for the canvas. These will prevent the particles
 * from falling off the edges or out from the bottom. Pushes all boundary objects
 * to the array designed to hold them.
 * 
 * Zach Robinson and Thomas Schwartz.
 */
function populateCanvasBoundaries() {
    var bottomHeight = 100;
    var bottomXCoord = width / 2;
    var bottomYCoord = height + bottomHeight / 2;

    var sideWidth = 50;
    var leftXCoord = -1 * sideWidth / 2;
    var rightXCoord = width + sideWidth / 2;
    var sideYCoord = height / 2;

    var left = new Boundary(leftXCoord, sideYCoord, sideWidth, height);
    var right = new Boundary(rightXCoord, sideYCoord, sideWidth, height);
    var bottom = new Boundary(bottomXCoord, bottomYCoord, width, bottomHeight);

    boundaries.push(bottom, left, right);
}

/**
 * Creates a new particle with default settings and pushes it
 * to the object array designed to hold it.
 * 
 * Zach Robinson.
 */
function createNewParticle() {
    var p = new Particle(300, 0, 12);
    particles.push(p);
}

/**
 * Removes all particles both from the physics engine and the object
 * array used to draw them. 
 * 
 * Zach Robinson.
 */
function removeAllParticles() {
    for(var i=0; i < particles.length; i++)
        World.remove(world, particles[i].body);
    particles.splice(0, particles.length);

    document.getElementById(latestScoreId).innerHTML = "&nbsp";
}

/**
 * Removes a single particle at a particular count.
 * Used in case a particle falls through the canvas boundaries.
 * 
 * Zach Robinson.
 */
function removeParticle(counter) {
    World.remove(world, particles[counter].body);
    particles.splice(counter, 1);
}

/**
 * Draws and displays all particles in the object array. Includes a 
 * validation check for if particle is off screen.
 * 
 * Zach Robinson.
 */
function drawParticles() {
    for(var i = 0; i < particles.length; i++) {
        particles[i].show();
        if (particles[i].isOffScreen())
            removeParticle(i--);
    }
}

/**
 * Draws all pegs in the object array.
 * 
 * Zach Robinson.
 */
function drawPegs() {
    for(var i = 0; i < pegs.length; i++) {
        pegs[i].show();
    }
}

/**
 * Draws all boundary objects in the object array.
 * 
 * Zach Robinson.
 */
function drawBoundaries() {
    for(var i = 0; i < boundaries.length; i++) {
        boundaries[i].show();
    }
}

/**
 * Draws the labels for any particular point zone on the canvas.
 * Uses a for loop and delta to count forward and backward, so the
 * point values can be adjusted dynamically using global variables.
 * 
 * Zach Robinson.
 */
function drawPointLabels() {
    var point = 1;
    var delta = 1;
    var max = Math.round(columns/2);
    var yCoord = 650;
    var zoneWidth = width/columns;
    var offset = zoneWidth / 2 - 2;

    for(var i = 0; i < columns; i++){
        var xCoord = zoneWidth * i + offset;
        drawLabel(point.toString(), xCoord, yCoord);
        if(point == max)
            delta *= -1;
        point += delta;
    }

    /**
     * Draws a particular point label.
     * @param {string} value Point value to be associated with label.
     * @param {number} x X coordinate where label should be drawn.
     * @param {number} y Y coordinate where label should be drawn.
     * 
     * Zach Robinson.
     */
    function drawLabel(value, x, y){
        fill(185);
        stroke(185);
        text(value, x, y);
    }
}
function pointValue() {
    for(var i = 0; i < columns.length; i++) {
        particles.pointValue(i);
        score.show();
    }
}
function draw() {
    background(50);
    Engine.update(engine);

    //spawnParticles();

    drawPointLabels();
    drawPegs();
    drawParticles();
    drawBoundaries();

    assignPointValuesAndDisplay();
}

/**
 * Spawns particles per frame count rather than on button spawn.
 * Used for testing.
 * 
 * Zach Robinson.
 */
function spawnParticles() {
    if (frameCount % particleFrequency == 0) {
        createNewParticle();
    }
}