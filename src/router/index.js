import Vue from 'vue'
import Router from 'vue-router'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import login from '@/components/login'
import register from '@/components/register'
import attendence from '@/components/attendence'
import student from '@/components/student'
import dailyrecord from '@/components/dailyrecord'
import totation from '@/components/totation'
import grade from '@/components/grade'
import disease from '@/components/disease'
import diseaserecord from '@/components/diseaserecord'
import operation from '@/components/operation'
import doctor from '@/components/doctor'
import teacher from '@/components/teacher'
Vue.use(Router)
Vue.use(iview)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path:'/attendence',
      name:'attendence',
      component:attendence
    },
    {
      path:'/student',
      name:'student',
      component:student,
    },
    {
      path:'/dailyrecord',
      name:'dailyrecord',
      component:dailyrecord,
    },
    {
      path:'/totation',
      name:'totation',
      component:totation,
    },
    {
      path: '/grade',
      name: 'grade',
      component: grade
    },
    {
      path:'/operation',
      name:'operation',
      component:operation
    },
    {
      path:'/disease',
      name:'disease',
      component:disease,
    },
    {
      path:'/diseaserecord',
      name:'diseaserecord',
      component:diseaserecord,
    },
    {
      path: '/doctor',
      name: 'doctor',
      component: doctor
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: teacher
    },
  ]
})
