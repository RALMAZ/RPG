import { Scene } from 'phaser';
import IsoPlugin from 'phaser3-plugin-isometric';
// import EasyStar from 'easystarjs';

// Debug tile
// import tile from '@/game/assets/tile.png';
import stoneE from '@/game/assets/library/stone_E_result.png';

export default class Iso extends Scene {
  constructor() {
    const sceneConfig = {
      key: 'Iso',
      mapAdd: { isoPlugin: 'iso' }
    };

    super(sceneConfig);
  }

  preload() {
    this.load.image('stoneE', stoneE);
    this.load.scenePlugin({
      key: 'IsoPlugin',
      url: IsoPlugin,
      sceneKey: 'iso'
    });
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
    
    this.spawnTiles();
  }

  update(time, delta) {
    this.controls.update(delta);
  }

  spawnTiles() {
    var tile;

    for (var xx = 0; xx < 10; xx += 1) {
      for (var yy = 0; yy < 10; yy += 1) {
        tile = this.add.isoSprite(xx * 139, yy * 139, 0, 'stoneE', this.isoGroup);
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

    //this.add.isoSprite(xx, yy, 0, 'cube', this.isoGroup);

  }
  
}