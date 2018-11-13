import Vue from 'vue'
import Router from 'vue-router'
import carNoInput from '../components/CarNoInput'
import PayDetails from '../components/PayDetails'
import PaySuccess from '../components/paySuccess'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'carNoInput',
      component: carNoInput
    },
    {
      path:'/PayDetails',
      name: 'PayDetails',
      component: PayDetails
    },
    {
      path:'/PaySuccess',
      name: 'PaySuccess',
      component: PaySuccess
    }
  ]
})
