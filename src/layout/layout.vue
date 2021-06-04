<!--
 * @Autor: eobeans
 * @Date: 2021-06-03 14:26:15
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-05 01:15:45
 * @Version: 0.1.0
 * @Description: 
-->
<template>
  <div id="layout">
    <Layout>
      <MyHeader></MyHeader>
      <div style="display:flex;">
        <MySider></MySider>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
      <MyFooter></MyFooter>
    </Layout>
  </div>
</template>

<script>
import MyHeader from '@/layout/header'
import MyFooter from '@/layout/footer'
import MySider from '@/layout/sider'
export default {
  name: 'myLayout',
  components: {
    MyHeader,
    MySider,
    MyFooter,
  },
}
</script>
