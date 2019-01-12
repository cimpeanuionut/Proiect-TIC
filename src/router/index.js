import Vue from 'vue'
import Router from 'vue-router'
import UsersOption from '@/components/UsersOption'
import Register from '@/components/Register'
import Login from '@/components/Login'
import firebase from 'firebase'
import LucruriPreferate from '@/components/LucruriPreferate'
import AddLucruri from '@/components/AddLucruri'
import EditLucruri from '@/components/EditLucruri'
import Chat from '@/components/Chat'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/:email',
      name: 'UsersOption',
      component: UsersOption,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },    
    {
      path:'/LucruriPreferate/:email',
      name: 'LucruriPreferate',
      component: LucruriPreferate, 
      props: true,     
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/add-lucruri/:email',
      name: 'AddLucruri',
      component: AddLucruri,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-preferate/:email/:lista_slug',
      name: 'EditLucruri',
      component: EditLucruri,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/chat/:email',
      name: 'Chat',
      component: Chat, 
      props: true,     
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)){
    let user = firebase.auth().currentUser
    if (user){
      next()
    }else{
      next({name: 'Login'})
    }
  }else{
    next()
  }  
})

export default router