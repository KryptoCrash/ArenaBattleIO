var calcMoveWithAngle = require("../../events/calcMoveWithAngle");
module.exports = class Bullet {
    constructor(player) {
        this.id=player.id;
        this.angle = player.angle;
        this.x = player.x;
        this.y = player.y;
        this.vx = 0;
        this.vy = 0;
        this.type = player.hero.bullet;
        this.lifetime = player.hero.bullet.range; // milliseconds
    }
    shoot() {
        calcMoveWithAngle(this.angle, this, this.type.speed);
    }
};
