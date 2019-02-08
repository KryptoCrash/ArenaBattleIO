export default class Player {
    constructor(scene, camera) {
        this.x = 500;
        this.y = 500;
        this.socket = io.connect("http://localhost:8000");
        this.scene = scene;
        this.players = {};
        this.cammy = camera;
    }
    update() {
        this.socket.emit("heroChange", "archer");
        this.socket.on("allPlayers", data => {
            Object.keys(data).forEach(key => {
                var val = data[key];
                this.addPlayer(key, val.x, val.y);
            });
            this.cammy.startFollow(this.players[this.socket.id]);
        });
        this.socket.on("newPlayer", data => {
            this.addPlayer(data.id, data.x, data.y);
        });
        this.socket.on("update", data => {
            Object.keys(data).forEach(id => {
                this.players[id].x = data[id].x;
                this.players[id].y = data[id].y;
            });
        });
        this.socket.on("disconnect", data => {
            this.players[data.id].destroy();
            delete this.players[data.id];
        });
    }
    addPlayer(id, x, y) {
        if (!this.players[id]) {
            this.players[id] = this.scene.physics.add.sprite(x, y, "player");
        }
    }
    movePlayer(pointer) {
        this.socket.emit("movePlayer", pointer.worldX, pointer.worldY);
        this.socket.emit("shoot", pointer.worldX, pointer.worldY);
    }
}
