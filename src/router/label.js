/*
 * @Autor: eobeans
 * @Date: 2021-06-20 18:29:57
 * @LastEditors: eobeans
 * @LastEditTime: 2021-08-09 22:02:16
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
        path:'student',
        name:'student',
        icon: 'el-icon-user-solid',
        label: '学生信息'
      },
      {
        path:'dailyrecord',
        name:'dailyrecord',
        icon: 'el-icon-star-on',
        label: '每日实习情况'
      },
      {
        path:'totation',
        name:'totation',
        icon: 'el-icon-question',
        label: '轮转科室情况'
      },
      {
        path: 'grade',
        name: 'grade',
        icon: 'el-icon-folder',
        label: '成绩考核记录'
      },
      {
        path:'diseaserecord',
        name:'diseaserecord',
        icon: 'el-icon-tickets',
        label: '诊断、操作记录'
      },
      {
        path:'disease',
        name:'disease',
        icon: 'el-icon-document-add',
        label: '病种记录表'
      },
      {
        path:'operation',
        name:'operation',
        icon: 'el-icon-mouse',
        label: '操作记录表'
      },
      {
        path: 'doctor',
        name: 'doctor',
        icon: 'el-icon-pie-chart',
        label: '医院账号管理'
      },
      {
        path: 'teacher',
        name: 'teacher',
        icon: 'el-icon-receiving',
        label: '学校教师账号管理'
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
        icon: 'ios-grid',
        label: 'html转Canvas'
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
