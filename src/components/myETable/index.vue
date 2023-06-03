<!--
 * @Autor: eobeans
 * @Date: 2021-06-19 09:16:05
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-19 10:39:41
 * @Version: 0.1.0
 * @Description: 
-->
<template>
  <div>
    {{render(tableRender(h))}}
  </div>
</template>
<script>
import defaultC from './editCell/default'
export default {
	name: 'SETable',
	props: {
		columns: {
			type: Array,
			default: function () {
				return []
			},
		},
		rowStyle: {
			type: Function,
			default: function () {
				return null
			},
		}
	},
  components: {
    defaultC: defaultC
  },
	data() {
		return {
			editX: null,
			editY: null,
			editMap: []
		}
	},

	inheritAttrs: false,

	directives: {
		focus: {
			inserted(el) {
				let Element = el.querySelector('input')
				if (Element) {
					Element.focus()
				}
			},
		}
	},

	computed: {
		eListeners() {
			return {
				'cell-dblclick': this.cellClick
			}
		}
	},

	methods: {
    tableRender(h) {
      const _this = this
      return (
        <el-table
          ref='elTable'
          props={{ ...this.$attrs, rowStyle: this.rowStyle_ }}
          class={{'e-table': true}}
          v-on={{ ..._this.$listeners, ..._this.eListeners }}
          scopedSlots={{empty: () => { return _this.$slots.empty }}} 
        >
          {_this.columns.map((col) => {
            return _this.columnRender(col, h)
          })}
        </el-table>
      )
    },
		columnRender(col, h) {
      const _this = this
      return (
        <el-table-column props={...col} key={col.prop}>
          <template slot-scope={props}>
            {(props) => {
              _this.cellRender(props, h, col)
            }}
          </template>
        </el-table-column>
      )
		},
    cellRender(props, h, col){
      const _this = this
      let { row, column } = props
	    let isCan = !col.edit
      isCan &&
        _this.setEditMap({
          x: row.rowIndex,
          y: column.property,
        })
      if ( isCan && _this.editX === row.rowIndex && _this.editY === column.property ) {
        return (
          <default-c
            props={{ iValue: row[col.prop], column: column, columnObj: col, row: row }}
            v-bind={ ...col.editAttrs }
            v-on={...col.editListeners}
            on-change={_this.emitEvent}
          >
          </default-c>
        )
      } else {
        return (
          <span>{ row[col.prop] }</span>
        )
      }
    },
		rowStyle_({ row, rowIndex }) {
			Object.defineProperty(row, 'rowIndex', {
				value: rowIndex,
				writable: true,
				enumerable: false,
			})
			return this.rowStyle
				? this.rowStyle.call(null, {
						row,
						rowIndex,
				  })
				: null
		},
    // 取消编辑
    cancelEdit() {
      this.editX = null;
      this.editY = null;
    },
		cellClick(row, column, cell, event) {
      this.$emit("cell-dblclick", row, column, event);
      if (!this.isEditCell(row, column)) {
        return;
      }
      event.stopPropagation();
      this.editX = row.rowIndex;
      this.editY = column.property;
    },
    isEditCell(row, column) {
      return this.editMap.some(
        (e) => e.x === row.rowIndex && e.y === column.property
      );
    },
    setEditMap(obj) {
      if (this.editMap.some((e) => e.x === obj.x && e.y === obj.y)) return;
			
      this.editMap.push(obj);
    },
    emitEvent() {
      const _this = this
      this.$emit('cell-value-change', _this.row[_this.col.prop], _this.row, _this.column, _this.col)
    }
	},

	watch: {
		editX(n) {
			if (n !== null) {
				window.addEventListener("click", this.cancelEdit);
			} else {
				window.removeEventListener("click", this.cancelEdit);
			}
		},
		'$attrs.data': function (n) {
			this.editMap = []
		}
	},
}
</script>