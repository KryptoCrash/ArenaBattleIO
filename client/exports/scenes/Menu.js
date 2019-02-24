export default class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");
    }
    preload() {
        this.load.svg("startButton", './client/assets/Test_Map.svg');
    }
    create() {
        var cammy = this.cameras.main;
        var scoutButton = this.physics.add.image(
            this.scale.width/3,
            this.scale.height/2,
            "startButton"
        ).setInteractive();
        var archerButton = this.physics.add.image(
            this.scale.width * (2/3),
            this.scale.height/2,
            "startButton"
        ).setInteractive();
        scoutButton.on('pointerdown', ()=>{
                this.scene.start('Game', 'scout')
        })
        archerButton.on('pointerdown', ()=>{
            this.scene.start('Game', 'archer')
    })
    }
    update() {

    }
}
