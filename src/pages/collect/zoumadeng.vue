<!--
 * @Autor: eobeans
 * @Date: 2021-07-31 14:18:34
 * @LastEditors: eobeans
 * @LastEditTime: 2021-08-08 15:22:55
 * @Version: 0.1.0
 * @Description: 
-->
<template>
	<div class="layout" id="wyyzmd">
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
    <el-button @click="downLoadPdf">下载PDF</el-button>
	</div>
</template>
<script>
import html2canvas from 'html2canvas'

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
    downLoadPdf() {
      // 生成快照
      const convertToImage = (container, options = {}) => {
        // 设置放大倍数
        const scale = window.devicePixelRatio;

        // 传入节点原始宽高
        const width = container.offsetWidth;
        const height = container.offsetHeight;

        // html2canvas配置项
        const ops = {
          scale,
          width,
          height,
          useCORS: true,
          allowTaint: false,
          ...options
        };
        
        return html2canvas(container, ops).then(canvas => {
          // 返回图片的二进制数据
          const cancasImg = canvas.toDataURL("image/png");
          this.downloadClick('test', cancasImg);
        });
      }

      // 调用函数，取到截图的二进制数据，对图片进行处理（保存本地、展示等）
      const element = document.getElementById('wyyzmd');
      convertToImage(element);
    },
    downloadClick(fileName, canvasImg) {
      const a = document.createElement('a')
      //指定下载文件名称
      a.href = canvasImg;
      a.download = fileName
      //a 标签 需要点击触发。所以强制给他分派一个点击事件
      //创建一个鼠标事件
      let event = document.createEvent("MouseEvents")
      // 初始化鼠标事件
      event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      // 指定元素对象触发事件
      a.dispatchEvent(event)
    }
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