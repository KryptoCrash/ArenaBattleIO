export default class Game extends Phaser.Scene {
    constructor() {
        super('Game')
    }
    preload() {
        this.load.svg('background', './client/assets/Character_Hand.svg');
        this.load.svg('player', './client/assets/Character.svg');
    }
    create() {
        var background = this.physics.add.sprite(0,0,'background');
        var player = this.physics.add.sprite(300,300,'player');
        var cammy = this.cameras.main;
        cammy.startFollow(player);
        this.input.on('pointermove', (pointer) => {
            this.physics.moveTo(player, pointer.x+cammy.scrollX, pointer.y+cammy.scrollY);
        }, this)

    }
    update() {
        
    }

}
