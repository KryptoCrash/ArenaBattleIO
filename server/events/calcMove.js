module.exports = calcMove = async (x, y, gameObj, speed) => {
    let angle = Math.atan2(y - gameObj.y, x - gameObj.x);
    let velocity = await speed;
    gameObj.vx = velocity * Math.cos(angle);
    gameObj.vy = velocity * Math.sin(angle);
    return angle;
};
