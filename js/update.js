GameState.prototype.update = function() {
        // If there are fewer than MAX_MISSILES, launch a new one
        if (this.missileGroup.countLiving() < this.MAX_MISSILES) {
            // Set the launch point to a random location below the bottom edge
            // of the stage
            this.launchMissile(this.game.rnd.integerInRange(60, this.game.width +200),
                this.game.height + 20);
        }

        // If any missile is within a certain distance of the mouse pointer, blow it up
        this.missileGroup.forEachAlive(function(m) {
            var distance = this.game.math.distance(m.x, m.y,
                this.game.input.activePointer.x, this.game.input.activePointer.y);

            if (gameScore == 300 ) {
               missileGroup.remove(missileGroup);
            }

            if (distance < 50) {
                m.kill();
                gameScore += 1;
      
             if(gameScore % 70 === 0){
                 superAttack = true;

                if(superAttack == true) {  
                  superAttack = this.game.add.sprite(game.world.centerX, game.world.centerY,'superAttack');
              
                  this.game.time.events.add(1500, function() {
                  this.game.add.tween(superAttack).to(500, Phaser.Easing.Linear.None, true);
                  this.game.add.tween(superAttack).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);
                 }, this);

                }

                listenSwipe(function(direction) {
                console.log(direction);
                });

                function listenSwipe(callback) {
                  var eventDuration;
                  var startPoint = {};
                  var endPoint = {};
                  var direction;
                  var minimum = {
                    duration: 0,
                    distance: 150
                  }
                
                  game.input.onDown.add(function(pointer) {
                    startPoint.x = pointer.clientX;
                    startPoint.y = pointer.clientY;
                  }, this);
                
                  game.input.onUp.add(function(pointer) {
                    direction = '';
                    eventDuration = game.input.activePointer.duration;
                
                    if (eventDuration > minimum.duration) {
                      endPoint.x = pointer.clientX;
                      endPoint.y = pointer.clientY;
                
                      // Check direction
                      if (endPoint.x - startPoint.x > minimum.distance) {
                        direction = 'right';

                        var bats = sprite = game.add.sprite(-100, 0, 'bats');
                        tween = game.add.tween(sprite);
                        tween.to({ x: 800 }, 5000, 'Linear', true, 0);
                        bats.animations.add('run');
                        bats.animations.play('run', 10, true);

                        tween.onComplete.add(doSomething);
                        function doSomething() {
                          sprite.kill();
                        }

                      } else if (startPoint.x - endPoint.x > minimum.distance) {

                        direction = 'left';

                         var bats_left = sprite = game.add.sprite(100, 0, 'bats_left');
                         tween = game.add.tween(sprite);

                         tween.to({ x: 300 }, 10000, "Linear", 0);
                         bats_left.animations.add('run');
                         bats_left.animations.play('run', 10, true);

                      } else if (endPoint.y - startPoint.y > minimum.distance) {
                        direction = 'bottom';

                      } else if (startPoint.y - endPoint.y > minimum.distance) {
                        direction = 'top';
                      }
                
                      if (direction) {
                        callback(direction);
                      }
                    }
                  }, this);
                };
      
                 console.log("test");
                 this.MAX_MISSILES = 50; // number of missiles

                 if (distance < 100) {
                   m.kill();
                   gameScore += 2;
                 }
             }

                this.getExplosion(m.x, m.y);
            }
        }, this);

        var that = this;
        if(!this.isGameOver){
            this.gameSpeed += .03;
            this.score.text = 'Score: ' + Math.floor(gameScore);
            
            this.currentFrame++;
            var moveAmount = this.gameSpeed / 100;
            this.game.physics.arcade.collide(this.caracter, this.platforms);
        }   
};