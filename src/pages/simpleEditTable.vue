<!--
 * @Autor: eobeans
 * @Date: 2021-06-06 20:16:43
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-08 23:27:31
 * @Version: 0.1.0
 * @Description: 
-->
<template>
	<div id="mySEditTable" class="layout">
		<Layout :style="{padding: '0 12px 12px'}">
			<Content id="editTable" :style="{padding: '12px', minHeight: '280px', background: '#fff' , margin:'24px'}">
        <s-e-table
					:data="tableData"
					:columns="columns"
					@cell-value-change="cellValueChange"
					v-loading="loading"
        >
        </s-e-table>
			</Content>
		</Layout>
	</div>
</template>
<script>
import req from "@/utils/request.js";
import SETable from '../components/sETable/index.js'
export default {
  name: 'mySEditTable',
  components: {
		SETable
	},
  data() {
    return {
      loading: false,
      tableData: [
        {
          "jan": 123,
          "sec": 124,
          mar: 125,
          apr: 236,
          name: 2019
        },
        {
          "jan": 323,
          "sec": 224,
          mar: 165,
          apr: 236,
          name: 2020
        },
        {
          "jan": 143,
          "sec": 154,
          mar: 185,
          apr: 136,
          name: '计划'
        }
      ],
      columns: [
        {
          prop: "name",
          label: "name",
        },
        {
          prop: "jan",
          label: "jan"
        },
        {
          prop: "sec",
          label: "sec"
        },
        {
          prop: "mar",
          label: "mar"
        },
        {
          prop: "apr",
          label: "apr"
        }
      ]
    };
  },
	mounted(){ },
  methods: {
    cellValueChange(v, row, column, columnObj) {
      console.log("change", v);
    }
  }
}
</script>