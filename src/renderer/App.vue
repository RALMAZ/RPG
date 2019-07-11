<template>
  <div id="app">
    <div class="home">
      v 0.1.0 ORO
    </div>
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

<style>
.home {
  position: absolute;
  color:white;
}
</style>
