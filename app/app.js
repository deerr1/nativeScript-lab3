import Vue from 'nativescript-vue'

import Main from './components/Main.vue'

new Vue({
  render: (h) => h('frame', [h(Main)]),
}).$start()
