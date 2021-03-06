module.exports = class Player {
    constructor(id, x, y, hero) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.vx = 0;
        this.vy = 0;
        this.hero = hero;
        this.angle = 0;
        this.type = {
            name: 'player'
        }
        this.props = {
            body: {
                x: 0,
                y: 0,
                id: this.id,
                angle: 0,
                vx: 0,
                vy: 0,
                scalex: 1,
                scaley: 1,
                name: 'body'
            },
            hand1: {
                x: -40,
                y: -40,
                id: this.id,
                angle: 0,
                vx: 0,
                vy: 0,
                scalex: 1.5,
                scaley: 1.5,
                name: 'hand1'
            },
            hand2: {
                x: 40,
                y: -40,
                id: this.id,
                angle: 0,
                vx: 0,
                vy: 0,
                scalex: 1.5,
                scaley: 1.5,
                name: 'hand2'
            },
            hat: {
                x: 0,
                y: 0,
                id: this.id,
                angle: 0,
                vx: 0,
                vy: 0,
                scalex: 1,
                scaley: 1,
                name: `${hero.name}Hat`
            },
            weapon: {
                x: 40,
                y: -40,
                id: this.id,
                angle: 0,
                vx: 0,
                vy: 0,
                scalex: 0.5,
                scaley: 0.5,
                name: this.hero.weapon.name
            }
        }
    }
};
/*UPDATE:
We are going to be unhackable.
The client will not be able to hack anything, but will purely be a screen for showing things.
EVERYTHING will be done server side. This includes movement, player position, and HP.

The only thing the client will do is show the data effectively, and send user input.
Anything else sent by the user is anthrax! Don't touch it!
Even the user input might be anthrax! Make sure to sanitize anything and everything.
*/
