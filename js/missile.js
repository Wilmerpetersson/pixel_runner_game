GameState.prototype.launchMissile = function(x, y) {
    // // Get the first dead missile from the missileGroup
    var missile = this.missileGroup.getFirstDead();

    // If there aren't any available, create a new one
    if (missile === null) {
        missile = new Missile(this.game);
        this.missileGroup.add(missile);
    }

    // Revive the missile (set it's alive property to true)
    // You can also define a onRevived event handler in your explosion objects
    // to do stuff when they are revived.
    missile.revive();

    // Move the missile to the given coordinates
    missile.x = x;
    missile.y = y;

    return missile;
};

// Try to get a used explosion from the explosionGroup.
// If an explosion isn't available, create a new one and add it to the group.
// Setup new explosions so that they animate and kill themselves when the
// animation is complete.
GameState.prototype.getExplosion = function(x, y) {
    // Get the first dead explosion from the explosionGroup
    var explosion = this.explosionGroup.getFirstDead();

    // If there aren't any available, create a new one
    if (explosion === null) {
        explosion = this.game.add.sprite(0, 0, 'explosion');
        explosion.anchor.setTo(0.5, 0.5);

        // Add an animation for the explosion that kills the sprite when the
        // animation is complete
        var animation = explosion.animations.add('boom', [0,1,2,3,4,5,6], 40, false);
        animation.killOnComplete = true;

        // Add the explosion sprite to the group
        this.explosionGroup.add(explosion);
    }

    // Revive the explosion (set it's alive property to true)
    // You can also define a onRevived event handler in your explosion objects
    // to do stuff when they are revived.
    explosion.revive();

    // Move the explosion to the given coordinates
    explosion.x = x;
    explosion.y = y;

    // Set rotation of the explosion at random for a little variety
    explosion.angle = this.game.rnd.integerInRange(0, 360);

    // Play the animation
    explosion.animations.play('boom');

    // Return the explosion itself in case we want to do anything else with it
    return explosion;
};

// Missile constructor
var Missile = function(game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'rocket');

    this.animations.add('run');
    this.animations.play('run', 12, true);

    // Set the pivot point for this sprite to the center
    this.anchor.setTo(0.5, 0.5);

    // Enable physics on the missile
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    // Define constants that affect motion
    this.SPEED = 100; // missile speed pixels/second
    this.TURN_RATE = 1; // turn rate in degrees/frame
};

// Missiles are a type of Phaser.Sprite
Missile.prototype = Object.create(Phaser.Sprite.prototype);
Missile.prototype.constructor = Missile;

Missile.prototype.update = function() {
    // If this missile is dead, don't do any of these calculations
    // Also, turn off the smoke emitter
    if (!this.alive) {
        this.on = false;
        return;
    } else {
        this.on = true;
    }
   
    // Calculate the angle from the missile to the mouse cursor game.input.x
    // and game.input.y are the mouse position; substitute with whatever
    // target coordinates you need.
    var targetAngle = this.game.math.angleBetween(
        this.x, this.y,
        this.game.input.activePointer.x, this.game.input.activePointer.y
    );

    // Add our "wobble" factor to the targetAngle to make the missile wobble
    // Remember that this.wobble is tweening (above)
    targetAngle += this.game.math.degToRad(this.wobble);

    // Gradually (this.TURN_RATE) aim the missile towards the target angle
    if (this.rotation !== targetAngle) {
        // Calculate difference between the current angle and targetAngle
        var delta = targetAngle - this.rotation;

        // Keep it in range from -180 to 180 to make the most efficient turns.
        //if (delta > Math.PI) delta -= Math.PI * 2;
       // if (delta < -Math.PI) delta += Math.PI * 2;

        if (delta > 0) {
            // Turn clockwise
            this.angle -= this.TURN_RATE;
        } else {
            // Turn counter-clockwise
            this.angle -= this.TURN_RATE;
        }

        // Just set angle to target angle if they are close
        if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
            this.rotation = targetAngle;
        }
    }

    // Calculate velocity vector based on this.rotation and this.SPEED
    this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
    this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;
};
