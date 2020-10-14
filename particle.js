class Particle {
    /**
     * The constructor for a Particle object.
     * 
     * Zach Robinson.
     * 
     * @param {number} x The x coordinate for where the object should be drawn.
     * @param {number} y The y coordinate for where the object should be drawn.
     * @param {number} r The radius of the particle object.
     */
    constructor(x, y, r) {

        var options = {
            restitution: .8,
            friction: 0
        };
        x += random(-150, 150);
        this.body = Bodies.circle(x, y, r, options);
        this.r = r;
        World.add(world, this.body);
        this.red = Math.max(Math.random() * 255, 20);
        this.green = Math.max(Math.random() * 255, 210);
        this.blue = Math.max(Math.random() * 255, 150);
        this.pointValue = 0;

    }

    /**
     * Determines if the object is off of the canvas. Used to justify
     * whether the object should be removed from engine and draw array.
     * 
     * Zach Robinson.
     */
    isOffScreen() {
        var x = this.body.position.x;
        var y = this.body.position.y;
        return x < -50 || x > width + 50;
    }

    /**
     * Displays the Particle object at predetermined location and color
     * determined by the object's constructor.
     * 
     * Zach Robinson
     */
    show() {
        fill(this.red, this.green, this.blue);
        stroke(this.red, this.green, this.blue);
        push();
        var pos = this.body.position;
        translate(pos.x, pos.y);
        ellipse(0, 0, this.r * 2);
        pop();
    }

    /**
     * Sets the point value of the object.
     * 
     * Zach Robinson.
     * 
     * @param {number} value The point value that the property should inherit.
     */
    setPointValue(value) {
        if (typeof value === 'number')
            this.pointValue = value;
    }
}



