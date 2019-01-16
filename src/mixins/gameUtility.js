export default {
    data() {
        return {
            utilityData: {
                minimap: {},
                shadowOffset: {},
                borderOffset: {}
            }
        }
    },
    methods: {
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
            this.heroData.heroMapSprite = minimap.create(this.heroData.heroMapTile.y * this.set.tileWidth, this.heroData.heroMapTile.x * this.set.tileWidth, 'heroTile');
            this.heroData.heroMapSprite.x += (this.set.tileWidth / 2) - (this.heroData.heroMapSprite.width / 2);
            this.heroData.heroMapSprite.y += (this.set.tileWidth / 2) - (this.heroData.heroMapSprite.height / 2);
            this.heroData.heroMapPos = new Phaser.Point(this.heroData.heroMapSprite.x + this.heroData.heroMapSprite.width / 2, heroMapSprite.y + this.heroData.heroMapSprite.height / 2);
            this.heroData.heroMapTile = this.getTileCoordinates(this.heroData.heroMapPos, this.set.tileWidth);
            this.utilityData.minimap.scale = new Phaser.Point(0.3, 0.3);
            this.utilityData.minimap.x = 500;
            this.utilityData.minimap.y = 10;
            this.renderScene();//draw once the initial state
        },

        addHero() {
            // sprite
            this.heroData.sorcerer = this.game.add.sprite(-50, 0, 'hero', '1.png');// keep him out side screen area

            // animation
            this.heroData.sorcerer.animations.add('southeast', ['1.png', '2.png', '3.png', '4.png'], 6, true);
            this.heroData.sorcerer.animations.add('south', ['5.png', '6.png', '7.png', '8.png'], 6, true);
            this.heroData.sorcerer.animations.add('southwest', ['9.png', '10.png', '11.png', '12.png'], 6, true);
            this.heroData.sorcerer.animations.add('west', ['13.png', '14.png', '15.png', '16.png'], 6, true);
            this.heroData.sorcerer.animations.add('northwest', ['17.png', '18.png', '19.png', '20.png'], 6, true);
            this.heroData.sorcerer.animations.add('north', ['21.png', '22.png', '23.png', '24.png'], 6, true);
            this.heroData.sorcerer.animations.add('northeast', ['25.png', '26.png', '27.png', '28.png'], 6, true);
            this.heroData.sorcerer.animations.add('east', ['29.png', '30.png', '31.png', '32.png'], 6, true);
        },

        placeTile(tileType, i, j) {// place minimap
            var tile = 'greenTile';
            if (tileType == 1) {
                tile = 'redTile';
            }
            var tmpSpr = this.utilityData.minimap.create(j * this.set.tileWidth, i * this.set.tileWidth, tile);
            tmpSpr.name = "tile" + i + "_" + j;
        },

        renderScene() {
            this.gameData.gameScene.clear(); // clear the previous frame then draw again
            var tileType = 0;
            for (var i = 0; i < this.levelData.length; i++) {
                for (var j = 0; j < this.levelData[0].length; j++) {
                    tileType = this.levelData[i][j];
                    this.drawTileIso(tileType, i, j);
                    if (i == this.heroData.heroMapTile.y && j == this.heroData.heroMapTile.x) {
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
        }
    }
}