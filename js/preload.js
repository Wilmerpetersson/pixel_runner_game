var width = window.innerWidth;
var height = window.innerHeight > 280 ? 266 : window.innerHeight;
var gameScore = 0;
var highScore = 0;
var superAttack = false;
var tween;

var GameState = function(game) {
    this.MAX_MISSILES = 120;
};

GameState.prototype.preload = function() {
    this.game.load.spritesheet('caracter', 'caracter_two.png', 36.1, 52);
    this.game.load.spritesheet('bat', 'bat.png', 46.1, 45);
    this.game.load.image('bg', 'bg.jpg');
    //this.game.load.image("logo", "game");
    this.game.load.image("instructions", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/instructions.png");
    this.game.load.image("game-over", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/game-over.png");
    this.game.load.image("startbtn", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/start-btn.png");
    this.game.load.image("playbtn", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/play-btn.png");
    this.game.load.image("restartBtn", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/restart-btn.png");
    this.game.load.image('superAttack', 'superAttack.png');
    this.game.load.spritesheet('rocket', 'bat.png', 46.1, 45);
    this.game.load.spritesheet('explosion', '/assets/blood_splatt.png', 128, 128);
};