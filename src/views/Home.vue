<template>
  <div>
    <div class="game"/>
    <div class="ui"/>
  </div>
</template>

<script>
import Phaser from 'phaser';
import EasyStar from 'easystarjs';
import gameUtility from '@/mixins/gameUtility';

export default {
  name: 'home',
  mixins: [gameUtility],
  date() {
    return {
      user: '',
      set: {
        deviceW: 0,
        deviceH: 0,
        tileWidth: 50,
      },
      game: {},
      gameData: {
        gameScene: {},
        floorSprite: {},
        wallSprite: {},
      },
      heroData: {
        sorcerer: {},
        sorcererShadow: {},
        isWalking: false,
        facing: 'south',
        heroMapPos: {},
        heroSpeed: 1.2,
        heroMapSprite: {},
        heroMapTile: {},
        dX: 0,
        dY: 0,
      }
    }
  },
  computed: {
    levelData() {
      return store.state.levels.home
    }
  },
  mounted() {
    this.set.deviceW = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    this.set.deviceH = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

    this.initGame();
  },
  methods: {
    // Init game engine
    initGame() {
      // desc basic init phaser
      this.game = new Phaser.Game(
        this.set.deviceW,
        this.set.deviceH,
        Phaser.AUTO,
        'game',
        {
          preload: this.preloadPhaser(),
          create: this.createPhaser(),
          update: this.updatePhaser()
        }
      );

    },

    // Phaser core
    preloadPhaser() {
      this.game.load.crossOrigin = 'Anonymous';

      this.game.load.bitmapFont(
        'font',
        'https://dl.dropboxusercontent.com/s/z4riz6hymsiimam/font.png?dl=0',
        'https://dl.dropboxusercontent.com/s/7caqsovjw5xelp0/font.xml?dl=0'
      );

      this.game.load.image(
        'greenTile',
        'https://dl.dropboxusercontent.com/s/nxs4ptbuhrgzptx/green_tile.png?dl=0'
      );

      this.game.load.image(
        'redTile',
        'https://dl.dropboxusercontent.com/s/zhk68fq5z0c70db/red_tile.png?dl=0'
      );


      this.game.load.image(
        'heroTile',
        'https://dl.dropboxusercontent.com/s/8b5zkz9nhhx3a2i/hero_tile.png?dl=0'
      );

      this.game.load.image(
        'heroShadow',
        'https://dl.dropboxusercontent.com/s/sq6deec9ddm2635/ball_shadow.png?dl=0'
      );

      this.game.load.image(
        'floor',
        'https://dl.dropboxusercontent.com/s/h5n5usz8ejjlcxk/floor.png?dl=0'
      );

      this.game.load.image(
        'wall',
        'https://dl.dropboxusercontent.com/s/uhugfdq1xcwbm91/block.png?dl=0'
      );

      this.game.load.image(
        'ball',
        'https://dl.dropboxusercontent.com/s/pf574jtx7tlmkj6/ball.png?dl=0'
      );

      this.game.load.atlasJSONArray(
        'hero',
        'https://dl.dropboxusercontent.com/s/hradzhl7mok1q25/hero_8_4_41_62.png?dl=0',
        'https://dl.dropboxusercontent.com/s/95vb0e8zscc4k54/hero_8_4_41_62.json?dl=0'
      );
    },

    createPhaser() {
      this.game.stage.backgroundColor = '#cccccc';
      // we draw the depth sorted scene into this render texture
      this.gameData.gameScene = this.game.add.renderTexture(this.game.width, this.game.height);
      this.game.add.sprite(0, 0, this.gameData.gameScene);
      this.gameData.floorSprite = this.game.make.sprite(0, 0, 'floor');
      this.gameData.wallSprite = this.game.make.sprite(0, 0, 'wall');
      this.heroData.sorcererShadow = this.game.make.sprite(0, 0, 'heroShadow');
      this.heroData.sorcererShadow.scale = new Phaser.Point(0.5, 0.6);
      this.heroData.sorcererShadow.alpha = 0.4;
      this.createLevel();

      let easystar = new EasyStar.js();
      easystar.setGrid(this.levelData);
      easystar.setAcceptableTiles([0]);
      easystar.enableDiagonals();// we want path to have diagonals
      easystar.disableCornerCutting(); // no diagonal path when walking at wall corners

      this.game.input.activePointer.leftButton.onUp.add(this.findPath())
    },

    updatePhaser() {
      // follow the path
      this.aiWalk();
      // if no key is pressed then stop else play walking animation
      if (this.heroData.dY == 0 && this.heroData.dX == 0) {
          this.heroData.sorcerer.animations.stop();
          this.heroData.sorcerer.animations.currentAnim.frame = 0;
      } else {
          if (this.heroData.sorcerer.animations.currentAnim != this.heroData.facing) {
              this.heroData.sorcerer.animations.play(this.heroData.facing);
          }
      }
      // check if we are walking into a wall else move hero in 2D

      this.heroData.heroMapPos.x += this.heroData.heroSpeed * this.heroData.dX;
      this.heroData.heroMapPos.y += this.heroData.heroSpeed * this.heroData.dY;
      this.heroData.heroMapSprite.x = this.heroData.heroMapPos.x - this.heroData.heroMapSprite.width / 2;
      this.heroData.heroMapSprite.y = this.heroData.heroMapPos.y - this.heroData.heroMapSprite.height / 2;
      // get the new hero map tile

      this.heroData.heroMapTile = new Phaser.Point(1, 1);
      this.heroData.heroMapTile = this.getTileCoordinates(this.heroData.heroMapPos, this.set.tileWidth);
      // depthsort & draw new scene
      this.renderScene();
    }

  }
}
</script>
