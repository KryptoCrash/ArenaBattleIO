module.exports = function rotatePoint(cx, cy, angle, px, py) {
    let s = Math.sin(angle);
    let c = Math.cos(angle);

    // translate point back to origin:
    px -= cx;
    py -= cy;

    // rotate point
    let xnew = px * c - py * s;
    let ynew = px * s + py * c;

    // translate point back:
    px = xnew + cx;
    py = ynew + cy;
    return {x: px, y: py};
}