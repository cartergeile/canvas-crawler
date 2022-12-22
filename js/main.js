// This is an extension/refactoring of the main branch of this repo
// more notes and comments are in the code on that branch
// this version incorporates smoother movement, more open ended collision detection
// aslo adding a second enemy to face, which creates a new win conditional

// requirements and goals
// make simple crawler game using canvas that we manipulate in js

// we need two entities, a hero and an ogre
// hero should move with WASD or ARROW keys(display hero cords)
// ogre(for now) will be stationary
// hero and first ogre should be able to collide to make something happen
// when the hero collides with  first ogre, ogre 1 is removed from the screen, and ogre 2 appears
//the game stops, sends a message to the user that they have won. 

// first grab our HTML elements for easy reference later
const game = document.getElementById('canvas')
const movement = document.getElementById('movement')
const status = document.getElementById('status')

// test if we got the right elements
// movement.innerText = 'some stuff'
// status.innerText = 'what up'

// need to SET the games context to be 2D
// also want to save that context to a variable for reference later
// this is how we tell code to work within the context of the canvas
const ctx = game.getContext('2d')

//console.log('game before setting w and h', game)
// need to get computed size of our canvas
// save that attribute to our canvas so we can refer to later
// once we have exact size of our canvas, we can use those dimensions to simulate movement in interesting ways
// these two lines will set the width and height attributes according to the way they look in your browser at the time code runs
game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
game.height = 360


//since these two objects are basically  the same, we can cretae a class to keep code DRY

class Ogre {
    constructor(x , y, width, height, color) {
      this.x = x 
      this.y = y 
      this.width = width 
      this.height = height
      this.color = color
      this.alive = true
      this.render = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
  }
}
class Hero {
  constructor(x , y, width, height, color) {
    this.x = x 
    this.y = y 
    this.width = width 
    this.height = height
    this.color = color
    this.alive = true
    // we need additional props on our hero class to make movement smoother
    this.speed = 15,
    // now well add direction, which will be set with our move handler
    this.direction = {
      up: false,
      down: false,
      left: false,
      right: false
    }
    // two other methods, tied to key events
    // one sets the direction, which sends our hero flying in that direction
    this.setDirection = function (key) {
      console.log('this is the key in setDirection', key)
      if (key.toLowerCase() == 'w') {this.direction.up = true }
      if (key.toLowerCase() == 'a') {this.direction.left = true }
      if (key.toLowerCase() == 's') {this.direction.down = true }
      if (key.toLowerCase() == 'd') {this.direction.right = true }
    }
    // the other unsets a direction, which stops our hero from moving in that dir
    this.unsetDirection = function (key) {
      console.log('this is the key in unsetDirection', key)
      if (key.toLowerCase() == 'w') {this.direction.up = false }
      if (key.toLowerCase() == 'a') {this.direction.left = false }
      if (key.toLowerCase() == 's') {this.direction.down = false }
      if (key.toLowerCase() == 'd') {this.direction.right = false }
    }
    // this is our new movementHandler, well get rid of old one
    // this will allow us to use the direction property on our hero object
    this.movePlayer = function () {
      // send our guy flying in whatever direction is true
      if (this.direction.up) {
        this.y -= this.speed
        // while were tracking movement, lets wall off our game grid
        if (this.y <= 0) {
          this.y = 0
        }
      }
      if (this.direction.left) {
        this.x -= this.speed
          if (this.x <= 0) {
            this.x = 0
          }
      }
      if (this.direction.down) {
        this.y += this.speed
        // to stop down and right directions, we again need to account for the size of our player
        if(this.y + this.height >= game.height) {
          this.y = game.height - this.height
        }
      }
      if (this.direction.right) {
        this.x += this.speed
        if(this.x + this.width >= game.width) {
          this.x = game.width - this.width
        }
      }
    }

    this.render = function () {
      ctx.fillStyle = this.color
      ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
}

const getRandomCoordinates = (max) => {
  // use math.random to get random number
  return Math.floor(Math.random() * max)
}
const player = new Hero (10, 10 ,16, 16, 'lightsteelblue')
const ogre = new Ogre (200, 50, 32, 48, '#bada55')
const ogre2 = new Ogre (getRandomCoordinates(game.width), getRandomCoordinates(game.height), 64, 96, 'red')

//player.render()
//ogre.render()


// MOVEMENT HANDLER //


// COLLISION DETECTION//
// here, well detect a hit between entities
// to accurately do this, we need to account for for the entire space that one entity takes up
// this means using the player x, y, width and height
// this also means using the ogre x, y, w, h
const detectHit = (thing) => {
  // well basically use a big if statement, to be abkle to tell if any of the sides of our hero interact with any of the sides of our ogre
  if (player.x < thing.x + thing.width
      && player.x + player.width > thing.x
      && player.y < thing.y + thing.height
      && player.y + player.height > thing.y) {
        console.log('HIT!')
        thing.alive = false
    }
}



// GAMELOOP //
// game loop that runs our animation
// atached to an interval
// function will run every interval (amount of ms)
// this is how we will animate our game

const gameLoop = () => {
  // no console logs
  //console.log('the game is running')
  //for testing, its ok to have them, final product shouyld not have them
  // putting our hit detection at the top so it takes precedent
  // to reseble movement, we should clear the old canvas every loop
  // then instead of drawing a snake because its maintaning all the old     positions of our character
  // well just see our player square moving
  ctx.clearRect(0, 0, game.width, game.height)
  if (ogre.alive) {
      ogre.render()
      detectHit(ogre)
  } else if (ogre2.alive) {
    status.textContent ='Now kill Ogre 2'
    ogre2.render()
    detectHit(ogre2)
  } else {
    status.textContent = 'YOU WIN!'
    stopGameLoop()
  }
  
player.render() 
player.movePlayer()
movement.textContent = `${player.x}, ${player.y}`
}

// EVENT LISTENERS //

// one key event for a keydown
// keydown will set players direction
document.addEventListener('keydown', (e) => {
  //when a key is pressed, set approp direc
  player.setDirection(e.key)
})
//one key event for a keyup
// keyup will unset direction
document.addEventListener('keyup', (e) => {
  // when a key is release , call undirection
  //this is handled in a slightly different way
  if(['w', 'a', 's', 'd'].includes(e.key)) {
    player.unsetDirection(e.key)
  }
})

// were going to save our game interval to a variable so we can stop it when we want to
// this interval runs the game every 60 ms until we tell it to stop
const gameInterval = setInterval(gameLoop, 60)
// fn that stops the game loop 
const stopGameLoop = () => {
  clearInterval(gameInterval)
}

// here well add event listener, when DOM content loads, run the game on an intervcal
// eventually this event will have more in it
document.addEventListener('DOMContentLoaded', function() {
  
  // here is our gameloop interval
})