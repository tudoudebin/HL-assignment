// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './vuex/store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import echarts from 'echarts'

Vue.use(Vuex)
Vue.use(ElementUI, { locale })

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  // register filters
  filters: {
    percentageFormat: require('./filters/percentageFormatter'),
  },
  components: { App },
  template: '<App/>',
  data(){
   return {
     Bus : new Vue()
   }
  }
})
