import { cloneDeep } from '@pureadmin/utils'

export default {
  props: {
    mode: { type: String, default: "add" },
    dialogForm: { type: Array, default: () => { } },
    formOption: { type: Object, default: () => { } }
  },
  data() {
    return {
      //表单数据 
      form: {},
      //验证规则 
      rules: {},
      userDialogForm: cloneDeep(this.dialogForm),
      userFormOption: this.formOption
    }
  },
  mounted() {
    this.userDialogForm.map(item => {
      this.form[item.value] = ''
    })
  },
  methods: {
    //表单提交方法 
    submit(callback) {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          callback(this.form)
        } else {
          return false;
        }
      })
    },
    //表单注入数据 
    setData(data) {
      Object.assign(this.form, data)
      // console.log(this.form)
    }
  },
  render() {
    const that = this
    const formEle = (
      <el-form model={that.form} rules={that.rules} disabled={that.mode == 'show'} ref="dialogForm" label-width="152px">
        <el-row gutter={10} style="margin: 0; width: 100%;">
          {
            that.userDialogForm.map((item,index) => {
              let titleItem = null
              if (item.label == '登记号') {
                titleItem = <el-col span={24} style="font-size: 20px;font-weight: bold;">基本信息</el-col>
              } else if (item.label == '举报单位名称') {
                titleItem = [
                  <el-col span={24} style="font-size: 20px;font-weight: bold;">案源提供人</el-col>,
                  <el-col span={24} style="font-size: 17px;font-weight: bold;">&ensp;投诉人、举报人</el-col>,
                  <el-col span={24} style="font-size: 14px;font-weight: bold;">&ensp;&ensp;单位</el-col>
                ]
              } else if (item.label == '举报人姓名') {
                titleItem = <el-col span={24} style="font-size: 14px;font-weight: bold;">&ensp;&ensp;个人</el-col>
              } else if (item.label == '移交部门名称') {
                titleItem = <el-col span={24} style="font-size: 20px;font-weight: bold;">&ensp;移送交办部门</el-col>
              } else if (item.label == '当事人姓名') {
                titleItem = <el-col span={24} style="font-size: 20px;font-weight: bold;">当事人</el-col>
              } else if (item.label == '案源内容') {
                titleItem = <el-col span={24} style="font-size: 20px;font-weight: bold;">内容</el-col>
              } else if (item.label == '案源处理意见') {
                titleItem = <el-col span={24} style="font-size: 20px;font-weight: bold;">处理意见</el-col>
              } else if (item.label == '备注') {
                titleItem = <el-col span={24} style="font-size: 20px;font-weight: bold;">其它</el-col>
              }
              let eleItem = null
              switch(item.type) {
                case 'input':
                  eleItem = (
                    <el-col span={12} key={index}>
                      <el-form-item label={item.label}>
                        <el-input clearable v-model={that.form[item.value]}></el-input>
                      </el-form-item>
                    </el-col>
                  )
                  break
                case 'textarea':
                  eleItem = (
                    <el-col span={24} key={index}>
                      <el-form-item label={item.label}>
                        <el-input clearable v-model={that.form[item.value]} type="textarea"></el-input>
                      </el-form-item>
                    </el-col>
                  )
                  break
                case 'radio':
                  eleItem = (
                    <el-col span={12} key={index}>
                      <el-form-item label={item.label}>
                      <el-radio-group v-model={that.form[item.value]}>
                        {
                          that.userFormOption[item.value].map((op,ind) => {
                            return (
                              <el-radio key={item.value + ind} label={op.value}>{ op.label }</el-radio>
                            )
                          })
                        }
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  )
                  break
                case 'select':
                  eleItem = (
                    <el-col span={12} key={index}>
                      <el-form-item label={item.label}>
                        <el-select v-model={that.form[item.value]} placeholder={`请选择${item.label}`} filterable clearable>
                        {
                          that.userFormOption[item.value].map((op,ind) => {
                            return (
                              <el-option  key={item.value + ind} label={op.label} value={op.value}></el-option>
                            )
                          })
                        }
                        </el-select>
                      </el-form-item>
                    </el-col>
                  )
                  break
                case 'date':
                  eleItem = (
                    <el-col span={12} key={index}>
                      <el-form-item label={item.label}>
                      <el-date-picker type="date" v-model={that.form[item.value]} placeholder="请选择时间" value-format="YYYY-MM-DD"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  )
                  break
                case 'datetime':
                  eleItem = (
                    <el-col span={12} key={index}>
                      <el-form-item label={item.label}>
                      <el-date-picker type="datetime" v-model={that.form[item.value]} placeholder="请选择时间"value-format="YYYY-MM-DD HH:mm:ss"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  )
                  break
                case 'selectMul':
                  eleItem = (
                    <el-col span={12} key={index}>
                      <el-form-item label={item.label}>
                        <el-select v-model={that.form[item.value]} placeholder={'请选择' + item.label} filterable clearable multiple collapse-tags>
                        {
                          that.userFormOption[item.value].map((op,ind) => {
                            return (
                              <el-option  key={item.value + ind} label={op.label} value={op.value}></el-option>
                            )
                          })
                        }
                        </el-select>
                      </el-form-item>
                    </el-col>
                  )
                  break
                case 'dateRange':
                  eleItem = (
                    <el-col span={24} key={index}>
                      <el-form-item label={item.label}>
                        <el-date-picker v-model={that.form[item.value]} type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss"
                          range-separator="至" start-placeholder="开始时间" end-placeholder="结束结束">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  )
                  break
                default:
                  break
              }
              return [titleItem, eleItem]
            })
          }
        </el-row>
      </el-form>
    )
    return formEle
  }
} 
