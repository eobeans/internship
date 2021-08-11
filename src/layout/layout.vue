<!--
 * @Autor: eobeans
 * @Date: 2021-06-03 14:26:15
 * @LastEditors: eobeans
 * @LastEditTime: 2021-08-11 21:37:42
 * @Version: 0.1.0
 * @Description: 
-->
<template>
  <div id="layout" class='layout'>
    <div class="layout-header">
      <my-header></my-header>
    </div>
    <div class="layout-container">
      <my-sider></my-sider>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import MySider from '@/layout/sider'
import MyHeader from '@/layout/header'

export default {
  name: 'myLayout',
  components: {
    MySider,
    MyHeader
  },
}
</script>
