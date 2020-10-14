/**
 * The constructor for a Boundary object.
 * 
 * Zach Robinson
 * 
 * @param {number} x The x coordinate for where the object should be drawn.
 * @param {number} y The y coordinate for where the object should be drawn.
 * @param {number} w The width of the object.
 * @param {number} h The height of the object.
 */
class Boundary {
    constructor(x, y, w, h) {
        var options = {
            isStatic: true
        };
        this.body = Bodies.rectangle(x, y, w, h, options);
        this.w = w;
        this.h = h;
        World.add(world, this.body);
    }

    /**
     * Displays the boundary object with predetermined fill at 
     * the coordinates determined by the object's constructor.
     * 
     * Zach Robinson.
     */
    show() {
        fill(255);
        stroke(255);
        push();
        var pos = this.body.position;
        translate(pos.x, pos.y);
        rectMode(CENTER);
        rect(0, 0, this.w, this.h);
        pop();
    }
}

