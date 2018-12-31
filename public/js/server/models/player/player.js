export default class Player {
    
    constructor(id, x, y, hero, angle) {
        super(id,x,y,hero,angle);
    }

    static onConnect(io, socket){
        var player;
        socket.join(room);
        room = socket.room;
    }
    
    static onMove(){

    }
    
    static onDisconnect(io, socket){
        
    }
}

/*The player will be on a randomly generated point, given that the point is not in/near existing objects such as other play
WIbOnce that happens, moving will be done client side, and sent over. We will ceheck if moving lsuch movement is valid,
and if not, bakithe player will be kicked. Each movement will be sent with a tiemestamp. If the player can move 5 units
per second, and the client tells us it moved 10 units in a second, we can kick them without worry.

If they disconnect, their data will be deleted, the socket will be closeomed, and we'll update everybody else.
Every tick updates other players of users within viewing distance, preventing world map viewing*/