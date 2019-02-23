var calcMoveWithAngle = require("../../events/calcMoveWithAngle");
let rotatePoint = require("../../events/rotatePoint");

module.exports = class Bullet {
    constructor(player, id) {
        this.player_id = player.id;
        this.id = id;
        let pos = rotatePoint(player.x, player.y, player.angle + Math.PI, player.x + player.props.hand1.x, player.y + player.props.hand1.y)
        this.angle = player.angle;
        this.x = pos.x;
        this.y = pos.y;
        this.vx = 0;
        this.vy = 0;
        this.type = player.hero.bullet;
        this.lifetime = player.hero.bullet.range; // milliseconds
    }
    shoot() {
        calcMoveWithAngle(this.angle, this, this.type.speed);
    }
};
