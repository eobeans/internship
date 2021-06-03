<template>
    <Layout :style="{padding: '0 12px 12px'}">
        <Content :style="{padding: '12px', minHeight: '280px', background: '#fff' , margin:'24px'}">
            <div style="width:80%;height:400px">
                <v-chart id="myPieChart" :options="pie"/>
            </div>
            <div>
                <row justify="start" style="height:66px;margin-top:24px;">
                    <Col span="3" offset="3"><p>病假：{{attendance[0].value}}天</p></Col>
                    <Col span="3"><p>事假：{{attendance[1].value}}天</p></Col>
                    <Col span="3"><p>旷课：{{attendance[2].value}}天</p></Col>
                    <Col span="3"><p>迟到：{{attendance[3].value}}次</p></Col>
                    <Col span="3"><p>早退：{{attendance[3].value}}次</p></Col>
                    <Col span="3"><p>按时：{{attendance[5].value}}次</p></Col>
                </row>
            </div>
            <div>
                <row justify="start" style="margin-bottom:24px;">
                    <Col span="4"  offset="6">教师检查次数：{{check}}次</Col>
                    <Col span="3">检查率：{{checkRate}}%</Col>
                    <Col span="3"><Button type="primary" style="margin-top:-10px;" @click.native.prevent="refreshData">刷新</Button></Col>
                </row>
            </div>
        </Content>
    </Layout>
</template>
<script>
    import ECharts from 'vue-echarts'
    import 'echarts/lib/chart/pie'
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/title'

    import setting from '../setting'

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
        mounted(){
            // let _this=this
            // this.minHeight=document.body.clientHeight-210
            // let url1=setting.url+"getAttendance.json"
            // if(this.$store.state.User.teaNum!=''){
            //     this.$http.get(url1).then(res=>{
            //         if(res.body.code==0){
            //             _this.attendance=res.body.data
            //             _this.pie.series[0].data=res.body.data
            //             _this.check=res.body.check
            //             _this.checkRate=parseInt((res.body.check/res.body.total)*100)
            //         }else{
            //             _this.$Message.error(res.body.err)
            //         }
            //     })
            // }else{
            //     this.$Message.error('请先登入！')
            //     this.$router.push('/login')
            // }
        },
        methods:{
            refreshData(){
                let _this=this
                let url1=setting.url+"getAttendance.json"
                this.$http.get(url1).then(res=>{
                    if(res.body.code==0){
                        _this.$Message.success('刷新成功！')
                        _this.pie.series[0].data=res.body.data
                        _this.check=res.body.check
                        _this.total=res.body.total
                    }else{
                        _this.$Message.error(res.body.err)
                    }
                })
            },
            selectNav(val){
                let _this=this
                switch(val)
                {
                    case 1:
                        _this.$router.push('/attendence')
                        break
                    case 2:
                        _this.$router.push('/student')
                        break
                    case 3:
                        _this.$router.push('/dailyrecord')
                        break
                    case 4:
                        _this.$router.push('/totation')
                        break
                    case 5:
                        _this.$router.push('/grade')
                        break
                    case 6:
                        _this.$router.push('/diseaserecord')
                        break
                    case 7:
                        _this.$router.push('/disease')
                        break
                    case 8:
                        _this.$router.push('/operation')
                        break
                    case 9:
                        _this.$router.push('/doctor')
                        break
                    case 10:
                        _this.$router.push('/teacher')
                        break
                    default:
                        _this.$Message.error('发生了意料之外的错误')
                        break
                }
            },
        
        }
    }
</script>
