import { Scene } from 'phaser';
import IsoPlugin from 'phaser3-plugin-isometric';

export default class IsoInteraction extends Scene {
    constructor(map) {
        //this.map = map;

        const sceneConfig = {
            key: 'IsoInteraction',
            mapAdd: { isoPlugin: 'iso' }
        };

        super(sceneConfig);
    }

    preload() {
        this.load.image('tile', 'https://i.postimg.cc/BQd4NN41/tile.png');
        this.load.image('cube', 'https://i.postimg.cc/YCFmtM7n/cube.png');
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
        var array = [];

        for (var xx = 0; xx < 512; xx += 38) {
            array[xx] = [];
            for (var yy = 0; yy < 512; yy += 38) {
                if (yy == 0 || xx == 0 || yy == 494 || xx == 494) {
                    tile = this.add.isoSprite(xx, yy, 15, 'cube', this.isoGroup);
                    array[xx][yy] = 1;
                } else {
                    array[xx][yy] = 0;
                    tile = this.add.isoSprite(xx, yy, 31, 'tile', this.isoGroup);
                    tile.setInteractive();

                    tile.on('pointerover', function () {
                        this.setTint(0x86bfda);
                        this.isoZ += 3;
                    });

                    tile.on('pointerout', function () {
                        this.clearTint();
                        this.isoZ -= 3;
                    });
                }
            }
        }

        console.log(array);
        
    }
}