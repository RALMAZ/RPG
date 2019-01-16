import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    levels: {
      home:[
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1]
          ],
      street: []
    },
    user: {
      // desc saved stats
    },
    ui: {
      // desc basic bar stat
    }
  },
  mutations: {
    changeLevel(state, newLevel) {
      state.levels.home = newLevel;
    },
  },
  actions: {

  }
})
