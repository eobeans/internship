<!--
 * @Autor: eobeans
 * @Date: 2021-07-31 14:18:34
 * @LastEditors: eobeans
 * @LastEditTime: 2021-08-10 22:18:20
 * @Version: 0.1.0
 * @Description: 
-->
<template>
	<div class="layout" id="htmlToCanvas" style="background-color: transparent">
    <div>
      <span> hello html to canvas </span>
      <div style="width:400px;height:400px;background-color: transparent;">
      </div>
    </div>
    <el-button @click="downLoadPdf">下载PDF</el-button>
    <el-button @click="print">打印</el-button>
	</div>
</template>
<script>
import html2canvas from 'html2canvas'
import printHtml from "@/utils/print.js"
export default {
	name: 'htmlToCanvas',
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
        const scale = 2;

        // 传入节点原始宽高
        const width = container.offsetWidth * 2;
        const height = container.offsetHeight * 2;

        // html2canvas配置项
        const ops = {
          scale,
          width,
          height,
          backgroundColor: '#000',
          useCORS: true,
          allowTaint: false,
          ...options
        };
        
        return html2canvas(container, ops).then(canvas => {
          // 返回图片的二进制数据
          let newCanvas = document.createElement('canvas');
          var ctx = newCanvas.getContext('2d');
          newCanvas.width = width;
          newCanvas.height = height;
          ctx.drawImage(canvas, 0, 0, width, height, 0, 0, width, height);
          ctx.fillStyle = '#000'
          const cancasImg = newCanvas.toDataURL("image/png");
          this.downloadClick('test', cancasImg);
        });
      }

      // 调用函数，取到截图的二进制数据，对图片进行处理（保存本地、展示等）
      const element = document.getElementById('htmlToCanvas');
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
    },
    print() {
      let printData = document.getElementById('htmlToCanvas')
      printHtml(printData.outerHTML)
    }
	}
}
</script>