import './firebaseConfig';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { firestorePlugin } from 'vuefire';


Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(firestorePlugin);

new Vue({
  el: '#app',
  render : h => h(App)
}).$mount('#app') 
