<template>
  <div>
    <div class="game"/>
    <div class="ui"/>
  </div>
</template>

<script>
import Phaser from 'phaser';
import EasyStar from 'easystarjs';

export default {
  name: 'home',
  data() {
    return {
      user: '',
      config: {
        deviceW: 0,
        deviceH: 0,
        tileWidth: 50,
        easystar: {},
        tapPos: {},
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
        halfSpeed: 0.8,
        heroMapSprite: {},
        heroMapTile: {},
        dX: 0,
        dY: 0,
      },
      utilityData: {
        minimap: {},
        shadowOffset: {},
        borderOffset: {},
        wallHeight: 46,
        wallGraphicHeight: 98,
        floorGraphicHeight: 52,
        // class?
        isFindingPath: false,
        path: [],
        destination: {},
        stepsTaken: 0,
        stepsTillTurn: 19,
      }
    }
  },
  computed: {
    levelData() {
      return store.state.levels.home
    }
  },
  mounted() {
    this.config.deviceW = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    this.config.deviceH = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;


    this.config.tapPos = new Phaser.Point(0, 0);
    this.utilityData.wallHeight = this.utilityData.wallGraphicHeight - this.utilityData.floorGraphicHeight;
    this.utilityData.destination = this.heroData.heroMapTile;

    this.initGame();
  },
  methods: {
    // Init game engine
    initGame() {
      // desc basic init phaser
      this.game = new Phaser.Game(
        this.config.deviceW,
        this.config.deviceH,
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

      this.config.easystar = new EasyStar.js();
      this.config.easystar.setGrid(this.levelData);
      this.config.easystar.setAcceptableTiles([0]);
      this.config.easystar.enableDiagonals();// we want path to have diagonals
      this.config.easystar.disableCornerCutting(); // no diagonal path when walking at wall corners

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
      this.heroData.heroMapTile = this.getTileCoordinates(
        this.heroData.heroMapPos,
        this.config.tileWidth
      );
      // depthsort & draw new scene
      this.renderScene();
    },

    createLevel() {
        this.utilityData.minimap = this.game.add.group();
        var tileType = 0;
        for (var i = 0; i < levelData.length; i++) {
            for (var j = 0; j < levelData[0].length; j++) {
                tileType = levelData[i][j];
                this.placeTile(tileType, i, j);
                if (tileType == 2) {//save hero map tile
                    heroMapTile = new Phaser.Point(i, j);
                }
            }
        }
        this.addHero();

        this.heroData.heroMapSprite = minimap.create(
          this.heroData.heroMapTile.y * this.config.tileWidth,
          this.heroData.heroMapTile.x * this.config.tileWidth,
          'heroTile'
        );

        this.heroData.heroMapSprite.x += (this.config.tileWidth / 2) - (this.heroData.heroMapSprite.width / 2);
        this.heroData.heroMapSprite.y += (this.config.tileWidth / 2) - (this.heroData.heroMapSprite.height / 2);

        this.heroData.heroMapPos = new Phaser.Point(
          this.heroData.heroMapSprite.x + this.heroData.heroMapSprite.width / 2,
          heroMapSprite.y + this.heroData.heroMapSprite.height / 2
        );

        this.heroData.heroMapTile = this.getTileCoordinates(this.heroData.heroMapPos, this.config.tileWidth);
        this.utilityData.minimap.scale = new Phaser.Point(0.3, 0.3);
        this.utilityData.minimap.x = 500;
        this.utilityData.minimap.y = 10;
        this.renderScene();//draw once the initial state
    },
  
    addHero() {
        // sprite
        this.heroData.sorcerer = this.game.add.sprite(-50, 0, 'hero', '1.png');// keep him out side screen area
        // animation
        this.heroData.sorcerer.animations.add(
          'southeast', 
          ['1.png', '2.png', '3.png', '4.png'], 
          6, 
          true
        );

        this.heroData.sorcerer.animations.add(
          'south',
          ['5.png', '6.png', '7.png', '8.png'], 
          6, 
          true
        );

        this.heroData.sorcerer.animations.add(
          'southwest', 
          ['9.png', '10.png', '11.png', '12.png'], 
          6, 
          true
        );

        this.heroData.sorcerer.animations.add(
          'west', 
          ['13.png', '14.png', '15.png', '16.png'], 
          6, 
          true
        );

        this.heroData.sorcerer.animations.add(
          'northwest', 
          ['17.png', '18.png', '19.png', '20.png'], 
          6, 
          true
        );

        this.heroData.sorcerer.animations.add(
          'north', 
          ['21.png', '22.png', '23.png', '24.png'], 
          6, 
          true
        );

        this.heroData.sorcerer.animations.add(
          'northeast', 
          ['25.png', '26.png', '27.png', '28.png'], 
          6, 
          true
        );

        this.heroData.sorcerer.animations.add(
          'east', 
          ['29.png', '30.png', '31.png', '32.png'], 
          6, 
          true
        );
    },

    placeTile(tileType, i, j) {// place minimap
        var tile = 'greenTile';
        if (tileType == 1) {
            tile = 'redTile';
        }
        var tmpSpr = this.utilityData.minimap.create(
          j * this.config.tileWidth,
          i * this.config.tileWidth,
          tile
        );
        tmpSpr.name = "tile" + i + "_" + j;
    },

    renderScene() {
        this.gameData.gameScene.clear(); // clear the previous frame then draw again
        var tileType = 0;
        for (var i = 0; i < this.levelData.length; i++) {
            for (var j = 0; j < this.levelData[0].length; j++) {
                tileType = this.levelData[i][j];
                this.drawTileIso(tileType, i, j);
                if (
                  i == this.heroData.heroMapTile.y
                  && j == this.heroData.heroMapTile.x
                ) {
                    this.drawHeroIso();
                }
            }
        }
    },

    drawHeroIso() {
        var isoPt = new Phaser.Point();// It is not advisable to create points in update loop
        var heroCornerPt = new Phaser.Point(
            this.heroData.heroMapPos.x - this.heroData.heroMapSprite.width / 2,
            this.heroData.heroMapPos.y - this.heroData.heroMapSprite.height / 2
        );
        isoPt = this.cartesianToIsometric(heroCornerPt);// find new isometric position for hero from 2D map position
        this.utilityData.shadowOffset = new Phaser.Point(this.heroData.heroWidth + 7, 11);
        this.utilityData.borderOffset = new Phaser.Point(250, 50);
        this.gameData.gameScene.renderXY(
            this.heroData.sorcererShadow,
            isoPt.x + this.utilityData.borderOffset.x + this.utilityData.shadowOffset.x,
            isoPt.y + this.utilityData.borderOffset.y + this.utilityData.shadowOffset.y,
            false
        ); // draw shadow to render texture
        this.gameData.gameScene.renderXY(
            this.heroData.sorcerer,
            isoPt.x + borderOffset.x + this.heroData.heroWidth,
            isoPt.y + borderOffset.y - this.heroData.heroHeight,
            false
        ); // draw hero to render texture
    },

    drawTileIso(tileType, i, j) { // place isometric level tiles
        var isoPt = new Phaser.Point(); // It is not advisable to create point in update loop
        var cartPt = new Phaser.Point(); // This is here for better code readability.
        cartPt.x = j * this.config.tileWidth;
        cartPt.y = i * this.config.tileWidth;
        isoPt = this.cartesianToIsometric(cartPt);
        if (tileType == 1) {
            this.gameData.gameScene.renderXY(
                this.gameData.wallSprite,
                isoPt.x + this.utilityData.borderOffset.x,
                isoPt.y + this.utilityData.borderOffset.y - this.utilityData.wallHeight,
                false
            );
        } else {
            this.gameData.gameScene.renderXY(
                this.gameData.floorSprite,
                isoPt.x + this.utilityData.borderOffset.x,
                isoPt.y + this.utilityData.borderOffset.y,
                false
            );
        }
    },

    findPath() {
        if (
          this.utilityData.isFindingPath
          || this.heroData.isWalking
        ) return;
        var pos = this.game.input.activePointer.position;
        var isoPt = new Phaser.Point(
          pos.x - this.utilityData.borderOffset.x,
          pos.y - this.utilityData.borderOffset.y
        );

        this.config.tapPos = this.isometricToCartesian(isoPt);
        this.config.tapPos.x -= this.config.tileWidth / 2;//adjustment to find the right tile for error due to rounding off
        this.config.tapPos.y += this.config.tileWidth / 2;
        this.config.tapPos = this.getTileCoordinates(
          this.config.tapPos,
          this.config.tileWidth
        );

        if (
          this.config.tapPos.x > -1
          && this.config.tapPos.y > -1
          && this.config.tapPos.x < 7
          && this.config.tapPos.y < 7
        ) { //tapped within grid
            if (this.levelData[this.config.tapPos.y][this.config.tapPos.x] != 1) {//not wall tile
                this.utilityData.isFindingPath = true;
                //let the algorithm do the magic
                this.config.easystar.findPath(
                  this.heroData.heroMapTile.x,
                  this.heroData.heroMapTile.y,
                  this.config.tapPos.x,
                  this.config.tapPos.y,
                  this.plotAndMove()
                );
                this.config.easystar.calculate();
            }
        }
    },

    plotAndMove(newPath) {
        this.utilityData.destination = this.heroData.heroMapTile;
        this.utilityData.path = newPath;
        this.utilityData.isFindingPath = false;
        this.repaintMinimap();
        if (this.utilityData.path === null) {
            console.log("No Path was found.");
        } else {
            this.utilityData.path.push(this.config.tapPos);
            this.utilityData.path.reverse();
            this.utilityData.path.pop();
            for (var i = 0; i < this.utilityData.path.length; i++) {
                var tmpSpr = this.utilityData.minimap.getByName(
                    "tile" + this.utilityData.path[i].y
                    + "_"
                    + this.utilityData.path[i].x
                );
                tmpSpr.tint = 0x0000ff;
                //console.log("p "+path[i].x+":"+path[i].y);
            }
        }
    },

    repaintMinimap() {
        for (var i = 0; i < this.levelData.length; i++) {
            for (var j = 0; j < this.levelData[0].length; j++) {
                var tmpSpr = this.utilityData.minimap.getByName("tile" + i + "_" + j);
                tmpSpr.tint = 0xffffff;
            }
        }
    },

    aiWalk() {
        if (this.utilityData.path.length == 0) {//path has ended
            if (
              this.heroData.heroMapTile.x == this.utilityData.destination.x
              && this.heroData.heroMapTile.y == this.utilityData.destination.y
            ) {
                this.heroData.dX = 0;
                this.heroData.dY = 0;
                this.heroData.isWalking = false;
                return;
            }
        }
        this.heroData.isWalking = true;
        if (
          this.heroData.heroMapTile.x == this.utilityData.destination.x
          && this.heroData.heroMapTile.y == this.utilityData.destination.y
        ) { // reached current destination, set new, change direction
            // wait till we are few steps into the tile before we turn
            this.utilityData.stepsTaken++;
            if (this.utilityData.stepsTaken < this.utilityData.stepsTillTurn) {
                return;
            }
            console.log("at " + heroMapTile.x + " ; " + heroMapTile.y);
            //centralise the hero on the tile    
            this.heroData.heroMapSprite.x = 
              (this.heroData.heroMapTile.x * this.config.tileWidth)
              + (this.config.tileWidth / 2)
              - (this.heroData.heroMapSprite.width / 2);

            this.heroData.heroMapSprite.y =
              (this.heroData.heroMapTile.y
              * this.config.tileWidth)
              + (this.config.tileWidth / 2)
              - (this.heroData.heroMapSprite.height / 2);
            
            this.heroData.heroMapPos.x =
              this.heroData.heroMapSprite.x
              + this.heroData.heroMapSprite.width / 2;

            this.heroData.heroMapPos.y =
              this.heroData.heroMapSprite.y
              + this.heroData.heroMapSprite.height / 2;

            this.utilityData.stepsTaken = 0;
            this.utilityData.destination = this.utilityData.path.pop();//whats next tile in path
            
            if (this.heroData.heroMapTile.x < this.utilityData.destination.x) {
                this.heroData.dX = 1;
            } else if (this.heroData.heroMapTile.x > this.utilityData.destination.x) {
                this.heroData.dX = -1;
            } else {
                this.heroData.dX = 0;
            }
            if (this.heroData.heroMapTile.y < this.utilityData.destination.y) {
                this.heroData.dY = 1;
            } else if (this.heroData.heroMapTile.y > this.utilityData.destination.y) {
                this.heroData.dY = -1;
            } else {
                this.heroData.dY = 0;
            }
            if (this.heroData.heroMapTile.x == this.utilityData.destination.x) {//top or bottom
                this.heroData.dX = 0;
            } else if (this.heroData.heroMapTile.y == this.utilityData.destination.y) {//left or right
                this.heroData.dY = 0;
            }
            //figure out which direction to face
            if (this.heroData.dX == 1) {
                if (this.heroData.dY == 0) {
                    this.heroData.facing = "east";
                }
                else if (dY == 1) {
                    this.heroData.facing = "southeast";
                    this.heroData.dX = this.heroData.dY = this.heroData.halfSpeed;
                }
                else {
                    this.heroData.facing = "northeast";
                    this.heroData.dX = this.heroData.halfSpeed;
                    this.heroData.dY = -1 * this.heroData.halfSpeed;
                }
            }
            else if (this.heroData.dX == -1) {
                this.heroData.dX = -1;
                if (this.heroData.dY == 0) {
                    this.heroData.facing = "west";
                }
                else if (this.heroData.dY == 1) {
                    this.heroData.facing = "southwest";
                    this.heroData.dY = this.heroData.halfSpeed;
                    this.heroData.dX = -1 * this.heroData.halfSpeed;
                }
                else {
                    this.heroData.facing = "northwest";
                    this.heroData.dX = this.heroData.dY = -1 * this.heroData.halfSpeed;
                }
            }
            else {
                this.heroData.dX = 0;
                if (this.heroData.dY == 0) {
                    //this.heroData.facing="west";
                }
                else if (this.heroData.dY == 1) {
                    this.heroData.facing = "south";
                }
                else {
                    this.heroData.facing = "north";
                }
            }
        }
    },

    // Utility
    cartesianToIsometric(cartPt) {
        var tempPt = new Phaser.Point();
        tempPt.x = cartPt.x - cartPt.y;
        tempPt.y = (cartPt.x + cartPt.y) / 2;
        return (tempPt);
    },
    
    isometricToCartesian(isoPt) {
        var tempPt = new Phaser.Point();
        tempPt.x = (2 * isoPt.y + isoPt.x) / 2;
        tempPt.y = (2 * isoPt.y - isoPt.x) / 2;
        return (tempPt);
    },
    
    getTileCoordinates(cartPt, tileHeight) {
        var tempPt = new Phaser.Point();
        tempPt.x = Math.floor(cartPt.x / tileHeight);
        tempPt.y = Math.floor(cartPt.y / tileHeight);
        return (tempPt);
    },
    
    getCartesianFromTileCoordinates(tilePt, tileHeight) {
        var tempPt = new Phaser.Point();
        tempPt.x = tilePt.x * tileHeight;
        tempPt.y = tilePt.y * tileHeight;
        return (tempPt);
    }
  }
}
</script>
