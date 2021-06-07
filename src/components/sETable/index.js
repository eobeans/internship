/*
 * @Autor: eobeans
 * @Date: 2021-06-06 20:25:04
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-07 21:51:48
 * @Version: 0.1.0
 * @Description: 
 */
// import editCell from './mixins/editCell.js'
// import cellRender from './components/cellRender.js'
// import columnHeader from './components/columnHeader.js'
// import indexAndSelection from './components/indexAndSelection.js'
import defaultC from './editCell/default'

const cellRender = function(props, h, col) {
	const _this = this
	let { row, column } = props
	// let isCan = col.edit
	let isCan = !col.edit

	isCan &&
		_this.setEditMap({
			x: row.rowIndex,
			y: column.property,
		})
	
		if ( isCan && _this.editX === row.rowIndex && _this.editY === column.property ) {
			let options = {
				attrs: {
					...col.editAttrs,
				},
				props: {
					value_: row[col.prop],
					column: column,
					columnObj: col,
					row: row,
				},
				on: {
					...col.editListeners,
					change: (v, event) => {
						row[col.prop] = v

						_this.$emit('cell-value-change', v, row, column, col)
					},
				},
				nativeOn: {
					click: e => {
						e.stopPropagation()
					},
				},
				directives: [
					{
						name: 'focus',
					},
				],
			}
			if (col.editComponent && typeof col.editComponent === 'object') {
				return h(col.editComponent, options)
			} else {
				return h(defaultC, options)
			}
		} else {
			if (col.renderCell && typeof col.renderCell === 'function') {
				// 自定义Render
				return col.renderCell.call(_this, h, {
					value: row[col.prop],
					row: row,
					column: column,
				})
			} else {
				// default cell render
				let value =
					col.formatter && typeof col.formatter === 'function'
						? col.formatter(row[col.prop], row, column)
						: row[col.prop]
				return h(
					'span',
					col.valueAsHtml
						? {
								domProps: {
									innerHTML: value,
								},
							}
						: value
				)
			}
		}
}
const columnHeader = function(props, h, col) {
	return (
    <span class='e-custom-header'>
      { col.label || col.prop }
    </span>
  )
}
export default {
	name: 'SETable',

	inheritAttrs: false,

	render(h) {
		const _this = this
		function columnRender(col, h) {
			if (col.hidden === true) return null

			return h('el-table-column', {
				props: {
					...col,
				},
				key: col.prop,
				scopedSlots: {
					header:
						!col.defaultHeader &&
						(props => {
							return columnHeader.call(_this, props, h, col)
						}),
					default: props => cellRender.call(_this, props, h, col),
				},
			})
		}

		const tableRender = h(
			'el-table',
			{
				ref: 'elTable',
				props: {
					...this.$attrs,
					rowStyle: this.rowStyle_,
					cellClassName: this.cellClassName_,
					rowClassName: this.rowClassName_,
				},
				class: {
					'e-table': true,
				},
				on: {
					...this.$listeners,
					...this.eListeners,
				},

				scopedSlots: {
					empty: function () {
						return _this.$slots.empty
					},
				},
			},
			[
				this.columns.map(function (col) {
					// render column
					return columnRender(col, h)
				}),

				this.$slots.default, //  slot columns

				this.$slots.append && h('div', { slot: 'append' }, this.$slots.append), // slot append
			]
		)

		return tableRender
	},

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
				'cell-click': this.cellClick
			}
		}
	},

	methods: {
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

		rowClassName_({ row, rowIndex }) {
			let rowName = this.rowClassName
				? this.rowClassName.call(null, {
						row,
						rowIndex
				  })
				: ''

			return rowName
		},

		cellClassName_({ row, column, rowIndex, columnIndex }) {
			let cellName = this.cellClassName
				? this.cellClassName.call(null, {
						row,
						column,
						rowIndex,
						columnIndex,
				  })
				: ''
			if (this.isEditCell(row, column)) {
				cellName += ' edit-cell'
				if (this.editX === row.rowIndex && this.editY === column.property) {
					cellName += ' edit-active'
				}
			}
			return cellName
		},

    // 取消编辑
    cancelEdit() {
      this.editX = null;
      this.editY = null;
    },
		cellClick(row, column, cell, event) {
      this.$emit("cell-click", row, column, event);
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
    }
	},

	created() {
		// console.log(this.$root['$options']['components']['ETable'])
	},

	props: {
		columns: {
			type: Array,
			default: function () {
				return []
			},
		},
		config: Object,
		rowStyle: Function,
		rowClassName: Function,
		cellClassName: Function,
		getFilters: Function,
		pagination: [Object, Boolean],
	},

	data() {
		return {
			editX: null,
			editY: null,
			editMap: []
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
