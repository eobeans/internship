<!--
 * @Author: eobeans
 * @Date: 2023-05-30 21:09:21
 * @LastEditors: eobeans
 * @LastEditTime: 2023-05-30 21:42:04
 * @version: 0.1.0
 * @Descripttion: 
-->
<template>
	<div class="login-container" id="loginContainer">
    <div class="login-title-container">
      <div>贵州AI绘画实验室</div>
      <div>欢迎光临</div>
    </div>
    <div class="login-form">

    </div>
	</div>
</template>
<script>

export default {
	name: 'newLogin',
	components: {
	},
	data(){
		return{
		}
	},
	mounted(){},
  methods: {

  }
}
</script>
<style lang='scss' scoped>
.login-container {
  display: block;
  position: relative;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background: url('../../assets/images/background.jpg') no-repeat;
  background-size: 100% 100%;
  .login-title-container {
    display: block;
    position: absolute;
    top: 12%;
    left: 12%;
    font-size: 36px;
    color: #ffffff;
  }
  .login-form {
    display: block;
    position: absolute;
    height: 50vh;
    width: 36vw;
    top: 25%;
    right: 6%;
    background-color: #ffffff;
    opacity: 0.4;
  }
}
</style>