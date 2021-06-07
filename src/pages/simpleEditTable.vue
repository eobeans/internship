<!--
 * @Autor: eobeans
 * @Date: 2021-06-06 20:16:43
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-07 21:11:04
 * @Version: 0.1.0
 * @Description: 
-->
<template>
	<div id="mySEditTable" class="layout">
		<Layout :style="{padding: '0 12px 12px'}">
			<Content id="editTable" :style="{padding: '12px', minHeight: '280px', background: '#fff' , margin:'24px'}">
        <s-e-table
          ref="table"
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
      tableData: [],
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
	mounted(){
		this.getData();
	},
  methods: {
    cellValueChange(v, row, column, columnObj) {
      console.log("change", v);
    },
    getData() {
      this.loading = true;
      let data = {
        pageIndex: 1,
        pageSize: 100,
      };
      req({
        url: "/Getlist",
        method: "post",
        data,
      }).then((res) => {
        this.tableData = res.rows;
        this.loading = false;
      });
    },
  }
}
</script>