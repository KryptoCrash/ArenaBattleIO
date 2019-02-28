module.exports = class Scout {
    constructor() {
        this.speed = 400;
        this.name = "scout";
        this.bullet = {
            speed: 1000,
            fireRate: 90,
            range: 500,
            name: "dagger"
        };
        this.weapon = {
            name: 'dagger'
        }
    }
};
