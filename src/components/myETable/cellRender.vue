<!--
 * @Autor: eobeans
 * @Date: 2021-06-19 09:16:46
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-19 09:42:33
 * @Version: 0.1.0
 * @Description: 
-->
<template>
  <div>{{cellRender()}}</div>
</template>
<script>
import defaultC from './editCell/default'

export default {
  name: 'myETableCellRender',
  props: {
    col: {
      type: Object,
      require: false
    },
    row: {
      type: Array
    },
    column: Object
  },
  components: {
    defaultC: defaultC
  },
  data() {
    return {

    }
  },
  methods: {
    cellRender (props, h, col) {
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
    setEditMap(obj) {
      if (this.editMap.some((e) => e.x === obj.x && e.y === obj.y)) return;
			
      this.editMap.push(obj);
    },
    emitEvent() {
      const _this = this
      this.$emit('cell-value-change', _this.row[_this.col.prop], _this.row, _this.column, _this.col)
    }
  },
  directives: [
    {
      name: 'focus',
    },
  ],
  nativeOn: {
    click: e => e.stopPropagation()
  },
}
</script>
