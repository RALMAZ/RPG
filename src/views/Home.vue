<template>
  <div>
    <div class="game"/>
    <div class="ui"/>
  </div>
</template>

<script>
import Phaser, { Scene, Game } from 'phaser';
import IsoPlugin from 'phaser3-plugin-isometric';
import EasyStar from 'easystarjs';


class IsoInteractionExample extends Scene {
  constructor() {
    const sceneConfig = {
      key: 'IsoInteractionExample',
      mapAdd: { isoPlugin: 'iso' }
    };

    super(sceneConfig);
  }

  preload() {
    this.load.image('tile', 'https://i.postimg.cc/BQd4NN41/tile.png'); // https://i.postimg.cc/BQd4NN41/tile.png
    this.load.scenePlugin({
      key: 'IsoPlugin',
      url: IsoPlugin,
      sceneKey: 'iso'
    });
  }

  create() {
    this.isoGroup = this.add.group();

    this.iso.projector.origin.setTo(0.5, 0.3);

    // Add some tiles to our scene
    this.spawnTiles();
  }

  spawnTiles() {
    var tile;

    for (var xx = 0; xx < 512; xx += 38) {
      for (var yy = 0; yy < 512; yy += 38) {
        tile = this.add.isoSprite(xx, yy, 0, 'tile', this.isoGroup);
        tile.setInteractive();

        tile.on('pointerover', function() {
          this.setTint(0x86bfda);
          this.isoZ += 5;
        });

        tile.on('pointerout', function() {
          this.clearTint();
          this.isoZ -= 5;
        });
      }
    }
  }
}

export default {
  name: 'home',
  data() {
    return {
      user: '',
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
      // desc basic init phaser
      let config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        pixelArt: true,
        scene: IsoInteractionExample
      };

      new Game(config);
    },

    // Phaser core
    preloadPhaser() {
    },

    createPhaser() {
    },

    updatePhaser() {
    },

  }
}
</script>

<style>
body {
  margin: 0;
}
</style>
