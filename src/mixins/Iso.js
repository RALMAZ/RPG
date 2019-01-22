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


        var tileUser = this.add.isoSprite(76, 76, 50, 'cube', this.isoGroup);
        

        for (var xx = 0; xx < 512; xx += 38) {
            for (var yy = 0; yy < 512; yy += 38) {
                if (yy == 0 || xx == 0 || yy == 494 || xx == 494) {
                    tile = this.add.isoSprite(xx, yy, 15, 'cube', this.isoGroup);
                } else {
                    tile = this.add.isoSprite(xx, yy, 31, 'tile', this.isoGroup);
                    tile.setInteractive();

                    tile.on('pointerover', () => {
                        tile.setTint(0x86bfda);
                        tile.isoZ += 3;
                    });

                    tile.on('pointerout', () => {
                        tile.clearTint();
                        tile.isoZ -= 3;
                    });
                }
            }
        }
        //
    }

    spawnUser() {
        // Arrow move
        /*
        var moveRect = (e) => {
            if (e.code == 'ArrowDown') {
                tile.isoX += 38;
                tile.isoY += 38;
            }
            if (e.code == 'ArrowUp') {
                tile.isoX -= 38;
                tile.isoY -= 38;
            }
            if (e.code == 'ArrowLeft') {
                tile.isoX -= 38;
                tile.isoY += 38;
            }
            if (e.code == 'ArrowRight') {
                tile.isoX += 38;
                tile.isoY -= 38;
            }
        }
        addEventListener("keydown", moveRect);
        */
    }
}