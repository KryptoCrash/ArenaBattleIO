import Client from "../models/client.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super("Game");
    }
    preload() {
        this.load.svg("background", "./client/assets/Map.svg");
        this.load.svg("body", "./client/assets/Character.svg");
        this.load.svg("hand1", "./client/assets/Character_Hand.svg");
        this.load.svg("hand2", "./client/assets/Character_Hand.svg");
        this.load.svg('dagger', './client/assets/Thief_Dagger.svg')
        this.load.svg('hat', './client/assets/Archer_Hat.svg')
    }
    create() {
        var background = this.physics.add.sprite(0, 0, "background").setScale(100,100);
        var cammy = this.cameras.main;
        this.player = new Client(this, cammy);
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
