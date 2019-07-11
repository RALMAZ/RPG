<template>
  <div class="home">
    v 0.1.0 ORO
  </div>
</template>

<script>
  export default {
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
.home {
  position: absolute;
  color:white;
}
</style>
