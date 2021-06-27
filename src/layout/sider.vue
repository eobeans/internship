<!--
 * @Autor: eobeans
 * @Date: 2021-06-03 13:29:27
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-27 23:46:38
 * @Version: 0.1.0
 * @Description: 
-->
<script>
// import setting from '../setting'
import routes from '../router/label.js'
const cloneDeep = require('lodash/cloneDeep')
import { Sider, Submenu, MenuItem, Menu } from 'view-design';

export default {
	name: 'MySider',
	inheritAttrs: false,
	
	components: {
		'Sider': Sider,
		'Submenu': Submenu,
		'MenuItem': MenuItem,
		'Menu': Menu
	},
	data(){
		return{    
			minHeight:0,
			activeName: '1-1'
		}
	},
	render(h) {
		const _this = this
		const myRoutes = cloneDeep(routes)
		const createMenus = function () {
			return (
				myRoutes.map(function(route) {
					if (route.name === 'login' || route.name === 'register'){
						console.log('login or register')
					} else {
						console.log('Submenu')
						return (
							<Submenu name={route.name}>
								<template slot="title">
										<icon type={route.icon} />
										{route.label}
								</template>
								{route.children&&route.children.length > 0 ? createMenuItem(route.children) : null}
							</Submenu>
						)
					}
				})
			)
		}
		const createMenuItem = function(routeChild) {
			console.log('MenuItem')
			return (
				routeChild.map(function(item) {
					<MenuItem name={item.name} on-click_native={_this.selectNav(item.name)}>
						<icon type={item.icon} />
						<span>{item.label}</span>
					</MenuItem>
				})
			)
		}
		return (
			<Sider ref="side" hide-trigger collapsible collapsed-width="78" style="{background: '#fff'}">
				<Menu active-name={_this.activeName} theme="light" width="auto" style="{ minHeight: minHeight + 'px'}">
					{createMenus}
				</Menu>
			</Sider>
		)
	},
	mounted(){
		this.activeName = this.$router.currentRoute.name
	},
	methods:{
		selectNav(val){
			this.$router.push('/'+ val)
		}
	}
}
</script>
