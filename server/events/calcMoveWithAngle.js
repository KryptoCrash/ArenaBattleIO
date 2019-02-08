module.exports = calcMove = async (angle, gameObj, speed) => {
    let velocity = await speed;
    gameObj.vx = velocity * Math.cos(angle);
    gameObj.vy = velocity * Math.sin(angle);
};
