<!--
 * @Autor: eobeans
 * @Date: 2021-06-06 20:16:43
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-06 21:44:25
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
					:config="config"
					stripe
					border
					height="600px"
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
          label: "名字 [自定义内容]",
          filters: ["s", "a"],
          filter: true,
          width: 170,
          renderCell: (h, { value, row, column }) => {
            return h(
              "el-button",
              {
                props: {
                  size: "small",
                  type: value.length > 2 ? "success" : "danger",
                },
                on: {
                  click: (e) => {
                    console.log(e, value);
                  },
                },
              },
              value
            );
          },
        },
        {
          prop: "china",
          label: "中国 [多级表头]",
          childrens: [
            {
              label: "省份",
              childrens: [
                {
                  prop: "city",
                  label: "城市 [控制编辑单元]",
                  filter: true,
                  width: 250,
                  edit: true,
                  editControl: (v, r, c) => {
                    if (r.sex) {
                      return false;
                    }
                    return true;
                  },
                },
              ],
            },
            {
              prop: "address",
              label: "地址",
              width: 250,
            },
          ],
        },
        {
          prop: "datetime",
          label: "时间 [日期过滤]",
          width: 200,
          filter: true,
          filterType: "datePicker",
          filterAttrs: {
            "value-format": "yyyy/MM/dd",
          },
          filterListeners: {
            change: (e) => {
              console.log("[Data filter change] filterValue:", e);
            },
          },
        },
        {
          prop: "email",
          label: "邮件",
          sortable: true,
          filter: true,
          width: 230,
          edit: true,
          editListeners: {
            focus: (event) => {
              console.log("[editListeners] [focus event]", event);
            },
          },
        },
        {
          prop: "tel",
          label: "电话[ 默认header ]",
          width: 200,
          defaultHeader: true,
          filterPlacement: "bottom",
          sortable: true,
        },
        {
          prop: "sex",
          label: "性别 [格式化显示]",
          width: 150,
          valueAsHtml: true,
          formatter: (v) => {
            return v
              ? "<span style='color:blue'>男</span>"
              : "<span style='color:red'>女</span>";
          },
        },

        {
          prop: "companyName",
          label: "公司名称 [自定义编辑组件]",
          width: 250,
          filter: true,
          edit: true,
        },
        {
          prop: "bool",
          label: "布尔值",
          width: 120,
        },
      ],
      config: {
        index: { align: "center" },
        selection: true
      },
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