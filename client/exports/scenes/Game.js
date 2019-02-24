import Player from "../models/player.js";

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
        this.load.svg("arrow", "./client/assets/Archer_Arrow.svg");
        this.load.svg('archerHat', './client/assets/Archer_Hat.svg')
        this.load.svg('archerBow', './client/assets/Archer_Bow.svg')
    }
    create(data) {
        var background = this.physics.add.sprite(0, 0, "background").setScale(100,100);
        var cammy = this.cameras.main;
        this.player = new Player(this, cammy, data);
        this.player.init()
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
