var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var particleFrequency = 60;
var pegs = [];
var boundaries = [];
var columns = 11;
var rows = 10;


function setup() {
    createCanvas(600, 700);
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 1;
    var spacing = width / columns;

    createNewParticle();
    populatePegs(spacing);
    createPointZones(width, height, spacing);
}

function populatePegs(spacing) {
    for (var j = 0; j < rows; j++){
        for (var i = 0; i < columns; i++){
            var x = i * spacing;
            if (j % 2 == 1)
                x += spacing/2;
            var y = spacing + j * spacing;
            var p = new Plinko(x, y, 4);
            pegs.push(p);
        }
    }
}
function createPointZones(width, height, spacing) {
    var bottomWidth = width;
    var bottomHeight = 100;
    var bottomXCoord = bottomWidth/2;
    var bottomYCoord = height + bottomHeight / 2;

    var bottom = new Boundary(bottomXCoord, bottomYCoord, bottomWidth, bottomHeight);
    boundaries.push(bottom);

    for (var i = 0; i < columns + 1; i++){
        var h = 70;
        var w = 10;
        var x = i * spacing - w / 2;
        var y = height - h / 2;
        var wall = new Boundary(x, y, w, h);
        boundaries.push(wall);
    }
}
function createNewParticle() {
    var p = new Particle(300, 0, 12);
    particles.push(p);
}
function removeParticle(counter) {
    World.remove(world, particles[counter].body);
    particles.splice(counter, 1);
}
function drawParticles() {
    for(var i = 0; i < particles.length; i++) {
        particles[i].show();
        if (particles[i].isOffScreen()){
            removeParticle(i--);
        }
    }
}
function drawPegs() {
    for(var i = 0; i < pegs.length; i++) {
        pegs[i].show();
    }
}
function drawBoundaries() {
    for(var i = 0; i < boundaries.length; i++) {
        boundaries[i].show();
    }
}
function spawnParticle() {
    if (frameCount % particleFrequency == 0) {
        createNewParticle();
    }
}

function draw() {
    background(51);
    Engine.update(engine);

    drawBoundaries();
    drawPegs();
    spawnParticle();
    drawParticles();
}