<template>
  <div class="layout" id="attendence">
    <div style="width:80%;height:400px">
      <v-chart id="myPieChart" :options="pie"/>
    </div>
    <div>
      <el-row justify="start" style="height:66px;margin-top:24px;">
        <el-col span="3" offset="3"><p>病假：{{attendance[0].value}}天</p></el-col>
        <el-col span="3"><p>事假：{{attendance[1].value}}天</p></el-col>
        <el-col span="3"><p>旷课：{{attendance[2].value}}天</p></el-col>
        <el-col span="3"><p>迟到：{{attendance[3].value}}次</p></el-col>
        <el-col span="3"><p>早退：{{attendance[3].value}}次</p></el-col>
        <el-col span="3"><p>按时：{{attendance[5].value}}次</p></el-col>
      </el-row>
    </div>
    <div>
      <el-row justify="start" style="margin-bottom:24px;">
        <el-col span="4"  offset="6">教师检查次数：{{check}}次</el-col>
        <el-col span="3">检查率：{{checkRate}}%</el-col>
        <el-col span="3"><Button type="primary" style="margin-top:-10px;" @click.native.prevent="refreshData">刷新</Button></el-col>
      </el-row>
    </div>
    <div>
      <el-button @click="downLoadPdf">下载PDF</el-button>
    </div>
  </div>
</template>
<script>
import ECharts from 'vue-echarts'
import html2canvas from 'html2canvas'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

export default {
  components: {
    'v-chart': ECharts
  },
  data(){
    return{    
      minHeight:0,
      attendance:[
        {value:10, name:'病假'},
        {value:35, name:'事假'},
        {value:5, name:'旷课'},
        {value:25, name:'迟到'},
        {value:5, name:'早退'},
        {value:0, name:'按时'},
      ],
      check:'',
      checkRate:'',
      pie : {
        title : {
          text: '留学生考勤总览',
          subtext: '留学生考勤详细数据',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['病假','事假','旷课','迟到','早退','按时']
        },
        series : [
            {
              name: '考勤',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:10, name:'病假'},
                {value:35, name:'事假'},
                {value:5, name:'旷课'},
                {value:25, name:'迟到'},
                {value:5, name:'早退'},
                {value:0, name:'按时'},
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
        ]
      }
    }
  },
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
      const element = document.getElementById('attendence');
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
