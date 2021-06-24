<!--
 * @Autor: eobeans
 * @Date: 2021-06-01 23:12:26
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-24 21:12:57
 * @Version: 0.1.0
 * @Description: 
-->
<script>
import Vue from 'vue'
import DevLineChart from '@/components/DevLineChart'
import { Layout, Content } from 'view-design';

export default {
	name: 'testDevLineChart',
	components: {
		'DevLineChart': DevLineChart,
		'Layout': Layout,
		'Content': Content
	},
	data(){
		return{
			componentName: 'DevLineChart',
			zzqxtFinished: false,
			barLineChartData: [
				{
					name: '2020',
					data: [
						{
							name: '1月',
							value: 50
						},
						{
							name: '2月',
							value: 50
						},
						{
							name: '3月',
							value: 50
						},
						{
							name: '4月',
							value: 50
						},
					]
				},
				{
					name: '2021',
					data: [
						{
							name: '1月',
							value: 100
						},
						{
							name: '2月',
							value: 100
						},
						{
							name: '3月',
							value: 100
						},
						{
							name: '4月',
							value: 100
						},
					]
				}
			],
		}
	},
	render(h){
		return (
			<div class="layout">
				<Layout style="{padding: '0 12px 12px'}">
					<Content style="{padding: '12px', minHeight: '280px', background: '#fff' , margin:'24px'}">
						<div style="height:400px">
							{
								h(this.componentName,
									{
										ref:"zzqxtChart",
										title:"类型占比情况",
										isFinished_sync: this.zzqxtFinished,
										height: 400,
										data: this.barLineChartData,
										chartOpt: {},
										showLegend: true
									}
								)
							}
						</div>
					</Content>
				</Layout>
			</div>
		)
	}
}
</script>
