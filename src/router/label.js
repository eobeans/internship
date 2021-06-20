/*
 * @Autor: eobeans
 * @Date: 2021-06-20 18:29:57
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-20 18:33:52
 * @Version: 0.1.0
 * @Description: 
 */
const routes = [
  {
    path: '/',
    name: 'layout',
    icon: 'ios-navigate',
    label: '首页',
    children: [
      {
        path:'attendence',
        name:'attendence',
        icon: 'ios-navigate',
        label: '考勤总览'
      },
      {
        path:'student',
        name:'student',
        icon: 'ios-man',
        label: '学生信息'
      },
      {
        path:'dailyrecord',
        name:'dailyrecord',
        icon: 'ios-paper',
        label: '每日实习情况'
      },
      {
        path:'totation',
        name:'totation',
        icon: 'ios-loading',
        label: '轮转科室情况'
      },
      {
        path: 'grade',
        name: 'grade',
        icon: 'ios-flag',
        label: '成绩考核记录'
      },
      {
        path:'diseaserecord',
        name:'diseaserecord',
        icon: 'ios-create',
        label: '诊断、操作记录'
      },
      {
        path:'disease',
        name:'disease',
        icon: 'ios-pulse',
        label: '病种记录表'
      },
      {
        path:'operation',
        name:'operation',
        icon: 'ios-copy',
        label: '操作记录表'
      },
      {
        path: 'doctor',
        name: 'doctor',
        icon: 'ios-analytics',
        label: '医院账号管理'
      },
      {
        path: 'teacher',
        name: 'teacher',
        icon: 'ios-school',
        label: '学校教师账号管理'
      },
      {
        path: 'mytest',
        name: 'mytest',
        icon: 'md-snow',
        label: '我的测试'
      },
      {
        path: 'editTable',
        name: 'editTable',
        icon: 'ios-list-box',
        label: '可编辑表格'
      },
      {
        path: 'simpleEditTable',
        name: 'simpleEditTable',
        icon: 'ios-grid',
        label: '简易可编辑表格'
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    icon: 'ios-navigate',
    label: '登入'
  },
  {
    path: '/register',
    name: 'register',
    icon: 'ios-navigate',
    label: '注册'
  },
]

export default routes
