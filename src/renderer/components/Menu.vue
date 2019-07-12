<template>
  <div class="menu">
    <div
      @click="goToScene('home')"
      v-text="'Scene Home'"
      class="menu-one"
    />
    <div
      @click="goToScene('lvl1')"
      v-text="'Scene lvl 1'"
      class="menu-two"
    />
    <div
      @click="goToScene('lvl2')"
      v-text="'Scene lvl 2'"
      class="menu-three"
    />
    <div
      @click="goToScene('lvl3')"
      v-text="'Scene lvl 3'"
      class="menu-four"
    />
  </div>
</template>

<script>
  import * as ex from 'excalibur'

  export default {
    data() {
      return {
        test: 0
      }
    },

    methods: {
      goToScene(name) {
        this.$emit('menuClose');
        this.$game.goToScene(name);
      }
    }
  }
</script>

<style scoped>
.menu {
  width: 250px;
}

.menu div {
  text-align: center;
  padding: 20px;
  margin: 10px;
  border: 3px solid black;
  color: black;
  background: white;
  max-width: 250px;
  text-align: center;
}

.menu div:hover {
  border-style: dashed;
}
</style>
