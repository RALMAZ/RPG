<template>
  <div>
    <div class="game"/>
    <div class="ui"/>
  </div>
</template>

<script>
import EasyStar from 'easystarjs';

/*
  @TODO
  - Render map to Vuex
  - minimap
  - Events tiles
  ....
  - add hero (wasd)
  - add npc
  - UI/UX (items, hp bars), ElemeFE
  - EasyStart AI walk
  - Context menu
*/

export default {
  name: 'home',
  data() {
    return {
      assets: {
				//images: {
				//	"grass": "https://i.postimg.cc/JhCQL02M/tiles-ground.png",
				//	"stone": "https://i.postimg.cc/q7cxMrPn/tiles-ground2.png",
				//},
			}
    }
  },
  computed: {
    levelData() {
      return store.state.levels.home
    }
  },
  mounted() {
    this.initGame();
  },
  methods: {
    // Init game engine
    initGame() {
			Crafty.init();
			Crafty.load(this.assets, // preload assets
    		() => {
					Crafty.sprite(128, "https://i.postimg.cc/YSW3WgT5/tiles-ground.png", {
    				tilesGround: [0,0]
					});

					Crafty.sprite(128, "https://i.postimg.cc/ZRzLFnSC/tiles-ground2.png", {
    				tilesGround2: [0,0]
					});

					Crafty.sprite(128, "https://i.postimg.cc/cHVBhc87/tiles-three.png", {
    				three: [0,0]
					});

	    		var iso = Crafty.isometric.size(72);
	    		var z = 0;
	    		for(var i = 20; i >= 0; i--) {
	    			for(var y = 0; y < 20; y++) {
							var which = Crafty.math.randomInt(0,1);
							var zet = i+1 * y+1;
	    				var tile = Crafty.e("2D, Canvas, "+ (!which ? "tilesGround" : "tilesGround2") +", Mouse")
	    				.attr('z', zet)
      		    .bind("Click", (e) => {
								var three = Crafty.e("2D, Canvas, three, Mouse").attr('z', zet);
								iso.place(i, y, zet, three);
      		      //console.log(e.button);
	    					//this.destroy();
	    				}).bind("MouseOver", () => {

							}).bind("MouseOut", () => {
	    					
	    				});

	    				iso.place(i, y, 0, tile);
	    			}
	    		}

	    		Crafty.addEvent(this, Crafty.stage.elem, "mousedown", function(e) {
	    			if(e.button > 1) return;
	    			var base = {x: e.clientX, y: e.clientY};

	    			function scroll(e) {
	    				var dx = base.x - e.clientX,
	    					dy = base.y - e.clientY;
	    					base = {x: e.clientX, y: e.clientY};
	    				Crafty.viewport.x -= dx;
	    				Crafty.viewport.y -= dy;
	    			};

	    			Crafty.addEvent(this, Crafty.stage.elem, "mousemove", scroll);
	    			Crafty.addEvent(this, Crafty.stage.elem, "mouseup", function() {
	    				Crafty.removeEvent(this, Crafty.stage.elem, "mousemove", scroll);
	    			});
	    		});

				}
			);
    },

  }
}
</script>

<style>
body {
  margin: 0;
}
</style>
