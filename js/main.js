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

console.log('game before setting w and h', game)
// need to get computed size of our canvas
// save that attribute to our canvas so we can refer to later
// once we have exact size of our canvas, we can use those dimensions to simulate movement in interesting ways
// these two lines will set the width and height attributes according to the way they look in your browser at the time code runs
game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
game.height = 360

console.log('this is game after setting w and h')
console.log(game)

const hero = {
  x: 10,
  y: 10,
  color: 'hotpink',
  width: 20,
  height: 20,
  alive: true,
  render: function () {
    // we can use built in canvas methods for drawing basic shapes
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

}

const ogre = {
  x: 200,
  y: 100,
  color: 'green',
  width: 60,
  height: 120,
  alive: true,
  render: function () {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

hero.render()
ogre.render()