import Menu from './exports/scenes/Menu';
import Game from './exports/scenes/Game';
//hey, are you online?
//I need help setting up the player
//I will join in on my PC But I may need to go soon, got something up on here
//k
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade'
    },
    arcade: {
        debug: false
    },
    scene: [Menu, Game]
};

var game = new Phaser.Game(config);
