<!--
 * @Autor: eobeans
 * @Date: 2021-06-06 01:09:14
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-06 01:22:58
 * @Version: 0.1.0
 * @Description: 
-->
<template>
	<div class="layout">
		<Layout :style="{padding: '0 12px 12px'}">
			<Content :style="{padding: '12px', minHeight: '280px', background: '#fff' , margin:'24px'}">
				<div style="height:400px">
					<!-- <editable-table :columns='columns'></editable-table> -->
				</div>
			</Content>
		</Layout>
	</div>
</template>
<script>
// import EditableTable from '../components/EditableTable.vue'
export default {
	name: 'editTable',
	components: {
		// EditableTable: EditableTable
	},
	data(){
		return{
      columns:[
        {
          prop:'name',
          label:'姓名',
          
          edit:true, //该列开启可编辑模式
          editType:'selection', //选择编辑形式，默认default,即input框 可以不写该属性
          editControl:function(value,row,column){return true} ,//更精确控制该列每个单元格是否可编辑
          editComponent:customCompontent,//可以传入自定义编辑组件
          editAttrs: {size:'mini'},// 可以传入属性
          editListeners: { focus:function(){}} //可接受事件 
        }
      ]
		}
	},
	mounted(){},
	methods:{
	
	}
}
</script>