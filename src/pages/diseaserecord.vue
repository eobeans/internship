<template>
    <div class="layout">
        <div>
            <!-- <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" :style="{background: '#fff'}">
                <Menu active-name="1-6" theme="light" width="auto" :style="{ minHeight: minHeight + 'px'}">
                    <MenuItem name="1-1" @click.native="selectNav(1)">
                        <Icon type="ios-navigate"></Icon>
                        <span>考勤总览</span>
                    </MenuItem>
                    <MenuItem name="1-2" @click.native="selectNav(2)">
                        <Icon type="ios-man" />
                        <span>学生信息</span>
                    </MenuItem>
                    <MenuItem name="1-3" @click.native="selectNav(3)">
                        <Icon type="ios-paper" />
                        <span>每日实习情况</span>
                    </MenuItem>
                    <MenuItem name="1-4" @click.native="selectNav(4)">
                        <Icon type="ios-loading" />
                        <span>轮转科室情况</span>
                    </MenuItem>
                    <MenuItem name="1-5" @click.native="selectNav(5)">
                        <Icon type="ios-flag" />
                        <span>成绩考核记录</span>
                    </MenuItem>
                    <MenuItem name="1-6" @click.native="selectNav(6)">
                        <Icon type="ios-create" />
                        <span>诊断、操作记录</span>
                    </MenuItem>
                    <MenuItem name="1-7" @click.native="selectNav(7)">
                        <Icon type="ios-pulse" />
                        <span>病种记录表</span>
                    </MenuItem>
                    <MenuItem name="1-8" @click.native="selectNav(8)">
                        <Icon type="ios-copy" />
                        <span>操作记录表</span>
                    </MenuItem>
                    <MenuItem name="1-9" @click.native="selectNav(9)">
                        <Icon type="ios-analytics" />
                        <span>医院账号管理</span>
                    </MenuItem>
                    <MenuItem name="1-10" @click.native="selectNav(10)">
                        <Icon type="ios-school" />
                        <span>学校教师账号管理</span>
                    </MenuItem>
                </Menu>
            </Sider> -->
            <div>
                <div :style="{padding: '0 12px 12px'}">
                    <div :style="{padding: '12px', minHeight: '280px', background: '#fff' , margin:'24px'}">
                        <Table border size="small" :columns="columns" :data="data">
                            <template slot-scope="{ row, index }" slot="action">
                                <div>
                                    <Button type="primary" size="small" style="margin-right: 5px" @click="showdiagnosis(row,index)">病情诊断</Button>
                                    <Button type="primary" size="small" style="margin-right: 5px" @click="showoperation(row, index)">临床操作</Button>
                                    <Button type="primary" size="small" @click="showactivity(row, index)" style="margin-left:10px;">教学活动</Button>
                                </div>
                            </template>
                        </Table>
                        <!-- <Page :total="total" :page-size="20" :current="1" @on-change="handleMore" style="margin-top:22px;"/> -->
                        <Modal
                            v-model="modal1"
                            title="病情诊断"
                            ok-text="确定"
                            cancel-text="关闭"
                            @on-ok="cancel"
                            @on-cancel="cancel">
                            <Table border size="small" :columns="columns1" :data="diagnosis"></Table>
                        </Modal>
                        <Modal
                            v-model="modal2"
                            title="临床操作"
                            ok-text="确定"
                            cancel-text="关闭"
                            @on-ok="cancel"
                            @on-cancel="cancel">
                            <Table border size="small" :columns="columns2" :data="operation"></Table>
                        </Modal>
                        <Modal
                            v-model="modal3"
                            title="教学活动"
                            ok-text="确定"
                            cancel-text="关闭"
                            @on-ok="cancel"
                            @on-cancel="cancel">
                            <Table border size="small" :columns="columns3" :data="activity"></Table>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import setting from '../setting'
    import moment, { months } from 'moment'

    export default {
        data(){
            return{
                editIndex:-1,
                modal1:false,
                modal2:false,
                modal3:false,
                columns: [
                    {
                        title: '学号',
                        key: 'num',
                        sortable: true
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '科室',
                        key: 'department',
                        sortable: true,
                    }, 
                    {
                        title:'操作',
                        slot:'action'
                    }
                ],
                columns1:[
                    {
                        title:'病情诊断',
                        key:'diagnosis',
                    },
                    {
                        title:'例数',
                        key:'mycount',
                    },
                ],
                columns2:[
                    {
                        title:'临床操作',
                        key:'operation',
                    },
                    {
                        title:'例数',
                        key:'mycount',
                    },
                ],
                columns3:[
                    {
                        title:'教学活动',
                        key:'activity',
                    },
                    {
                        title:'例数',
                        key:'mycount',
                    },
                ],
                data:[],
                diagnosis:[],
                operation:[],
                activity:[],
                total:0,
                myoffset:0,
            }
        },
        mounted(){},
        methods:{
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
                        _this.$router.push('/dailyRecord')
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
            showdiagnosis (row,index) {
                this.$Message.info('loading......')
                let url1=setting.url+"getdiagnosis.json"
                this.$http.post(url1,{form:row}).then(res=>{
                    if(res.body.code==0){
                        this.diagnosis=res.body.data
                    }
                })
                this.modal1=true
            },
            showoperation(row,index){
                this.$Message.info('loading......')
                let url1=setting.url+"getoperation.json"
                this.$http.post(url1,{form:row}).then(res=>{
                    if(res.body.code==0){
                        this.operation=res.body.data
                    }
                })
                this.modal2=true
            },
            showactivity(row,index){
                this.$Message.info('loading......')
                let url1=setting.url+"getactivity.json"
                this.$http.post(url1,{form:row}).then(res=>{
                    if(res.body.code==0){
                        this.activity=res.body.data
                    }
                })
                this.modal3=true
            },
            cancel () {
                this.modal1=false
                this.modal2=false
                this.modal3=false
            },
            deepClone (sourceObj, targetObj) {
                let cloneObj = targetObj || {}
                if(!sourceObj || typeof sourceObj !== "object" || sourceObj.length === undefined){
                    return sourceObj
                }
                if(sourceObj instanceof Array){
                    cloneObj = sourceObj.concat()
                } else {
                    for(let i in sourceObj){
                        if (typeof sourceObj[i] === 'object') {
                            cloneObj[i] = deepClone(sourceObj[i], {})
                        } else {
                            cloneObj[i] = sourceObj[i]
                        }
                    }
                }
                return cloneObj
            },
        }
    }
</script>
