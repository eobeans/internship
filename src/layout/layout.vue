<!--
 * @Autor: eobeans
 * @Date: 2021-06-03 14:26:15
 * @LastEditors: eobeans
 * @LastEditTime: 2021-07-10 12:50:12
 * @Version: 0.1.0
 * @Description: 
-->
<template>
  <div id="layout">
    <el-container>
      <el-header>
        留学生实习管理支持系统
      </el-header>
      <el-container>
        <MySider></MySider>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-container>
      <el-footer>
        <p style="line-height:8px;">copyright@南方医科大学</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import MySider from '@/layout/sider'
export default {
  name: 'myLayout',
  components: {
    MySider
  },
}
</script>
