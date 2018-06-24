GameState.prototype.create = function() {
       // Set stage background to something sky colored
       this.bg = this.game.add.tileSprite(0, 0, width, height, 'bg');
       // Create a group to hold the missile
       this.missileGroup = this.game.add.group();

       // Create a group for explosions
       this.explosionGroup = this.game.add.group();

       // Simulate a pointer click/tap input at the center of the stage
       // when the example begins running.
       highScore = gameScore > highScore ? Math.floor(gameScore) : highScore;
       gameScore = 0; 
       this.currentFrame = 0;
       this.particleInterval = 2 * 60;
       this.gameSpeed = 280;
       this.isGameOver = false;
       this.game.physics.startSystem(Phaser.Physics.ARCADE);

       this.music = this.game.add.audio("drivin-home");
       this.music.loop = true;
       this.music.play();
       
       this.bg.fixedToCamera = true;
       this.bg.autoScroll(-this.gameSpeed / 6, 0);
       
       
       this.emitter = this.game.add.emitter(this.game.world.centerX, -32, 50);

       this.caracter = this.game.add.sprite(110, this.game.world.height - 100, 'caracter');
       this.caracter.animations.add("run");
       this.caracter.animations.play('run', 14, true);

       this.game.physics.arcade.enable(this.caracter);

       this.caracter.body.gravity.y = 1500;
       this.caracter.body.collideWorldBounds = true;
           
       this.bat = this.game.add.sprite(130, this.game.world.height - 125, 'bat');
       this.bat.animations.add("run");
       this.bat.animations.play('run', 11, true);

       this.emitter.maxParticleScale = .02;
       this.emitter.minParticleScale = .001;
       this.emitter.setYSpeed(100, 200);
       this.emitter.gravity = 0;
       this.emitter.width = this.game.world.width * 1.5;
       this.emitter.minRotation = 0;
       this.emitter.maxRotation = 40;

       this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
       this.emitter.start(false, 0, 0);
       this.score = this.game.add.text(20, 20, '', { font: "24px Arial", fill: "white", fontWeight: "bold" });
        
          if(highScore > 0){
            this.highScore = this.game.add.text(20, 45, 'Best: ' + highScore, { font: "18px Arial", fill: "white" });
          }
        };