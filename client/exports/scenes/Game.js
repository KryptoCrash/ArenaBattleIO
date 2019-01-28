import Player from "../models/player.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    preload() {
        this.load.image('background', './client/assets/Test_Map.svg');
        this.load.svg('player', './client/assets/Character.svg');
    }
    create() {
        var background = this.physics.add.sprite(0, 0,'background');
        var cammy = this.cameras.main;
        var player = new Player(this, cammy);
        player.create();
        this.input.on('pointermove', (pointer) => {
            player.movePlayer(pointer.x, pointer.y);
        }, this);

    }
    update() {
        
    }

}
