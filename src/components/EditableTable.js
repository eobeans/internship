/*
 * @Autor: eobeans
 * @Date: 2021-06-05 15:33:55
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-06 01:14:56
 * @Version: 0.1.0
 * @Description: 可编辑表格
 */
Vue.component('editable-table', {
  render: function (createElement) {
    let _this = this;
    columnRender = function(col,h) {
      if(!Object.prototype.hasOwnProperty.call(col, 'childrens')) {
        return h('el-table-column',
          {
            props: { ...col },
            scopedSlots: {
              default:function (props) { //改写默认内容
                let { row, column } = props;

                let funControl = isFunction(col.editControl) ? col.editControl.call(null, row[col.prop], row, column) : true; //控制每个单元格的可编辑性
                let isCan = (_this.tableConfig.cellEdit !== false && col.edit && funControl) ? true : false;

                //生成可编辑表格的具体位置集合 点击单元格时匹配，显示编辑框
                isCan ? _this.setEditMap({ x: row.rowIndex, y: column.property }) : null;
                // 点击单元格满足条件显示编辑框
                if (isCan && _this.editX === row.rowIndex && _this.editY === column.property){
                  let options = { // .... props 和 listeners 的绑定 
                    attrs: {
                      ...col.editAttrs
                    },
                    props: { //给编辑组件传递数据
                      value_: row[col.prop],
                      column: column,
                      columnObj: col,
                      row: row
                    },
                    on: {
                      ...col.editListeners,
                      setValue: (v) => { //改变单元格原数据，自定义编辑组件也应提供这个事件来改变原数据
                        row[col.prop] = v
                      },
                      change: (v) => { //覆盖change事件，转移到table主体事件
                        _this.$emit('cell-value-change', v, row, column, col)
                      }
                    }
                  }
                  //使用自定义编辑组件
                  if (col.editComponent && typeof col.editComponent === 'object') {
                      return h(col.editComponent, options)
                  } else { //使用内部自带编辑组件
                      return h(editComponents[col.editType || 'default'], options)
                  }
                }
              }
            }
          }
        )
      }else{
        if (Array.isArray(col.childrens) && col.childrens.length > 0) {
            return h('el-table-column', {
              attrs: { label: col.label || col.prop }
            }, [...col.childrens.map(function (column) { //递归
                return columnRender(column, h)
            })])
        }
        return null;
      }
    }
    return createElement(
      'el-table',
      {
        ref: 'elTable',
        on: {
          ...this.$listeners, // 传递监听的所有事件
          ...this.eListeners // 添加功能所需，同理 在内部再添加该事件，保证不缺失功能
        },
        scopedSlots: { //保留其具名插槽
          empty: function () { 
            return _this.$slots.empty
          },
          append: function () {
            return _this.$slots.append
          }
        },
      },
      [
        this.columns.map(function (col) { // 渲染转递过来的columns数组
            return columnRender(col, createElement) //循环递归column 单独抽离为一个函数（定义在上面）
        }),
        this.$slots.default // 保留默认的html写法
      ]
    )
  },
  props: {
    ...this.$attrs, //传递所有绑定的属性
    
    // 添加功能需要用到属性，覆盖，并将这些属性作为props接受，然后再在内部添加，保证功能不缺失
    rowStyle: this.rowStyle_, 
    cellClassName: this.cellClassName_,
    rowClassName: this.rowClassName_,
  }
})