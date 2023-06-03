<!--
 * @Autor: eobeans
 * @Date: 2021-06-06 17:56:51
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-06 17:56:52
 * @Version: 0.1.0
 * @Description: 
-->
<template>
  <el-input v-on="$listeners" v-bind="$attrs" v-model="value"></el-input>
</template>

<script>
import mixinCell from "./minix.js";
export default {
  mixins: [mixinCell]
};
</script>
