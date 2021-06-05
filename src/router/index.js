/*
 * @Autor: eobeans
 * @Date: 2021-05-27 22:42:25
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-06 01:18:48
 * @Version: 0.1.0
 * @Description: 
 */
import Vue from 'vue'
import Router from 'vue-router'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import layout from '@/layout/layout'
import login from '@/pages/login'
import register from '@/pages/register'
import attendence from '@/pages/attendence'
import student from '@/pages/student'
import dailyrecord from '@/pages/dailyrecord'
import totation from '@/pages/totation'
import grade from '@/pages/grade'
import disease from '@/pages/disease'
import diseaserecord from '@/pages/diseaserecord'
import operation from '@/pages/operation'
import doctor from '@/pages/doctor'
import teacher from '@/pages/teacher'
import mytest from '@/pages/mytest'
import editTable from '@/pages/editTable'

Vue.use(Router)
Vue.use(iview)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout,
      children: [
        {
          path:'attendence',
          name:'attendence',
          component:attendence
        },
        {
          path:'student',
          name:'student',
          component:student,
        },
        {
          path:'dailyrecord',
          name:'dailyrecord',
          component:dailyrecord,
        },
        {
          path:'totation',
          name:'totation',
          component:totation,
        },
        {
          path: 'grade',
          name: 'grade',
          component: grade
        },
        {
          path:'operation',
          name:'operation',
          component:operation
        },
        {
          path:'disease',
          name:'disease',
          component:disease,
        },
        {
          path:'diseaserecord',
          name:'diseaserecord',
          component:diseaserecord,
        },
        {
          path: 'doctor',
          name: 'doctor',
          component: doctor
        },
        {
          path: 'teacher',
          name: 'teacher',
          component: teacher
        },
        {
          path: 'mytest',
          name: 'mytest',
          component: mytest
        },
        {
          path: 'editTable',
          name: 'editTable',
          component: editTable
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
  ]
})
