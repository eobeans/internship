/*
 * @Autor: eobeans
 * @Date: 2021-05-27 22:42:25
 * @LastEditors: eobeans
 * @LastEditTime: 2021-07-31 14:19:03
 * @Version: 0.1.0
 * @Description: 
 */
import Vue from 'vue'
import Router from 'vue-router'
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
import simpleEditTable from '@/pages/simpleEditTable'
import zoumadeng from '@/pages/collect/zoumadeng'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      icon: 'ios-navigate',
      label: '首页',
      component: layout,
      children: [
        {
          path:'attendence',
          name:'attendence',
          icon: 'ios-navigate',
          label: '考勤总览',
          component:attendence
        },
        {
          path:'student',
          name:'student',
          icon: 'ios-man',
          label: '学生信息',
          component:student,
        },
        {
          path:'dailyrecord',
          name:'dailyrecord',
          icon: 'ios-paper',
          label: '每日实习情况',
          component:dailyrecord,
        },
        {
          path:'totation',
          name:'totation',
          icon: 'ios-loading',
          label: '轮转科室情况',
          component:totation,
        },
        {
          path: 'grade',
          name: 'grade',
          icon: 'ios-flag',
          label: '成绩考核记录',
          component: grade
        },
        {
          path:'diseaserecord',
          name:'diseaserecord',
          icon: 'ios-create',
          label: '诊断、操作记录',
          component:diseaserecord,
        },
        {
          path:'disease',
          name:'disease',
          icon: 'ios-pulse',
          label: '病种记录表',
          component:disease,
        },
        {
          path:'operation',
          name:'operation',
          icon: 'ios-copy',
          label: '操作记录表',
          component:operation
        },
        {
          path: 'doctor',
          name: 'doctor',
          icon: 'ios-analytics',
          label: '医院账号管理',
          component: doctor
        },
        {
          path: 'teacher',
          name: 'teacher',
          icon: 'ios-school',
          label: '学校教师账号管理',
          component: teacher
        },
        {
          path: 'mytest',
          name: 'mytest',
          icon: 'md-snow',
          label: '我的测试',
          component: mytest
        },
        {
          path: 'editTable',
          name: 'editTable',
          icon: 'ios-list-box',
          label: '可编辑表格',
          component: editTable
        },
        {
          path: 'simpleEditTable',
          name: 'simpleEditTable',
          icon: 'ios-grid',
          label: '简易可编辑表格',
          component: simpleEditTable
        },
        {
          path: 'wyyzmd',
          name: 'wyyzmd',
          icon: 'ios-grid',
          label: '走马灯',
          component: zoumadeng
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      icon: 'ios-navigate',
      label: '登入',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      icon: 'ios-navigate',
      label: '注册',
      component: register
    },
  ]
})
