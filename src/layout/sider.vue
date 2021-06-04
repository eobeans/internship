<!--
 * @Autor: eobeans
 * @Date: 2021-06-03 13:29:27
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-05 01:39:32
 * @Version: 0.1.0
 * @Description: 
-->
<template>
<Sider ref="side" hide-trigger collapsible :collapsed-width="78" :style="{background: '#fff'}">
	<Menu :active-name="activeName" theme="light" width="auto" :style="{ minHeight: minHeight + 'px'}">
		<MenuItem name="attendence" @click.native="selectNav('attendence')">
			<Icon type="ios-navigate"></Icon>
			<span>考勤总览</span>
		</MenuItem>
		<MenuItem name="student" @click.native="selectNav('student')">
			<Icon type="ios-man" />
			<span>学生信息</span>
		</MenuItem>
		<MenuItem name="dailyRecord" @click.native="selectNav('dailyRecord')">
			<Icon type="ios-paper" />
			<span>每日实习情况</span>
		</MenuItem>
		<MenuItem name="totation" @click.native="selectNav('totation')">
			<Icon type="ios-loading" />
			<span>轮转科室情况</span>
		</MenuItem>
		<MenuItem name="grade" @click.native="selectNav('grade')">
			<Icon type="ios-flag" />
			<span>成绩考核记录</span>
		</MenuItem>
		<MenuItem name="diseaserecord" @click.native="selectNav('diseaserecord')">
			<Icon type="ios-create" />
			<span>诊断、操作记录</span>
		</MenuItem>
		<MenuItem name="disease" @click.native="selectNav('disease')">
			<Icon type="ios-pulse" />
			<span>病种记录表</span>
		</MenuItem>
		<MenuItem name="operation" @click.native="selectNav('operation')">
			<Icon type="ios-copy" />
			<span>操作记录表</span>
		</MenuItem>
		<MenuItem name="doctor" @click.native="selectNav('doctor')">
			<Icon type="ios-analytics" />
			<span>医院账号管理</span>
		</MenuItem>
		<MenuItem name="teacher" @click.native="selectNav('teacher')">
			<Icon type="ios-school" />
			<span>学校教师账号管理</span>
		</MenuItem>
		<MenuItem name="mytest" @click.native="selectNav('mytest')">
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
			activeName: '1-1'
		}
	},
	mounted(){
		// console.log(this.$router.currentRoute.name)
		this.activeName = this.$router.currentRoute.name
	},
	methods:{
		selectNav(val){
			this.$router.push('/'+ val)
		},
	}
}
</script>