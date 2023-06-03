<!--
 * @Author: eobeans
 * @Date: 2021-08-25 12:31:00
 * @LastEditors: eobeans
 * @LastEditTime: 2021-08-25 12:34:41
 * @version: 0.1.0
 * @Descripttion: 
-->
<template>
  <div>
    <el-dialog :visible.sync="visible">
      <el-row>
        <el-form>
          <el-col>
            <el-form-item label="test123"></el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="test123"></el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="test123"></el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div style="text-align: center">
        <el-button @click="handleColse" size="small">取消</el-button>
        <el-button type="primary" @click="handleColse" size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'AddDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    handleColse() {
      this.$emit('update:visible', false); // 直接修改父组件的属性
    }
  }
}
</script>