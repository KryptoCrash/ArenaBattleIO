var Archer = require("../models/heros/Archer");
var Scout = require("../models/heros/Scout");
module.exports = function heroHandler(hero) {
    try {
        if (hero == "archer") {
            return new Archer();
        } else if (hero == "scout") {
            return new Scout();
        }
    } catch (err) {
        console.log(err);
    }
};
