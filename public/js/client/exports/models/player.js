var socket = io();
export default class Player {
    movePlayer(x,y) {
        
        socket.emit('move', () => {
            targx: x
            targy: y
        })
    }
}