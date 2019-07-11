import * as ex from 'excalibur'

var game = new ex.Engine({
    displayMode: ex.DisplayMode.FullScreen,
    backgroundColor: ex.Color.fromHex('#000000')
});
// create an asset loader
//var loader = new ex.Loader();
//var resources = {
///* include resources here */
////txPlayer: new ex.Texture("assets/tex/player.png")
//};
//// queue resources for loading
//for (var r in resources) {
//    loader.addResource(resources[r]);
//}


var paddle = new ex.Actor(150, game.drawHeight - 40, 200, 20)

// Let's give it some color with one of the predefined
// color constants
paddle.color = ex.Color.Chartreuse

// Make sure the paddle can partipate in collisions, by default excalibur actors do not collide
paddle.collisionType = ex.CollisionType.Passive

// `game.add` is the same as calling
// `game.currentScene.add`
game.add(paddle)

game.input.pointers.primary.on('move', function(evt) {
  paddle.pos.x = evt.target.lastWorldPos.x
  paddle.pos.y = evt.target.lastWorldPos.y
})



var ball = new ex.Actor(100, 300, 20, 20)
ball.color = ex.Color.Red
ball.collisionType = ex.CollisionType.Passive
ball.vel.setTo(100, 100)

ball.on('precollision', function(ev) {
    // reverse course after any collision
    // intersections are the direction body A has to move to not be clipping body B
    // `ev.intersection` is a vector `normalize()` will make the length of it 1
    // `negate()` flips the direction of the vector
    var intersection = ev.intersection.normalize()
  
    // The largest component of intersection is our axis to flip
    if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
      ball.vel.x *= -1
    } else {
      ball.vel.y *= -1
    }
  })

game.add(ball)


// uncomment loader after adding resources
game.start( /* loader */).then(function () {
    // start your game!
});

export default game
