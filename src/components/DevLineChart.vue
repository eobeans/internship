<!--
 * @Autor: eobeans
 * @Date: 2021-06-01 23:04:02
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-03 22:36:54
 * @Version: 0.1.0
 * @Description: 
-->
<template>
  <div :style="{width: width ? width + 'px' : '100%',height: height ? height + 'px' : '100%'}" ref="chartWrapper"><div style="width:100%;height:100%;" ref="vueChart">{{data}}</div></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'DevLineChart',
  props: {
    isFinished: {
      type: Boolean,
      default: false
    },
    width: Number,
    height: Number,
    labelLine: Number,
    title: String,
    chartOpt: {
      required: false,
      type: Object,
      default: function () {
        return {}
      }
    },
    seriesOpt: {
      required: false,
      type: Object,
      default: function () {
        return {}
      }
    },
    data: {
      required: false,
      type: Array,
      default: function () {
        return [] // [{name:'柱状分类名称',data:[{value: 100, name: 'x轴名称'}]]
      }
    },
    lineDataName: {
      required: false,
      type: Array,
      default: function () {
        return [] // ['折线数据名称']
      }
    },
    horizontal: {
      required: false,
      type: Boolean,
      default: false
    }, 
    showLegend: {
      required: false,
      type: Boolean,
      default: false
    },
    barMax: Number,
    barMin: Number,
    lineMax: Number,
    lineMin: Number,
    barYAxis: String,
    LineYAxis: String
  },
  data () {
    return {
      vueChart: {},
      color: ['#0070c0', '#F06C00', '#C0C4CC', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3', '#c23531','#2f4554'],
    }
  },
  computed: {
    originData () {
      console.log(this.data)
      return this.data;
    },
    originChartOpt () {
      let that = this;
      let defaultOpt = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          show: true,
          top: that.title ? '22' : '0',
          right: '20',
          iconStyle: {
            borderColor: '#333'
          },
          feature: {
            saveAsImage: {
              title: 'img'
            }
          }
        },
        grid: {
          left: '30',
          right: '30',
          bottom: '30',
          containLabel: true
        },
        legend: {
          show: that.showLegend,
          data: [],
          bottom: 0,
          itemWidth: 12
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          axisTick: {
            show: true
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            color: '#000',
            formatter: (val) => {
              if (val.length > 10) {
                return val.substring(0, 10) + '...';
              } else {
                return val;
              }
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            min: that.barMin,
            max: that.barMax,
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              color: '#000',
              verticalAlign: 'bottom'
            }
          },
          {
            type: 'value',
            min: that.lineMin,
            max: that.lineMax,
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              color: '#000',
              formatter: (val) => {
                if (val.length > 10) {
                  return val.substring(0, 10) + '...';
                } else {
                  return val;
                }
              }
            }
          },
        ],
        series: []
      }
      let barSeriesOpt = this.deepMerge({
        name: '',
        data: [],
        type: 'bar',
        barGap: 0,
        barWidth: that.data.length > 1 ? '16' : '32',
        label: {
          show: false,
          position: that.horizontal ? 'right' : 'top',
          color: '#000',
          formatter: '{c}'
        }
      },this.seriesOpt)
      let lineSeriesOpt = {
        name: '',
        data: [],
        type: 'line',
        yAxisIndex: 1,
        smooth: true
      }
      let sourceData = this.data;
      let lineDataName = '/'+that.lineDataName.join('/')+'/';
      console.log(lineDataName);
      sourceData.map(item => {
        defaultOpt.legend.data.push(item.name);
        let xAxis = [];
        let seriesData = [];
        item.data.map(dataItem=>{
          xAxis.push(dataItem.name);
          seriesData.push(dataItem.value)
        })
        defaultOpt.xAxis.data = xAxis;
        if(lineDataName.indexOf('/'+item.name+'/')>-1){
          defaultOpt.series.push({...lineSeriesOpt,...{
          name: item.name,
          data: seriesData}})
        }else {
          defaultOpt.series.push({...barSeriesOpt,...{
          name: item.name,
          data: seriesData}})
        }
      })
      return this.deepMerge(defaultOpt,this.chartOpt);
    },
    opt () {
      let that = this;
      let obj = {
        title: {
          text: that.title,
          x: 'center'
        },
        legend: that.originChartOpt.legend,
        color: that.color,
        toolbox: that.originChartOpt.toolbox,
        tooltip: that.originChartOpt.tooltip,
        grid: that.originChartOpt.grid,
        xAxis: that.horizontal ? that.originChartOpt.yAxis : that.originChartOpt.xAxis,
        yAxis: that.horizontal ? that.originChartOpt.xAxis : that.originChartOpt.yAxis,
        series: that.originChartOpt.series
      }
      return obj;
    }
  },
  methods: {
    setEchart () {
      let dom = this.$refs.vueChart;
      this.vueChart = echarts.init(dom);
      this.vueChart.setOption(this.opt);
      this.$refs.chartWrapper.addEventListener('resize', this.vueChart.resize);
      let that = this;
      this.vueChart.on('finished', function () {
        that.$emit('update:isFinished', true);
      });
    },
    chartChange () {
      this.$emit('update:isFinished', false);
      this.vueChart.clear();
      this.vueChart.setOption(this.opt);
    },
    chartDownload(){
      let _href = this.vueChart.getDataURL({
        pixelRatio: 2,
        backgroundColor: '#fff'
      });
      common.clickForDownload(_href,this.title);
    },
    deepMerge(obj1, obj2) {
      let key;
      for (key in obj2) {
          obj1[key] = obj1[key] && obj1[key].toString() === "[object Object]" ?
              deepMerge(obj1[key], obj2[key]) : obj1[key] = obj2[key];
      }
      return obj1;
    },
    clickForDownload(_href,_title){
      const ele = document.createElement("a");
      ele.href = _href;
      ele.id = 'uuid'+ new Date().getTime();
      ele.download = _title;
      ele.style.display = "none";
      document.body.appendChild(ele);
      ele.click();
      setTimeout(function(){
        ele.remove()
      },5000);
    }
  },
  mounted () {
    this.setEchart();
  },
  updated () {
    if (Object.keys(this.vueChart).length===0) {
      this.setEchart();
    }
    this.chartChange();
  },
  beforeDestroy () {
    this.$emit('update:isFinished', false);
    this.$refs.chartWrapper.removeEventListener('resize', this.vueChart.resize);
  }
}
</script>