export default class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");
    }
    preload() {
        this.load.svg("startButton", './client/assets/Test_Map.svg');
    }
    create() {
        var cammy = this.cameras.main;
        var startButton = this.physics.add.image(
            this.scale.width/2,
            this.scale.height/2,
            "startButton"
        ).setInteractive();
        startButton.on('pointerdown', ()=>{
                this.scene.start('Game')
        })
    }
    update() {

    }
}
