# Plinko

Created during second 4-week sprint of CIS 293 Advanced Technologies. I had a partner named Thomas Schwartz for this project.

My goal was to explore how a physics engine creates realistic movement and attempt to implement one. Plinko was a demo that would easily display the effects of physical simulation.

For initial implementation of the plinko game, the **p5.js** external library was used for drawing the objects and the **matter.js** external library was used for applying the physical effects.

Unfortunately, due to a miscalculation in scope, an implementation of a custom physics engine was not possible by the deadline. Instead, the project scope altered and focused on more deeply understanding the associative arrays for the external libraries, managing classes/objects in JavaScript, and designing algorithms for object creation, manipulation, and display.

## Individual Object Classes
#### Particle, Boundary, and Peg

These classes represent instantiate their representations in the plinko game board. They describe both their display (within the show() function) as well as their representation in the physics engine (this.body and World.add(world, this.body).

Points of note:
* Random color of particles
* Holding point value as a field on the Particle object in order to calculate points
* Pushing and Popping objects on show() method so that their translate effects won't affect future objects
  * Initializing objects at the origin (ellipse(0, 0, this.r * 2); and then translating (translate(pos.x, pos.y)) is apparently some preferred practice. Easier to create at origin and apply the translation after to prevent bugs down the road.
* Associative arrays holding options such as friction, restitution, and isStatic to pass into the physics engines representation of said object.
  * matter.js has a large amount of options to help fine tune physical simulation of objects
  
## Sketch.js

Holds implementation for actual game. Preload necessary information and draw objects on every frame after updating their representation in the engine. Some interesting algorithmic solutions:
* drawPointLabels - Uses a delta and point counter to oscillate from 1 to an arbitrary max and back again
  * Allows for dynamic creation of the board where all point zones are labelled and scored appropriately
* Holding all object arrays on a global level allows for simple iteration when needing to draw each image or displaySum() of each particle.
* Implementing a method that will remove a particle from both the global array and the physics engine if it somehow leaves game board is a type of side-case validation.

## Index.html

Import all javascript files, connect methods to buttons, and display total.

## Finally

There are some things to clean up in this application:
* sketch.js is too big of a file and deserves to be refactored.
  * There are some methods that either could be moved to a new file or be given global/local scope.
* All object classes are similar enough that they could be created using some inheritance structure.
* Explore TypeScript to allow code to be statically checked and to use the objects more cleanly.
* Improve front-end display for game using Bootstrap

**Zach Robinson**
