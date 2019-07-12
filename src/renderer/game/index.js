import * as ex from 'excalibur'

var game = new ex.Engine({
    displayMode: ex.DisplayMode.FullScreen,
    backgroundColor: ex.Color.fromHex('#FFFFFF')
});

// create an asset loader
var loader = new ex.Loader();
var resources = {
/* include resources here */
//txPlayer: new ex.Texture("assets/tex/player.png")
};
// queue resources for loading
for (var r in resources) {
    loader.addResource(resources[r]);
}

// uncomment loader after adding resources
game.start( /* loader */).then(function () {
    // start your game!
});

export default game
