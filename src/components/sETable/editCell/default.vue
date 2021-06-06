<!--
 * @Autor: eobeans
 * @Date: 2021-06-06 20:52:09
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-06 21:41:36
 * @Version: 0.1.0
 * @Description: 
-->
<template>
  <el-input v-on="$listeners" v-bind="$attrs" v-model="value"></el-input>
</template>

<script>
export default {
  props: {
    value_: [String, Number],
    column: Object,
    row: Object,
    columnObj: Object,
  },
  data() {
    return {
      value: this.value_,
    };
  },
};
</script>