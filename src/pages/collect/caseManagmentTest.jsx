import { isUnDef, isNull, isIncludeAllChildren, isArray } from '@pureadmin/utils'
import saveDialog from './save'

export default {
  name: 'caseManagmentTest',
	components: {
		saveDialog
	},
  data() {
    return {
			keyId: null,
			keyUrl: null, // 自定义关键词
			apiObj: null,
			// 表格选择项 
			selection: [],
			// 查询参数 
			queryParams: {},
			// 保存弹出窗显示控制 
			saveDialogVisible: false,
			// 保存模式 add edit show 
			saveMode: 'add',
			titleMap: {
				add: "新增案源来源",
				edit: "编辑案源来源",
				show: "查看案源来源"
			},
			isSaveing: false
		}
  },
  computed: {
    pageJson() {
      return this.$store.state.diyPage.pageJson[this.keyUrl]
    },
		pageJsonReady: {
			get() {
				if (this.keyUrl) {
					const data = this.$store.state.diyPage.pageJson[this.keyUrl]
					if (!isUnDef(data)) {
						if (isIncludeAllChildren(['search','column','dialogForm','urlOption'], Object.keys(data))) {
							if (data.search.length !== 0 &&
								data.column.length !== 0 &&
								data.dialogForm.length !== 0) {
								return true
							} else {
								return false
							}
						}
					} 
				}
				return false
			}
		}
	},
  async created() {
		this.apiObj = this.$API.caseManagment.list
		// this.keyUrl = this.$route.meta.keyUrl
    this.keyUrl = 'smartMarketCaseSource'

		const params = { keyUrl: this.keyUrl, keyType: 'page' }
		const res = await this.$API.system.diyPage.view.get(params)
		if (res.code == 200) {
			if (isNull(res.data)) {
				// 设置默认值
				this.$store.commit("setDefaultPageJson", this.keyUrl)
			} else {
				this.$store.commit("setPageJson", res.data)
			}
		} else {
			this.$message.error('初始化配置失败')
		}
	},
	mounted() {
		if (this.pageJsonReady) {
			this.keyId = this.pageJson.urlOption.keyId
		} else {
			this.keyId = this.keyUrl.substring(11,12).toLowerCase() + this.keyUrl.substring(12) + 'Id'
		}
		this.handleQuery()
	},
  methods: {
		//添加 
		add() {
			this.saveMode = 'add';
			this.saveDialogVisible = true;
		},
		//编辑 
		async tableEdit(row) {
			this.saveMode = 'edit';
			this.saveDialogVisible = true;
			let res = await this.$API.caseManagment.view.get(this.keyUrl, row[this.keyId])
			if (res.code === 200) {
				this.$nextTick(() => {
					this.$refs.saveDialog.setData(res.data)
				})
			} else {
				this.$alert(res.msg, "提示", { type: 'error' })
				this.$nextTick(() => {
					//这里可以再次根据ID查询详情接口
					this.$refs.saveDialog.setData(row)
				})
			}
		},
		//查看 
		async tableShow(row) {
			this.saveMode = 'show';
			this.saveDialogVisible = true;
			let res =  await this.$API.caseManagment.view.get(this.keyUrl, row[this.keyId])
			if (res.code === 200) {
				this.$nextTick(() => {
					this.$refs.saveDialog.setData(res.data)
				})
			} else {
				this.$alert(res.msg, "提示", { type: 'error' })
				this.$nextTick(() => {
					//这里可以再次根据ID查询详情接口
					this.$refs.saveDialog.setData(row)
				})
			}
		},
		//删除 
		async tableDel(row) {
			let res = await this.$API.caseManagment.remove.delete(this.keyUrl, row[this.keyId]);
			if (res.code == 200) {
				//这里选择刷新整个表格 OR 插入/编辑现有表格数据 
				this.handleQuery()
				this.$message.success("删除成功")
			} else {
				this.$alert(res.msg, "提示", { type: 'error' })
			}
		},
		//批量删除 
		batchDel() {
			this.$confirm(`确定删除选中的 ${this.selection.length} 项吗？`, '提示', {
				type: 'warning'
			}).then(async() => {
				const loading = this.$loading();
				let ids = this.selection.map(it => {return it[this.keyId]}).join(',')
				let res = await this.$API.caseManagment.remove.delete(this.keyUrl, ids);
				if (res.code == 200) {
					//这里选择刷新整个表格 OR 插入/编辑现有表格数据 
					this.handleQuery()
					this.$message.success("删除成功")
				} else {
					this.$alert(res.msg, "提示", { type: 'error' })
				}
				loading.close();
			}).catch((error) => {
				this.$alert(error, "提示", { type: 'error' })
			})
		},
		//提交 
		saveForm() {
			this.$refs.saveDialog.submit(async (formData) => {
				this.isSaveing = true;
				let res = null
				if (this.saveMode === 'add') {
					res = await this.$API.caseManagment.add.post(this.keyUrl, formData);
				}
				else if (this.saveMode === 'edit') {
					res = await this.$API.caseManagment.edit.put(this.keyUrl, formData);
				} else {
					res = { code: 100, message: '提交错误' }
				}
				this.isSaveing = false;
				if (res.code == 200) {
					//这里选择刷新整个表格 OR 插入/编辑现有表格数据 
					this.handleQuery()
					this.saveDialogVisible = false;
					this.$message.success("操作成功")
				} else {
					this.$alert(res.msg, "提示", { type: 'error' })
				}
			})
		},
		//表格选择后回调事件 
		selectionChange(selection) {
			this.selection = selection;
		},
		// 参数格式化 数组化为字符串
		parseSearchParams(params) {
			// console.log(params)
			let query = {}
			Object.keys(params).map(key => {
				if (isArray(params[key])) {
					query[key] = params[key].join(',')
				} else {
					query[key] = params[key]
				}
			})
			params.page = 1
			return query
		},
		//搜索  
		handleQuery() {
			this.$refs["asSearch"] && this.$refs["asSearch"].handleClose()
			const params = this.parseSearchParams(this.queryParams)
			this.$nextTick(() => {
				this.$refs["asTable"] && this.$refs["asTable"].upData(params)
			})
			
		},
		resetQuery() {
			Object.keys(this.queryParams).map(key => {
        this.queryParams[key] = null
      })
			this.$refs["asSearch"].handleReset()
			this.$nextTick(() => {
				this.handleQuery()
			})
		}
	},
  render() {
    const that = this
    const baseEle = (
      <el-container>
        <el-header style="height: auto;">
          <div class="panel-wrapper">
            <div class="form-panel">
              <as-search ref="asSearch" v-model={that.queryParams} keyUrl={that.keyUrl}>
                <el-row justify="end">
                  <el-col span={12}>
                    <el-form-item label="">
                      <el-button type="primary" icon="el-icon-search" onClick="handleQuery">查询</el-button>
                      <el-button icon="el-icon-refreshLeft" onClick="resetQuery">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </as-search>
            </div>
            <div class="btn-wrapper">
              <div class="left-panel">
                <el-button v-auth="`createByJson:${this.keyUrl}:add`" type="primary" icon="el-icon-plus" onClick={that.add}>新增</el-button>
                <el-button v-auth="`createByJson:${this.keyUrl}:remove`" type="danger" plain icon="el-icon-delete"
                  disabled={that.selection.length == 0} onClick={that.batchDel}>
                  删除
                </el-button>
              </div>
              <div class="right-panel">
                <div class="right-panel-search">
                  <el-button type="primary" icon="el-icon-search" onClick={that.handleQuery}>查询</el-button>
                  <el-button icon="el-icon-refreshLeft" onClick={that.resetQuery}>重置</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-header>
        <el-main class="nopadding">
          <asTable ref="asTable" keyUrl={that.keyUrl} apiObj={that.apiObj} row-key="id" on-selection-change={that.selectionChange}>

            <el-table-column type="selection" width="50"></el-table-column>

            <el-table-column label="操作" fixed="right" align="center" width="140">
              {
                (scope) => {
                  return (
                    <div>
                      <el-button type="primary" link size="small" onClick={()=>that.tableShow(scope.row, scope.$index)}>查看</el-button>
                      <el-button v-auth={`createByJson:${that.keyUrl}:edit`} type="primary" link size="small" onClick={()=>that.tableEdit(scope.row, scope.$index)}>编辑</el-button>
                      <el-popconfirm title="确定删除吗？" on-confirm={()=>that.tableDel(scope.row)}>
                        {{
                          reference: () => <el-button v-auth={`createByJson:${that.keyUrl}:remove`} type="danger" link size="small">删除</el-button>
                        }}
                      </el-popconfirm>
                    </div>
                  )
                }
              }
            </el-table-column>

          </asTable>

        </el-main>
      </el-container>
    )
    const dialogEle = (
      <el-dialog title={that.titleMap[that.saveMode]} v-model={that.saveDialogVisible} width="50%" destroy-on-close>
        {{
          default: () => <save-dialog ref="saveDialog" mode={that.saveMode} dialogForm={that.pageJson.dialogForm} formOption={that.pageJson.searchOption}></save-dialog>,
          footer: () => {
            const saveBtn = that.saveMode != 'show'
              ? <el-button type="primary" loading={that.isSaveing}
                  v-optimize={{ event: 'click', fn: that.saveForm, immediate: true, timeout: 1000 }}>保 存</el-button>
              : null
            return [
              <el-button onClick={()=>{that.saveDialogVisible = false}}>取 消</el-button>,
              saveBtn
            ]
          }
        }}
      </el-dialog>
    )
    return that.pageJsonReady ? [baseEle, dialogEle] : null
  }
}
