# PlinkoTest

This is a tutorial test of a Plinko game in Javascript.

We use p5.js as the drawing library and matter.js as the physics library.

The index.html gives us the web browser display for our javascript files.
The sketch.js gives us a home base for creating all of the shapes in the game.
There are multiple classes that hold specific information about each type of object.

Particle:
This is the falling puck.
Constructor - x and y determine initial location. r determines radius of puck.
Restitution determines elasticity or 'bounciness' of the puck. Higher is more bouncy.
Friction determines how much the puck will stick when it hits another rigid body.

isOffScreen - determines if puck is currently visible. If not visible, we will use to remove the puck from both the display array and the physics world.

show - holds values for how the puck should be displayed.

Boundary:
This is the boundary where the puck will finally rest.
Constructor - x and y determine location, w and h determine width and height.
isStatic: true is whether or not this body will be affected by gravity, or if it will move.

show - holds values for how this boundary should be displayed.

Plinko:
This is the peg that will disrupt the path of the puck/particle.
Constructor - x and y determine location, r determines radius of peg.
isStatic: true is whether or not this peg will be affected by gravity.

show - holds values for how this peg should be displayed.
