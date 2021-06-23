import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入element 组件和 ui样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

// 加载使用elementui
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
