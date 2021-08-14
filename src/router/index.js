/*
 * @Autor: eobeans
 * @Date: 2021-05-27 22:42:25
 * @LastEditors: eobeans
 * @LastEditTime: 2021-08-14 11:06:56
 * @Version: 0.1.0
 * @Description: 
 */
import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/layout/layout'
import login from '@/pages/login'
import register from '@/pages/register'
import attendence from '@/pages/attendence'
import mytest from '@/pages/mytest'
import editTable from '@/pages/editTable'
import simpleEditTable from '@/pages/simpleEditTable'
import zoumadeng from '@/pages/collect/zoumadeng'
import htmlToCanvas from '@/pages/collect/htmlToCanvas'
import dateListByFreq from '@/pages/collect/dateListByFreq'

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
        {
          path: 'htmlToCanvas',
          name: 'htmlToCanvas',
          icon: 'ios-grid',
          label: 'html转Canvas',
          component: htmlToCanvas
        },
        {
          path: 'dateListByFreq',
          name: 'dateListByFreq',
          icon: 'ios-grid',
          label: '生成日期列表',
          component: dateListByFreq
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
