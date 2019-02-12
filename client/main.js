import Menu from "./exports/scenes/Menu.js";
import Game from "./exports/scenes/Game.js";

var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth*window.devicePixelRatio,
        height: window.innerHeight*window.devicePixelRatio
    },
    physics: {
        default: "arcade"
    },
    arcade: {
        debug: false
    },
    scene: [Game, Menu]
};

var game = new Phaser.Game(config);
