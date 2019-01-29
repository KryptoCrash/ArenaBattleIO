export default class Player {
    constructor(scene, camera) {
        this.x = 500;
        this.y = 500;
        this.socket = io.connect('http://localhost:8000');
        this.scene = scene;
        this.players = {};
        this.cammy = camera;
    }
    create() {
    this.socket.on('allPlayers', (data) => {
            console.log(data)
            Object.keys(data).forEach((key) => {
                var val = data[key];
                this.addPlayer(key,val.x,val.y)
            });
            //ERROR: this.players[this.socket.id] is not a game object.  
        })
        /*this.socket.on('movePlayer', (data)=> {
            console.log(data)
            this.players[data.id].x = data.x
            this.players[data.id].y = data.y
        })*/
        //Doesnt work as intended. Could be that player.create() must be run multiple times.
        this.socket.on('disconnect', (data) => {
            this.players[data.id].destroy();
            delete this.players[data.id];
        })
    }
    addPlayer(id, x, y) {
        this.players[id] = this.scene.physics.add.sprite(x, y, 'player');
        console.log('confirmed')
    }
    movePlayer(pointer) {
        this.scene.physics.moveToObject(this.players[this.socket.id],pointer)
        this.socket.emit('movePlayer', this.players[this.socket.id].x, this.players[this.socket.id].y);
    }
}