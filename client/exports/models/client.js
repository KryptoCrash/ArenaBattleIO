import Player from "./player.js";
export default class Client {
    constructor(scene, camera) {
        this.x = 500;
        this.y = 500;
        this.socket = io.connect("http://localhost:8000");
        this.scene = scene;
        this.players = {};
        this.weapons = {};
        this.cammy = camera;
    }
    update() {
        this.cammy.setViewport(
            0,
            0,
            this.scene.scale.width,
            this.scene.scale.height
        );
        this.socket.emit("heroChange", "scout");
        this.socket.on("allPlayers", async data => {
            Object.keys(data).forEach(key => {
                var val = data[key];
                this.add(
                    { id: key, x: val.x, y: val.y, type: { name: "player" } },
                    this.players
                );
            });
            await this.cammy.startFollow(this.players[this.socket.id]);
        });
        // this.socket.on("allProps", async data => {
        //     await Object.keys(data).forEach(prop => {
        //         var val = data[prop];
        //         this.add(
        //             { val: val, prop: prop, type: { name: "prop" } },
        //             this.players[val.id]
        //         );
        //     });
        // });
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
            Object.keys(data).forEach(async id => {
                let deg = data[id].angle * (180 / Math.PI) + 90;
                this.players[id].x = await data[id].x;
                this.players[id].y = await data[id].y;
                await this.players[id].props.body.setAngle(deg);
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
            this.players[id].props.body.destroy();
            delete this.players[id];
        });
    }
    async add(data, gameObj) {
        if (!gameObj[data.id]) {
            if (data.type.name == "dagger") {
                gameObj[data.id] = this.scene.physics.add
                    .sprite(data.x, data.y, "dagger")
                    .setAngle(data.angle * (180 / Math.PI) + 90)
                    .setScale(0.4, 0.4);
            } else if (data.type.name == "player") {
                let playerProps = [];
                console.log(data)
                for (let key in data.props) {
                    if (data.props.hasOwnProperty(key)) {
                        let prop = data.props[key];
                        playerProps.push(
                            this.scene.physics.add.sprite(prop.x, prop.y, prop.name).setScale(prop.scalex, prop.scaley)
                        );
                    }
                }
                gameObj[data.id] = this.scene.add.container(
                    data.x,
                    data.y,
                    playerProps
                );
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
