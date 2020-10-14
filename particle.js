function Particle(x, y, r)
{

    var options = {
        restitution: .8,
        friction: 0
    }
    x += random(-150, 150);
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    World.add(world, this.body);
    this.color = Math.random() * 255 * 1.2;
    this.g = Math.random() * 255 * 1.2;
    this.b = Math.random() * 255 * 1.2;

}

Particle.prototype.isOffScreen = function() {
    var x = this.body.position.x;
    var y = this.body.position.y;
    return x < -50 || x > width + 50
}

Particle.prototype.show = function() {
    fill(this.color, this.g, this.b);
    stroke(255);
    push();
    var pos = this.body.position;
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
}