export default class Player {
    constructor(scene, camera){
        this.x = 0;
        this.y = 0;
        this.socket = io();
        this.scene = scene;
        this.players = {};
        this.cammy = camera;
    }
    create() {
    this.socket.emit('newPlayer', this.x, this.y)
    this.socket.on('newPlayer', (data) => {
        this.addPlayer(data.id,data.x,data.y);
    })
    this.socket.on('allPlayers', (data) => {
        data.forEach((player) => {
            this.addPlayer(player.id, player.x, player.y);
        });
        
    })
    this.cammy.startFollow(this.players[this.socket.id]);
    this.socket.on('movePlayer', (data) => {
        this.scene.physics.moveTo(this.players[data.id], data.x, data.y);
    })
    this.socket.on('disconnect', (data) => {
        this.players[data.id].destroy();
        delete this.players[data.id];
    })
    }
    addPlayer(id,x,y) {
        this.players[id] = this.scene.physics.add.sprite(x,y,'player');
    }
    movePlayer(x,y) {
        this.socket.emit('movePlayer', x,y);
    }
}