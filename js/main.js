// requirements and goals
// make simple crawler game using canvas that we manipulate in js

// we need two entities, a hero and an ogre
// hero should move with WASD or ARROW keys(display hero cords)
// ogre(for now) will be stationary
// hero and ogre should be able to collide to make something happen
// when the hero collides with ogre, ogre is removed from the screen, the game stops, sends a message to the user that they have won. 

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

// console.log('this is game after setting w and h')
// console.log(game)

// const hero = {
//   x: 10,
//   y: 10,
//   color: 'hotpink',
//   width: 20,
//   height: 20,
//   alive: true,
//   render: function () {
//     // we can use built in canvas methods for drawing basic shapes
//     ctx.fillStyle = this.color
//     ctx.fillRect(this.x, this.y, this.width, this.height)
//   }

//}

// const ogre = {
//   x: 200,
//   y: 100,
//   color: 'green',
//   width: 60,
//   height: 120,
//   alive: true,
//   render: function () {
//     ctx.fillStyle = this.color
//     ctx.fillRect(this.x, this.y, this.width, this.height)
//   }
// }

//since these two objects are basically  the same, we can cretae a class to keep code DRY

class Crawler {
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
const player = new Crawler (10, 10 ,16, 16, 'lightsteelblue')
const ogre = new Crawler (200, 60, 32, 48, '#bada55')

// player.render()
// ogre.render()


// MOVEMENT HANDLER //
// tells our code how and when to move our player around
// tied to an event listener for key events
const movementHandler = (e) => {
  // here the e stands for 'event' -> specifically will be a keydown
  // were going to use keycodes to tell it to do different movements for diff keys
  // here are some basic key codes:
  // w = 87, a = 65, s = 83, d = 68
  // up = 38, left = 37, down = 40, right = 39
  // by linking these keycodes to a function (codeblock)
  // we can tell them to change the player x or y values
  console.log('what is e?\n', e.keyCode)
  // conditional statements if keycode === something do something if keycode === somethingELse do somethingELse
  // could build giant if else for this
  // im going to use switch case instead
  //switch is my condition, opens up multitude of cases
  switch (e.keyCode) {
    //move up
    case (87):
      //moves player up 10px every press
      player.y  -= 10
      // need the break keyword so we can move to another case if necessary
      break
    //move left
    case (65):
      player.x -= 10
      break
    //move down
    case (83):
      player.y +=10
      break
    //move right
    case (68):
      player.x += 10
      break
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
  player.render()
  movement.textContent = `${player.x}, ${player.y}`

  if (ogre.alive) {
    ogre.render()
  }
}



// here well add event listener, when DOM content loads, run the game on an intervcal
// eventually this event will have more in it
document.addEventListener('DOMContentLoaded', function() {
  // this is where ill link up the movementHandler event
  document.addEventListener('keydown', movementHandler)
  // here is our gameloop interval
  setInterval(gameLoop, 60)
})