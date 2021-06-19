<!--
 * @Autor: eobeans
 * @Date: 2021-06-06 17:57:14
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-06 17:57:14
 * @Version: 0.1.0
 * @Description: 
-->
<template>
  <el-select v-on="$listeners" v-bind="$attrs" v-model="value">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
import mixinCell from "./minix.js";
export default {
  mixins: [mixinCell],
  props: {
    options: {
      type: Array,
      default: () => []
    }
  }
};
</script>
