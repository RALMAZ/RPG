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

import IsoInteraction from '../mixins/Iso.js';

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
      user: '',

      // Set
      phaserScene: {},

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
      
      new Game(
        {
          type: Phaser.AUTO,
          width: window.innerWidth,
          height: window.innerHeight,
          pixelArt: true,
          scene: IsoInteraction
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
