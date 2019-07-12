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
        this.$game.goToScene(name);
      }
    }
  }
</script>

<style scoped>
@-webkit-keyframes MenuOne {
    0%{background-position:65% 0%}
    50%{background-position:36% 100%}
    100%{background-position:65% 0%}
}
@-moz-keyframes MenuOne {
    0%{background-position:65% 0%}
    50%{background-position:36% 100%}
    100%{background-position:65% 0%}
}
@keyframes MenuOne { 
    0%{background-position:65% 0%}
    50%{background-position:36% 100%}
    100%{background-position:65% 0%}
}

@-webkit-keyframes MenuTwo {
    0%{background-position:0% 0%}
    50%{background-position:93% 100%}
    100%{background-position:0% 0%}
}
@-moz-keyframes MenuTwo {
    0%{background-position:0% 0%}
    50%{background-position:93% 100%}
    100%{background-position:0% 0%}
}
@keyframes MenuTwo { 
    0%{background-position:0% 0%}
    50%{background-position:93% 100%}
    100%{background-position:0% 0%}
}

@-webkit-keyframes MenuThree {
    0%{background-position:0% 75%}
    50%{background-position:100% 26%}
    100%{background-position:0% 75%}
}
@-moz-keyframes MenuThree {
    0%{background-position:0% 75%}
    50%{background-position:100% 26%}
    100%{background-position:0% 75%}
}
@keyframes MenuThree { 
    0%{background-position:0% 75%}
    50%{background-position:100% 26%}
    100%{background-position:0% 75%}
}

@-webkit-keyframes MenuFour {
    0%{background-position:0% 75%}
    50%{background-position:100% 26%}
    100%{background-position:0% 75%}
}
@-moz-keyframes MenuFour {
    0%{background-position:0% 75%}
    50%{background-position:100% 26%}
    100%{background-position:0% 75%}
}
@keyframes MenuFour { 
    0%{background-position:0% 75%}
    50%{background-position:100% 26%}
    100%{background-position:0% 75%}
}

.menu {
  width: 250px;
}

.menu div {
  text-align: center;
  padding: 20px;
  margin: 10px;
  border: 3px solid white;
  max-width: 250px;
  text-align: center;
}

.menu-one {
  background: linear-gradient(74deg, #b732e8, #590ec1);
  background-size: 400% 400%;
  animation: MenuOne 3s ease infinite;
}

.menu-two {
  background: linear-gradient(268deg, #019046, #2fc10e);
  background-size: 400% 400%;
  animation: MenuTwo 3s ease infinite;
}

.menu-three {
  background: linear-gradient(136deg, #ce5528, #ead000);
  background-size: 400% 400%;
  animation: MenuThree 3s ease infinite;
}

.menu-four {
  background: linear-gradient(236deg, #28bece, #006cea);
  background-size: 600% 600%;
  animation: MenuFour 3s ease infinite;
}
</style>
