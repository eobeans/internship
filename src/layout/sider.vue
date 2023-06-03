<!--
 * @Autor: eobeans
 * @Date: 2021-06-03 13:29:27
 * @LastEditors: eobeans
 * @LastEditTime: 2021-08-11 22:03:31
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
			activeName: ''
		}
	},
	render(h) {
		const _this = this
		const myRoutes = cloneDeep(routes)
		console.log('myRoutes', myRoutes)
		return (
			<el-aside width="208px">
				<el-menu on-select={_this.selectNav} class="sider-menu">
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
												console.log('route.children', item.path)
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
		)
	},
	mounted(){
		// console.log(this.$router.currentRoute)
		if (this.$router.currentRoute.name) {
			this.activeName = this.$router.currentRoute.name
		}
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
<style lang="scss">
.sider-menu {
  height: calc(100vh - 64px);
  overflow-y: auto;
}
</style>