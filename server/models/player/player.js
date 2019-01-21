module.exports =  class Player {
    constructor(id,x,y){
        this.x = x;
        this.y = y;
        this.id = id;
    }
    static onConnect(io, socket) {
        let player;
        socket.on('newPlayer', (data) => {
            //socket.join(room);
            //socket.room = room;
            player = new Player(socket.id, data.x, data.y);
            let players = [];
            players.push[player];
            socket.emit('allPlayers', players);
            socket.emit('newPlayer', player);
        })
        socket.on('movePlayer', (data) => {
            socket.emit('movePlayer',socket.id, data.x, data.y);
        })
    }
}

/*UPDATE:
We are going to be unhackable.
The client will not be able to hack anything, but will purely be a screen for showing things.
EVERYTHING will be done server side. This includes movement, player position, and HP.

The only thing the client will do is show the data effectively, and send user input.
Anything else sent by the user is anthrax! Don't touch it!
Even the user input might be anthrax! Make sure to sanitize anything and everything.
*/
