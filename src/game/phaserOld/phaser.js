import { Scene } from 'phaser';
import IsoPlugin from 'phaser3-plugin-isometric';
// import EasyStar from 'easystarjs';
import Level1 from './level1';

// Debug tile
// import tile from '@/game/assets/tile.png';

// Ground tiles 
import barrelsE from '@/game/assets/library/barrel/barrels_E_result.png';
import dirtW from '@/game/assets/library/dirt/dirt_W_result.png';
import stoneUnevenE from '@/game/assets/library/stone/stoneUneven_E_result.png';
import stoneMissingTilesS from '@/game/assets/library/stone/stoneMissingTiles_S_result.png';
import planksBrokenE from '@/game/assets/library/planks/planksBroken_E_result.png';
import dirtTilesW from '@/game/assets/library/dirt/dirtTiles_W_result.png';
import stoneSideUnevenN from '@/game/assets/library/stone/stoneSideUneven_N_result.png';
import stoneW from '@/game/assets/library/stone/stone_W_result.png';

// Object tiles
import tableRoundItemsChairsE from '@/game/assets/library/tableRound/tableRoundItemsChairs_E_result.png';
import stoneWallAgedLeftE from '@/game/assets/library/stoneWall/stoneWallAgedLeft_E_result.png';
import stoneWallStructureE from '@/game/assets/library/stoneWall/stoneWallStructure_E_result.png';
import Male7Idle0 from '@/game/assets/library/hero/Male_7_Idle0_result.png'; // Example npc model
import Male2Idle0 from '@/game/assets/library/hero/Male_2_Idle0_result.png'; // Example npc model

// User frames
import Male_1_Run0 from '@/game/assets/library/hero/Male_1_Run0_result.png';
import Male_1_Run1 from '@/game/assets/library/hero/Male_1_Run1_result.png';
import Male_1_Run2 from '@/game/assets/library/hero/Male_1_Run2_result.png';
import Male_1_Run3 from '@/game/assets/library/hero/Male_1_Run3_result.png';
import Male_1_Run4 from '@/game/assets/library/hero/Male_1_Run4_result.png';
import Male_1_Run5 from '@/game/assets/library/hero/Male_1_Run5_result.png';
import Male_1_Run6 from '@/game/assets/library/hero/Male_1_Run6_result.png';
import Male_1_Run7 from '@/game/assets/library/hero/Male_1_Run7_result.png';
import Male_1_Run8 from '@/game/assets/library/hero/Male_1_Run8_result.png';
import Male_1_Run9 from '@/game/assets/library/hero/Male_1_Run9_result.png';

export default class Iso extends Scene {
  constructor() {
    const sceneConfig = {
      key: 'Iso',
      mapAdd: { isoPlugin: 'iso' }
    };

    super(sceneConfig);
  }

  preload() {
    // Ground tiles
    this.load.image('barrelsE', barrelsE);
    this.load.image('dirtW', dirtW);
    this.load.image('stoneUnevenE', stoneUnevenE);
    this.load.image('stoneMissingTilesS', stoneMissingTilesS);
    this.load.image('planksBrokenE', planksBrokenE);
    this.load.image('dirtTilesW', dirtTilesW);
    this.load.image('stoneSideUnevenN', stoneSideUnevenN);
    this.load.image('stoneW', stoneW);

    // Object tiles
    this.load.image('tableRoundItemsChairsE', tableRoundItemsChairsE);
    this.load.image('stoneWallAgedLeftE', stoneWallAgedLeftE);
    this.load.image('stoneWallStructureE', stoneWallStructureE);
    this.load.image('Male7Idle0', Male7Idle0);
    this.load.image('Male2Idle0', Male2Idle0);

    // Load user
    this.load.image('Male_1_Run0', Male_1_Run0);
    this.load.image('Male_1_Run1', Male_1_Run1);
    this.load.image('Male_1_Run2', Male_1_Run2);
    this.load.image('Male_1_Run3', Male_1_Run3);
    this.load.image('Male_1_Run4', Male_1_Run4);
    this.load.image('Male_1_Run5', Male_1_Run5);
    this.load.image('Male_1_Run6', Male_1_Run6);
    this.load.image('Male_1_Run7', Male_1_Run7);
    this.load.image('Male_1_Run8', Male_1_Run8);
    this.load.image('Male_1_Run9', Male_1_Run9);

    this.load.scenePlugin({
      key: 'IsoPlugin',
      url: IsoPlugin,
      sceneKey: 'iso'
    });

    this.userPos = {
      x: 139,
      y: 139
    }
  }

