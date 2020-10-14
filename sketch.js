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
let font,
    fontSize = 40;

function preload() {
    font = loadFont('assets/OpenSans-Bold.ttf');
}

function setup() {
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 1;
    
    initializeCanvas();
}

function initializeCanvas() {
    createCanvas(600, 700);
    var spacing = width / columns;
    populatePegs(spacing);
    createPointZones(width, height, spacing);

    textFont(font);
    textSize(fontSize);
    textAlign(CENTER, CENTER);
}

function populatePegs(spacing) {
    for (var j = 0; j < rows; j++){
        for (var i = 0; i < columns; i++){
            var x = i * spacing;
            if (j % 2 == 1)
                x += spacing/2;
            var y = spacing + j * spacing;
            var p = new Peg(x, y, 4);
            pegs.push(p);
        }
    }
}

function createPointZones(width, height, spacing) {
    var bottomWidth = width;
    var bottomHeight = 100;
    var bottomXCoord = bottomWidth/2;
    var bottomYCoord = height + bottomHeight / 2; 
    var sideWidth = 50;

    var sideHeight = height;
    var leftXCoord = -1 * sideWidth / 2;
    var rightXCoord = width + sideWidth / 2;
    var sideYCoord = height / 2;

    var left = new Boundary(leftXCoord, sideYCoord, sideWidth, sideHeight);
    var right = new Boundary(rightXCoord, sideYCoord, sideWidth, sideHeight);
    var bottom = new Boundary(bottomXCoord, bottomYCoord, bottomWidth, bottomHeight);
    
    boundaries.push(bottom);
    boundaries.push(left, right);

    for (var i = 0; i < columns + 0; i++){
        var h = 70;
        var w = 5;
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

function removeAllParticles(){
    for(var i=0; i < particles.length; i++)
        World.remove(world, particles[i].body);
    particles.splice(0, particles.length);
}

function removeParticle(counter) {
    World.remove(world, particles[counter].body);
    particles.splice(counter, 1);
}

function drawParticles() {
    for(var i = 0; i < particles.length; i++) {
        particles[i].show();
        if (particles[i].isOffScreen())
            removeParticle(i--);
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

function assignPointValues() {
    var threshold = 630;   // vertical threshold particles must pass
    var sum = 0;
    var zoneWidth = width/columns;
    
    particles.forEach(setParticlePointValue)
    displaySum();

    function setParticlePointValue(item){
        var yCoord = item.body.position.y;
        if(yCoord >= threshold){
            var xCoord = item.body.position.x;
            item.setPointValue(pointZones(xCoord));
        }
    }
    function pointZones(xCoord) {
        var point = 1;
        var delta = 1;
        var max = Math.round(columns/2);

        for(var i = 1; i <= columns; i++){
            var previous = zoneWidth * (i - 1);
            var current = zoneWidth * i;
            if (point == max)
                delta *= -1;
            if(xCoord > previous && xCoord < current){
                document.getElementById("latestScore").innerHTML = point;
                return point;
            }
            point += delta;
        }
        return 0;
    }
    function displaySum() {
        particles.forEach(p => sum += p.pointValue);
        document.getElementById("score").innerHTML = sum;
    }
}

function drawPointValues() {
    var point = 1;
    var delta = 1;
    var max = Math.round(columns/2);
    var yCoord = 650;
    var zoneWidth = width/columns;
    var offset = zoneWidth / 2 - 2;

    for(var i = 0; i < columns; i++){
        drawWords(point.toString(), zoneWidth * i + offset, yCoord);
        if(point == max)
            delta *= -1;
        point += delta;
    }

    function drawWords(value, x, y){
        fill(185);
        stroke(185);
        text(value, x, y);
    }
}

function draw() {
    background(50);
    Engine.update(engine);

    drawPointValues();
    drawPegs();
    drawParticles();
    drawBoundaries();
    assignPointValues();
}