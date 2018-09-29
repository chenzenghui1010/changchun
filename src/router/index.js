import Vue from 'vue'
import Router from 'vue-router'
import carNoInput from '../view/CarNoInput'
import PayDetails from '../view/PayDetails'
import PaySuccess from '../view/paySuccess'

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
