import Vue from 'vue'
import Phaser, { Game } from 'phaser';

import Iso from './game';
import App from './App.vue'
import store from './store'

let config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 768,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
        debug: true,
        debugShowBody: true,
        debugShowStaticBody: true,
        debugShowVelocity: true,
        debugVelocityColor: 0xffff00,
        debugBodyColor: 0x0000ff,
        debugStaticBodyColor: 0xffffff
    }
  },
  scene: Iso
};

new Game(config);

Vue.config.productionTip = false;

new Vue({
  store,
  render: function (h) { return h(App) }
}).$mount('#app')