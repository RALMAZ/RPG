<template>
  <div id="app">
    <div class="home">
      <div
        v-text="'v 0.1.0 ORO'"
      />
      <div
        @click="menuShow = !menuShow"
        v-text="'Menu'"
        class="menu"
      />

      <Menu v-if="menuShow"/>
    </div>
  </div>
</template>

<script>
  import * as ex from 'excalibur'
  import Menu from './components/menu/Menu.vue'

  export default {
    components: {
      Menu
    },

    data() {
      return {
        menuShow: false
      }
    },

    mounted() {
      let actor = new ex.Actor({
        pos: new ex.Vector(100, 100),
        color: ex.Color.Red,
        body: new ex.Body({
          vel: new ex.Vector(20, 30), // velocity
          acc: new ex.Vector(0, 100), // acceleration
          collider: new ex.Collider({
            mass: 100, // mass of 100
            type: ex.CollisionType.Active, // active collision type
            shape: ex.Shape.Circle(50) // circle geometry of radius 50
          })
        })
      });

      this.$game.add(actor);
    }
  }
</script>

<style scoped>
.home {
  position: absolute;
  color:white;
}
</style>