  create() {
    this.isoGroup = this.add.group();
    this.iso.projector.origin.setTo(0.5, 0.3);
    this.iso.projectionAngle = Math.atan(139/256);

    //** this.easystar = new EasyStar.js();
    //** this.finding = false;
    //** this.easystar.setGrid(Level.walkable);
    //** this.easystar.setAcceptableTiles([1]);
    // this.easystar.enableDiagonals();
    // this.easystar.disableCornerCutting();

    const camera = this.cameras.main;
    const cursors = this.input.keyboard.createCursorKeys();
    this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
      camera: camera,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 0.5
    });

    this.anims.create({
      key: 'run',
      frames: [
          { key: 'Male_1_Run0' },
          { key: 'Male_1_Run1' },
          { key: 'Male_1_Run2' },
          { key: 'Male_1_Run3' },
          { key: 'Male_1_Run4' },
          { key: 'Male_1_Run5' },
          { key: 'Male_1_Run6' },
          { key: 'Male_1_Run7' },
          { key: 'Male_1_Run8' },
          { key: 'Male_1_Run9' }
      ],
      frameRate: 15,
      repeat: -1
    });

    this.spawnTiles();
  }

  update(time, delta) {
    this.controls.update(delta);
  }

  spawnTiles() {
    var tile;

    // Make ground
    for (let y = 0; y < Level1.ground.length; y += 1) {
      for (let x = 0; x < Level1.ground[y].length; x += 1) {
        tile = this.add.isoSprite(x * 139, y * 139, 0, Level1.groundNames[Level1.ground[y][x]], this.isoGroup);
        tile.setInteractive();
        // Random color
        // tile.setTint(((1<<24)*Math.random()|0).toString(16));
        tile.on('pointerover', function() {
          this.setTint(0x86bfda);
        });
        tile.on('pointerout', function() {
          this.clearTint();
        });
      }
    }

    // Place object
    for (let y = 0; y < Level1.object.length; y += 1) {
      for (let x = 0; x < Level1.object[y].length; x += 1) {
        if (Level1.object[y][x] !== 0) {
          tile = this.add.isoSprite(x * 139, y * 139, 30, Level1.objectNames[Level1.object[y][x]], this.isoGroup);
        }
      }
    }

    var user = this.add.sprite(this.userPos.x, this.userPos.y, 'Male7Idle0').play('run');

    var keyW = this.input.keyboard.addKey('W');
    keyW.on('down', (event) => {
      user.x = user.x + 0;
      user.y = user.y + 15;
    });

    var keyA = this.input.keyboard.addKey('A');
    keyA.on('down', (event) => {
      user.x = user.x - 15;
      user.y = user.y + 0;
    });

    var keyS = this.input.keyboard.addKey('S');
    keyS.on('down', (event) => {
      user.x = user.x + 0;
      user.y = user.y - 15;
    });

    var keyD = this.input.keyboard.addKey('D');
    keyD.on('down', (event) => {
      user.x = user.x + 15;
      user.y = user.y + 0;
    });

    var keyWS = this.input.keyboard.createCombo(['W', 'S'], {
      // resetOnWrongKey: true,
      // maxKeyDelay: 0,
      // resetOnMatch: false,
      // deleteOnMatch: false,
    });
    //keyWS.on('down', (event) => {
    //  user.x = user.x - 15;
    //  user.y = user.y - 15;
    //});

    var keyWD = this.input.keyboard.createCombo(['W', 'D'], {
      // resetOnWrongKey: true,
      // maxKeyDelay: 0,
      // resetOnMatch: false,
      // deleteOnMatch: false,
    });
    //keyWD.on('down', (event) => {
    //  user.x = user.x + 15;
    //  user.y = user.y - 15;
    //});

    var keySA = this.input.keyboard.createCombo(['S', 'A'], {
      // resetOnWrongKey: true,
      // maxKeyDelay: 0,
      // resetOnMatch: false,
      // deleteOnMatch: false,
    });
    //keySA.on('down', (event) => {
    //  user.x = user.x - 15;
    //  user.y = user.y + 15;
    //});

    var keySD = this.input.keyboard.createCombo(['S', 'D'], {
      // resetOnWrongKey: true,
      // maxKeyDelay: 0,
      // resetOnMatch: false,
      // deleteOnMatch: false,
    });
    //keySD.on('down', (event) => {
    //  user.x = user.x + 15;
    //  user.y = user.y + 15;
    //});

    this.input.keyboard.on('keycombomatch', function (keyCombo, keyboardEvent) {
      console.log(keyCombo);
      console.log(keyboardEvent);
    });
  } 
  
}