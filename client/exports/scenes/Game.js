import Player from "../models/player.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super("Game");
        var player;
    }
    preload() {
        this.load.image("background", "./client/assets/backgroundtest.png");
        this.load.svg("player", "./client/assets/Character.svg");
    }
    create() {
        var background = this.physics.add.sprite(0, 0, "background");
        var cammy = this.cameras.main;
        this.player = new Player(this, cammy);
        this.input.on("pointermove", pointer => {
            this.player.movePlayer(pointer);
        }, this);
    }
    update() {
        this.player.create();
    }
}
