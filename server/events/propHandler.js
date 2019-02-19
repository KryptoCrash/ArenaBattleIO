module.exports = function(players) {
    var player;
    Object.keys(players).forEach(id => {
        player = players[id];
    });
    return player.props;
}
