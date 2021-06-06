<!--
 * @Autor: eobeans
 * @Date: 2021-06-06 01:09:14
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-06 19:14:31
 * @Version: 0.1.0
 * @Description: 
-->
<template>
	<div class="layout">
		<Layout :style="{padding: '0 12px 12px'}">
			<Content id="editTable" :style="{padding: '12px', minHeight: '280px', background: '#fff' , margin:'24px'}">
				<e-table
					ref="table"
					:pagination="{total:100}"
					:data="tableData"
					:columns="columns"
					:config="config"
					stripe
					border
					height="600px"
					:getFilters="getFilters"
					@e-filter-change="eFilterChange"
					@cell-value-change="cellValueChange"
					@pagination-current-change="pageChange"
					v-loading="loading"
				>
					<!-- el-table所有插槽功能依然保存-->
					<el-table-column label="slot">
						<template v-slot:default="{row}">
							<el-tag size="small">{{row.name}}</el-tag>
						</template>
					</el-table-column>

					<!-- append -->
					<template v-slot:append>
						<div class="append">table end append slot !</div>
					</template>

					<!-- empty -->
					<template v-slot:empty>
						<div class="empty">custom empty !</div>
					</template>
				</e-table>
			</Content>
		</Layout>
	</div>
</template>
<script>
import customCellInput from "../components/editCell/customCellInput.vue";
import { isFunction } from "@/utils/e-table.js";
import req from "@/utils/request.js";
import ETable from '../components/eTable/e-table.js'
export default {
	name: 'myEditTable',
	components: {
		ETable
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
          // "column-key": "date",
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
          label: "邮件 [下拉选择编辑]",
          sortable: true,
          filter: true,
          width: 230,
          filterType: "single",
          edit: true,
          editType: "selection", //下拉选择编辑组件
          editAttrs: {
            size: "mini",
            // clearable:true,
            options: [
              { value: "石家庄", label: "石家庄" },
              { value: "湖南", label: "湖南" },
              { value: "北京", label: "北京" },
            ],
          },
          editListeners: {
            //change 事件被覆盖为 cell-value-change 事件
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
          filters: [
            { value: "1111", text: "136788" },
            { value: "232131", text: "2123213131" },
            { value: "7332324", text: "123112321321" },
          ],
          // filterMultiple: false,
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
          editComponent: customCellInput, //自定义编辑组件
        },
        {
          prop: "bool",
          label: "布尔值",
          width: 120,
        },
      ],
      config: {
        index: { align: "center" },
        selection: true,
        // filter:false,
        // scroll:true,
      },
      getFilters: function (col, column) {
        return new Promise((resolve, reject) => {
          let data = { column: col.prop };
          req({
            url: "/filter",
            method: "post",
            data,
          })
            .then((res) => {
              resolve(res.data);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
      filtedList: {},
    };
  },
  computed: {
    filteds() {
      let fileds = [];
      for (let f in this.filtedList) {
        fileds.push(this.filtedList[f]);
      }
      return fileds;
    },
  },
	mounted(){
		this.getData();
	},
  methods: {
    pageChange(index) {
      console.log("page index", index);
      this.getData();
    },
    eFilterChange(value, column, filtedList) {
      this.filtedList = filtedList;
      console.log(value, column.property, filtedList);
      this.getData();
    },
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
    clearFilter(key) {
      this.$refs.table.clearFiltedColumn(key, function (res) {
        console.log("clear-filter", res);
      });
      this.filtedList = this.$refs.table.filtedList;
      this.getData();
    },

    clearAllFilter() {
      this.$refs.table.clearAllFiltedColumn();
      this.filtedList = this.$refs.table.filtedList;
      this.getData();
    },

    formatFiltedVlue(v, colObj) {
      if (v === "fullSelect") {
        return "全选";
      }
      if (isFunction(colObj.formatter)) {
        return colObj.formatter(v);
      }

      return v;
    },
  },
}
</script>

<style lang="scss">
$theme-color: #409eff;

$active-color: $theme-color;

$blur-color: #dcdfe6;

$danger-color: #F56C6C;

$title-color: #909399;

$withe: #ffffff;
$black: #000000;

$editCell-color: #1574911c;
$editCell-active-color: #2584e9;

$current-color:#ecf5ff;

$transition: all 0.3s;

$head-bgc: #fafafa;

$border-color:#DCDFE6;

$default-bgc: #f5f7fa;

$hover-bgc: #f5f7fa;

#editTable {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  overflow: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  // .e-table {
  //   flex: 1 1 auto;
  // }
  .nodata {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
    h3 {
      margin: 0;
      padding: 0;
      color: gray;
    }
  }
  .e-filted-list {
    list-style: none;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0px;
    padding: 3px 10px;
    max-height: 80px;
    padding-bottom: 20px;
    overflow: auto;
    li {
      position: relative;
      margin-right: 5px;
      margin-bottom: 5px;
      font-size: 12px;
      display: inline-block;
      align-items: center;
      border-radius: 4px;
      padding: 3px 5px;
      border: 1px solid #ccc;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: $title-color;
      transition: all 0.3s ease-in-out;
      div {
        display: inline;
      }
      b {
        padding-right: 3px;
      }
      &.filted-item:hover {
        cursor: pointer;
        &::before {
          opacity: 1;
          transform: translateX(0);
        }
      }
      &.filted-item::before {
        content: "Delete";
        position: absolute;
        color: #fff;
        background-color: rgba($color: $danger-color, $alpha: 0.8);
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        opacity: 0;
        line-height: 22px;
        text-align: center;
        transform: translateX(100%);
        transition: all 0.3s ease-in-out;
      }
    }
    .clear-all {
      background-color: $danger-color;
      border-color: $danger-color;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
