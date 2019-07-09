// Generic class for all game pieces
class Sprite {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed
        this.sprite = "";
    }
    
    // Method to render/ create image on canvas
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}

// Enemies our player must avoid
class Enemy extends Sprite {
    constructor(x, y, speed) {
        super(x, y, speed);
        this.sprite = 'images/enemy-bug.png';
    }

    // Update enemy locations based on time passed
    // Check if player and enemy collide, reset player position is collision happens
    // Input: dt: time passed between updates
    update(dt) {
        this.x += dt * this.speed;
        if (this.x > 580) {
            this.x = -100
            if (this.speed < 150) {
            this.speed += 25
            }
        }
        if (player.x < this.x + 50 &&
            player.x + 25 > this.x &&
            player.y < this.y + 25 &&
            player.y + 50 > this.y) {
                player.reset()
        }
    }
}

// Now write your own player class
class Player extends Sprite {
    constructor(x, y, speed) {
        super(x, y, speed)
        this.sprite = 'images/char-boy.png';
    }

    update() {}

    // Reset player position to starting point on canvas
    reset() {
        this.x = 202;
        this.y = 380;
    }

    // Respond to user inputs, move player accordingly
    // If player reaches opposite side, reset game
    handleInput(direction) {
        if (direction == 'up' && this.y > 0) {
            this.y -= 83
            if (this.y < 0) {
                player.reset
            }
        }
        else if (direction == 'down' && this.y < 380) {
            this.y += 83
        }
        else if (direction == 'left' && this.x > 0) {
            this.x -= 101;
        }
        else if (direction == 'right' && this.x < 404) {
            this.x += 101;
        }
    }
  
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
for (let i = 0; i < 3; i++) {
    let speed = Math.random() * (175 - 75) + 75
    let newEnemy = new Enemy(-100, 83 * i + 60, speed);
    allEnemies.push(newEnemy);
}

let player = new Player(202, 380, 2);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
