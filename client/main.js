import Menu from "./exports/scenes/Menu.js";
import Game from "./exports/scenes/Game.js";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade"
    },
    arcade: {
        debug: false
    },
    scene: [Game, Menu]
};

var game = new Phaser.Game(config);
