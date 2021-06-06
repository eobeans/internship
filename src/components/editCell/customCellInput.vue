<!--
 * @Autor: eobeans
 * @Date: 2021-06-06 15:46:32
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-06 15:48:39
 * @Version: 0.1.0
 * @Description: 
-->
<template>
  <el-input v-bind="$attrs" v-on="$listeners" v-model="value"></el-input>
</template>

<script>
export default {
  name: 'CustomCellInput',
  props: {
    value_: [String, Number],
    column: Object,
    row: Object,
    columnObj: Object
  },
  data() {
    return {
      value: this.value_
    };
  },
};
</script>
