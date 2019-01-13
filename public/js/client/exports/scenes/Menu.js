export default class Menu extends Phaser.Scene {
    constructor() {
        super('Menu')
    }
    preload() {
        this.load.image('start', "");
    }
    create() {
        var startButton = this.add.sprite(400, 400, 'start').setInteractive()
        startButton.on('pointerDown', () => {
            this.cameras.main.fade()
            this.scene.start('Game')
        })
    }
    update() {

    }
}