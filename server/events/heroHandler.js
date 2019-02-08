var Archer = require("../models/heros/Archer");
module.exports = function heroHandler(hero) {
    try {
        if (hero == "archer") {
            return new Archer();
        }
    } catch (err) {
        console.log(err);
    }
};
