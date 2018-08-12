import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // Define states
  state: {
    author: 'Debin',
    purposes: [
      { id: 1, label: 'Eat and drink' },
      { id: 2, label: 'Communication' },
      { id: 3, label: 'Apparel' },
      { id: 4, label: 'Beauty' },
      { id: 5, label: 'Entertainment' },
      { id: 6, label: 'Medical' },
    ]
  }
})

export default store
