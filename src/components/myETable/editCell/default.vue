<!--
 * @Autor: eobeans
 * @Date: 2021-06-19 09:15:53
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-19 09:16:13
 * @Version: 0.1.0
 * @Description: 
-->
<template>
  <el-input v-on="$listeners" v-bind="$attrs" v-model="value"></el-input>
</template>

<script>
export default {
  props: {
    iValue: [String, Number],
    column: Object,
    row: Object,
    columnObj: Object,
  },
  data() {
    return {
      value: this.iValue,
    };
  },
};
</script>