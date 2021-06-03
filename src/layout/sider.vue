<!--
 * @Autor: eobeans
 * @Date: 2021-06-03 13:29:27
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-03 22:26:48
 * @Version: 0.1.0
 * @Description: 
-->
<template>
	<Sider ref="side" hide-trigger collapsible :collapsed-width="78" :style="{background: '#fff'}">
		<Menu active-name="1-10" theme="light" width="auto" :style="{ minHeight: minHeight + 'px'}">
			<MenuItem name="1-1" @click.native="selectNav(1)">
				<Icon type="ios-navigate"></Icon>
				<span>考勤总览</span>
			</MenuItem>
			<MenuItem name="1-2" @click.native="selectNav(2)">
				<Icon type="ios-man" />
				<span>学生信息</span>
			</MenuItem>
			<MenuItem name="1-3" @click.native="selectNav(3)">
				<Icon type="ios-paper" />
				<span>每日实习情况</span>
			</MenuItem>
			<MenuItem name="1-4" @click.native="selectNav(4)">
				<Icon type="ios-loading" />
				<span>轮转科室情况</span>
			</MenuItem>
			<MenuItem name="1-5" @click.native="selectNav(5)">
				<Icon type="ios-flag" />
				<span>成绩考核记录</span>
			</MenuItem>
			<MenuItem name="1-6" @click.native="selectNav(6)">
				<Icon type="ios-create" />
				<span>诊断、操作记录</span>
			</MenuItem>
			<MenuItem name="1-7" @click.native="selectNav(7)">
				<Icon type="ios-pulse" />
				<span>病种记录表</span>
			</MenuItem>
			<MenuItem name="1-8" @click.native="selectNav(8)">
				<Icon type="ios-copy" />
				<span>操作记录表</span>
			</MenuItem>
			<MenuItem name="1-9" @click.native="selectNav(9)">
						<Icon type="ios-analytics" />
						<span>医院账号管理</span>
			</MenuItem>
			<MenuItem name="1-10" @click.native="selectNav(10)">
				<Icon type="ios-school" />
				<span>学校教师账号管理</span>
			</MenuItem>
			<MenuItem name="1-11" @click.native="selectNav(11)">
				<Icon type="ios-school" />
				<span>我的测试</span>
			</MenuItem>
		</Menu>
	</Sider>
</template>
<script>
    import setting from '../setting'
    export default {
    name: 'mySider',
    data(){
        return{    
        minHeight:0,
        }
    },
    mounted(){},
    methods:{
      selectNav(val){
        let _this=this
        switch(val)
        {
          case 1:
              _this.$router.push('/attendence')
              break
          case 2:
              _this.$router.push('/student')
              break
          case 3:
              _this.$router.push('/dailyRecord')
              break
          case 4:
              _this.$router.push('/totation')
              break
          case 5:
              _this.$router.push('/grade')
              break
          case 6:
              _this.$router.push('/diseaserecord')
              break
          case 7:
              _this.$router.push('/disease')
              break
          case 8:
              _this.$router.push('/operation')
              break
          case 9:
              _this.$router.push('/doctor')
              break
          case 10:
              _this.$router.push('/teacher')
              break
          case 11:
              _this.$router.push('/mytest')
              break
          default:
              _this.$Message.error('发生了意料之外的错误')
              break
        }
      },
    }
    }
</script>