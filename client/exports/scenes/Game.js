import Player from "../models/player.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super("Game");
    }
    preload() {
        this.load.svg("background", "./client/assets/Test_Map.svg");
        this.load.svg("player", "./client/assets/Character.svg");
        this.load.svg('dagger', './client/assets/Thief_Dagger.svg')
    }
    create() {
        var background = this.physics.add.sprite(0, 0, "background");
        var cammy = this.cameras.main;
        this.player = new Player(this, cammy);
        this.input.on(
            "pointermove",
            pointer => {
                this.player.movePlayer(pointer);
            },
            this
        );
        this.input.on("pointerdown", pointer => {
            this.player.shoot(pointer);
        });
    }
    update() {
        this.player.update();
    }
}
