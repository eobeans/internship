<!--
 * @Autor: eobeans
 * @Date: 2021-06-01 23:12:26
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-05 01:44:59
 * @Version: 0.1.0
 * @Description: 
-->
<template>
	<div class="layout">
		<Layout :style="{padding: '0 12px 12px'}">
			<Content :style="{padding: '12px', minHeight: '280px', background: '#fff' , margin:'24px'}">
				<div style="height:400px">
						<dev-line-chart
							ref="zzqxtChart"
							title="非居民税收所得类型占比情况"
							:is-finished.sync="zzqxtFinished"
							:height="400"
							:data="barLineChartData"
							:chartOpt="{}"
							showLegend
						>
						</dev-line-chart>
				</div>
			</Content>
		</Layout>
	</div>
</template>
<script>
import DevLineChart from '@/components/DevLineChart'
export default {
	name: 'testDevLineChart',
	components: {
		DevLineChart: DevLineChart
	},
	data(){
		return{
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
	mounted(){},
	methods:{
	
	}
}
</script>
