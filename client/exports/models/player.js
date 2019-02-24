export default class Player {
    constructor(scene, camera, heroType) {
        this.x = 500;
        this.y = 500;
        this.socket = io.connect("http://localhost:8000", {query: `hero=${heroType}`});
        this.scene = scene;
        this.players = {};
        this.weapons = {};
        this.cammy = camera;
        this.heroType = heroType;
    }
    init() {
        this.socket.emit("heroChange", this.heroType);
    }
    update() {
        this.cammy.setViewport(
            0,
            0,
            this.scene.scale.width,
            this.scene.scale.height
        );
        this.socket.on("allPlayers", data => {
            Object.keys(data).forEach(key => {
                var val = data[key];
                this.add(val, this.players);
            });
            this.cammy.startFollow(this.players[this.socket.id]);
        });
        this.socket.on("newPlayer", data => {
            this.add(data, this.players);
        });
        this.socket.on("newWeapon", data => {
            this.add(data, this.weapons);
        });
        this.socket.on("allWeapons", data => {
            Object.keys(data).forEach(key => {
                var val = data[key];
                this.add(key, val.x, val.y, this.weapons);
            });
        });
        this.socket.on("update", data => {
            Object.keys(data).forEach(id => {
                let deg = data[id].angle * (180 / Math.PI) + 90;
                this.players[id].x = data[id].x;
                this.players[id].y = data[id].y;
                this.players[id].setAngle(deg);
            });
        });
        this.socket.on("updateWeapons", data => {
            Object.keys(data).forEach(id => {
                let deg = data[id].angle * (180 / Math.PI) + 90;
                this.weapons[id].x = data[id].x;
                this.weapons[id].y = data[id].y;
                this.weapons[id].setAngle(deg);
            });
        });
        this.socket.on("removeWeapon", id => {
            this.weapons[id].destroy();
            delete this.weapons[id];
        });
        this.socket.on("disconnect1", id => {
            this.players[id].destroy();
            delete this.players[id];
        });
    }
    async add(data, gameObj) {
        if (!gameObj[data.id]) {
            if (data.type.name === null || data.type.name === undefined)
                return "ERROR: No Input";
            if (data.type.name == "player") {
                let playerProps = [];
                for (let key in data.props) {
                    if (data.props.hasOwnProperty(key)) {
                        let prop = data.props[key];
                        playerProps.push(
                            this.scene.physics.add
                                .sprite(prop.x, prop.y, prop.name)
                                .setScale(prop.scalex, prop.scaley)
                        );
                    }
                }
                gameObj[data.id] = this.scene.add.container(
                    data.x,
                    data.y,
                    playerProps
                );
            } else {
                gameObj[data.id] = this.scene.physics.add
                    .sprite(data.x, data.y, data.type.name)
                    .setAngle(data.angle * (180 / Math.PI) + 90)
                    .setScale(0.5, 0.5);
            }
        }
    }
    movePlayer(pointer) {
        this.socket.emit("movePlayer", pointer.worldX, pointer.worldY);
    }
    shoot(pointer) {
        this.socket.emit("shoot", pointer.worldX, pointer.worldY);
    }
}
