<!--
 * @Autor: eobeans
 * @Date: 2021-06-03 13:29:27
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-20 19:06:52
 * @Version: 0.1.0
 * @Description: 
-->
<template>
  <div>
		{{createMySider()}}
  </div>
</template>
<script>
// import setting from '../setting'
import routes from '../router/label.js'
const cloneDeep = require('lodash/cloneDeep')

export default {
	name: 'MySider',
	inheritAttrs: false,
	
	data(){
		return{    
			minHeight:0,
			activeName: '1-1'
		}
	},
	mounted(){
		this.activeName = this.$router.currentRoute.name
	},
	methods:{
		createMySider() {
			console.log('sider render')
			const _this = this
			return (
				<i-sider ref="side" hide-trigger collapsible collapsed-width="78" style="{background: '#fff'}">
					<i-menu active-name={_this.activeName} theme="light" width="auto" style="{ minHeight: minHeight + 'px'}">
						{_this.createMenus()}
					</i-menu>
				</i-sider>
			)
		},
		createMenus() {
			console.log('createMenus', routes)
			const myRoutes = cloneDeep(routes)
			const _this = this
			
			return (
				myRoutes.map((route) => {
					if (route.name === 'login' || route.name === 'register'){
						console.log('login or register')
					} else {
						return (
							<i-sub-menu name={route.name}>
								<template slot="title">
										<icon type={route.icon} i-/>
										{route.label}
								</template>
								{route.children&&route.children.length > 0 ? _this.createMenuItem(route.children) : null}
							</i-sub-menu>
						)
					}
				})
			)
		},
		createMenuItem(routeChild) {
			if(!routeChild) {
				return
			}
			const _this = this
			console.log('createMenuItem')
			return (
				routeChild.map((item) => {
					<i-menu-item name={item.name} on-click_native={_this.selectNav(item.name)}>
						<icon type={item.icon} />
						<span>{item.label}</span>
					</i-menu-item>
				})
			)
		},
		selectNav(val){
			this.$router.push('/'+ val)
		}
	}
}
</script>
