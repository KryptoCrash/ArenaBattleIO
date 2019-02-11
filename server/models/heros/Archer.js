module.exports = class Archer {
    constructor() {
        this.speed = 100;
        this.bullet = {
            speed: 1000,
            fireRate: 60,
            range: 1000,
            name: 'arrow'
        };
    }
};
