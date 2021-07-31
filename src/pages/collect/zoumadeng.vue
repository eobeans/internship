<!--
 * @Autor: eobeans
 * @Date: 2021-07-31 14:18:34
 * @LastEditors: eobeans
 * @LastEditTime: 2021-07-31 14:34:40
 * @Version: 0.1.0
 * @Description: 
-->
<template>
	<div class="layout">
    <div>
      <span> ElementUI走马灯 </span>
      <div>
        <el-carousel :autoplay="false" type="card" height="200px">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3 class="medium">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div style="height: 400px;">
      <span> 网易云走马灯 </span>
      <div>
        <div>
          <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8835bba0ccdc4fd58a92c29f6af17580~tplv-k3u1fbpfcp-zoom-1.image"/>
          <div class="carousel-card-text">
            测试
          </div>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
export default {
	name: 'wyyzmd',
	components: {
	},
	data(){
		return{
		}
	},
	mounted(){},
	methods:{
	
	}
}
</script>
<style scoped>
/* elementUI走马灯 */
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
/* 网易云走马灯 */
.carousel-card-container {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}
.carousel-card-text {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 22px;
  padding: 4px 8px;
  background: #EC4141;
  color: #fff;
  font-size: 12px;
  line-height: 14px;
  border-top-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
</style>