<template>
  <div id="app">
  </div>
</template>

<script>
// Vue.js is responsible for displaying the interface and recording data from the Phaser engine.

export default {
  // Options
  name: 'app',
  functional: false,
  delimiters: ["<<",">>"],

  // Assets
  components: {},

  // Composition
  mixins: [],

  // Data
  data() {
    return {
      some: 1
    }
  },

  // Lifecycle hooks
  beforeCreate() {
    console.log('Create UI');
  },

  created() {

  },

  mounted() {

  },

  destroyed() {
    console.log('UI destroyed');
  },

  errorCaptured: (error) => {
    console.log(error);
  },

  // Render
  renderError (h, err) {
    return h('pre', { style: { color: 'red' }}, err.stack);
  }
}
</script>

<style>
/*
  body {
    background-color: black;
    color: white;
    display: flex;
    font-family: "Lucida Console", Monaco, monospace;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  a, a:active {
    color: white;
    text-decoration: none;
    margin-bottom: 1em;
  }*/

  #app {
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
