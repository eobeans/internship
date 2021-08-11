<!--
 * @Autor: eobeans
 * @Date: 2021-06-03 13:29:27
 * @LastEditors: eobeans
 * @LastEditTime: 2021-08-10 22:29:50
 * @Version: 0.1.0
 * @Description: 
-->
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
	render(h) {
		const _this = this
		const myRoutes = cloneDeep(routes)
		// console.log('myRoutes', myRoutes)
		return (
			<el-container style="min-width: 220px;">
				<el-aside style="min-width: 220px;">
					<el-menu on-select={_this.selectNav}>
						{
							myRoutes.map((route) => {
								if (route.children&&route.children.length > 0) {
									// console.log('route.children', route.children)
									return (
										<el-submenu index={route.path}>
											<template slot="title">
												<i class={route.icon}></i>
												{route.label}
											</template>
											{
												route.children.map((item) => {
													return (
														<el-menu-item index={item.path}>
															<i class={item.icon}></i>
															<span>{item.label}</span>
														</el-menu-item>
													)
												})
											}
										</el-submenu>
									)
								} else {
									// console.log(route.name)
									return (
										<el-menu-item index={route.path}>
											<template slot="title">
												<i class={route.icon}></i>
												{route.label}
											</template>
										</el-menu-item>
									)
								}
							})
						}
					</el-menu>
				</el-aside>
			</el-container>
		)
	},
	mounted(){
		// this.activeName = this.$router.currentRoute.name
	},
	methods: {
		selectNav(index, indexPath) {
			// console.log('selectNav', index, indexPath)
			let menuPath = ''
			for (let ind = 0; ind < indexPath.length; ind++) {
				menuPath += '/'  + indexPath[ind]
			}
			this.$router.push(menuPath)
		}
	}
}
</script>
