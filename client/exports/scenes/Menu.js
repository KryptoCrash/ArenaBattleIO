export default class Menu extends Phaser.Scene {
    constructor() {
        super('Menu')
    }
    preload() {
       this.load.svg('startButton', )
    }
    create() {
    var cammy = this.cameras.main;
    var startButton = this.physics.add.image(cammy.scrollX+300, cammy.scrollY+300, 'startButton');
    
    }
    update() {

    }
}