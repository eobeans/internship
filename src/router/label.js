/*
 * @Autor: eobeans
 * @Date: 2021-06-20 18:29:57
 * @LastEditors: eobeans
<<<<<<< HEAD
 * @LastEditTime: 2021-09-25 19:45:25
=======
 * @LastEditTime: 2021-08-15 17:15:33
>>>>>>> develop
 * @Version: 0.1.0
 * @Description: 
 */
const routes = [
  {
    path: '',
    name: 'layout',
    icon: 'el-icon-platform-eleme',
    label: '首页',
    children: [
      {
        path:'attendence',
        name:'attendence',
        icon: 'el-icon-s-tools',
        label: '考勤总览'
      },
      {
        path: 'mytest',
        name: 'mytest',
        icon: 'el-icon-office-building',
        label: '我的测试'
      },
      {
        path: 'editTable',
        name: 'editTable',
        icon: 'el-icon-female',
        label: '可编辑表格'
      },
      {
        path: 'simpleEditTable',
        name: 'simpleEditTable',
        icon: 'el-icon-chat-dot-square',
        label: '简易可编辑表格'
      },
      {
        path: 'wyyzmd',
        name: 'wyyzmd',
        icon: 'el-icon-s-finance',
        label: '走马灯'
      },
      {
        path: 'htmlToCanvas',
        name: 'htmlToCanvas',
        icon: 'el-icon-s-unfold',
        label: 'html转Canvas'
      },
      {
        path: 'dateListByFreq',
        name: 'dateListByFreq',
        icon: 'ios-grid',
        label: '生成日期列表'
      },
      {
        path: 'luckyexcel',
        name: 'luckyexcel',
        icon: 'ios-grid',
        label: 'webExcel'
      },
      {
        path: 'jspreadsheetCE',
        name: 'jspreadsheetCE',
        icon: 'ios-grid',
        label: 'jspreadsheetCE'
      },
      {
        path: 'floatBall',
        name: 'floatBall',
        icon: 'ios-grid',
        label: 'floatBall'
      },
    ]
  },
  {
    path: 'login',
    name: 'login',
    icon: 'el-icon-s-help',
    label: '登入'
  },
  {
    path: 'register',
    name: 'register',
    icon: 'el-icon-s-shop',
    label: '注册'
  },
]

export default routes
