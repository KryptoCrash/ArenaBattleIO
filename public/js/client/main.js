import Menu from './exports/scenes/Menu';
import Game from './exports/scenes/Game';

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