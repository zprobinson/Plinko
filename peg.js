class Peg {
    /**
     * The constructor for a Peg object.
     * 
     * Zach Robinson.
     * 
     * @param {number} x The x coordinate for where the object should be drawn.
     * @param {number} y The y coordinate for where the object should be drawn.
     * @param {number} r The radius of the peg object.
     */
    constructor(x, y, r) {
        var options = {
            isStatic: true,
        };
        this.body = Bodies.circle(x, y, r, options);
        this.r = r;
        World.add(world, this.body);

    }

    /**
     * Displays the Peg object at predetermined location
     * determined by the object's constructor.
     * 
     * Zach Robinson.
     */
    show() {
        fill(127);
        stroke(125);
        push();
        var pos = this.body.position;
        translate(pos.x, pos.y);
        ellipse(0, 0, this.r * 2);
        pop();
    }
}

