<!--
 * @Autor: eobeans
 * @Date: 2021-09-25 19:41:20
 * @LastEditors: eobeans
 * @LastEditTime: 2021-09-25 19:51:54
 * @Version: 0.1.0
 * @Description: 
-->
<template>
  <div class="default_container">
    <FloatBall :text="'哈哈'"></FloatBall>
  </div>
</template>
<script>
import FloatBall from '@/components/FloatBall/FloatBall.vue';
export default {
  components:{
    FloatBall
  }
}

</script>
<style lang="scss" scoped>
.float_ball{
  position: absolute;
  width: 80px;
  height: 80px;
  background-color: #399;
  opacity: 0.7;
}
</style>