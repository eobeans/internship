<template>
    <div class="layout">
        <Layout>
            <!-- <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" :style="{background: '#fff'}">
                <Menu active-name="1-3" theme="light" width="auto" :style="{ minHeight: minHeight + 'px'}">
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
            <Layout>
                <Layout :style="{padding: '0 12px 12px'}">
                    <Content :style="{padding: '12px', minHeight: '280px', background: '#fff' , margin:'24px'}">
                        <row justify="start">
                            <Col span="3" offset="18">
                                <Button type="primary" @click.native.prevent="handleAdd">新建每日实习情况</Button>
                            </Col>
                            <Col span="3">
                                <Input suffix="ios-search" placeholder="请输入学生学号搜索" style="width: auto" @click.native="search"  @keyup.enter.native="search" v-model="searchValue"/>
                            </Col>
                        </row>
                        <Divider />
                        <Table border :loading="loading" size="small" :columns="columns" :data="data">
                            <template slot-scope="{ row, index }" slot="action">
                                <div>
                                    <Button type="primary" size="small" style="margin-right: 5px" @click="show(row,index)">详情</Button>
                                    <Button type="primary" size="small" style="margin-right: 5px" @click="handleEdit(row, index)">修改</Button>
                                    <Button type="error" size="small" @click="handleDelete(row, index)" style="margin-left:10px;">删除</Button>
                                </div>
                            </template>
                        </Table>
                        <Page :total="total" :page-size="20" :current="1" @on-change="handleMore" style="margin-top:22px;"/>
                        <Modal
                            v-model="modal1"
                            title="修改信息"
                            ok-text="保存"
                            cancel-text="取消"
                            :scrollable="true"
                            @on-ok="ok"
                            @on-cancel="cancel">
                            <Row style="margin-bottom:18px;margin-top:18px;">
                                <Col span="3" offset="2" class="myCol">学号：</Col>
                                <Col span="6">
                                    <Input v-model="editForm.num" placeholder="请输入学号" style="width: 100px" />
                                </Col>
                                <Col span="3" offset="2" class="myCol">姓名：</Col>
                                <Col span="6">
                                    <Input v-model="editForm.name" placeholder="请输入姓名" style="width: 100px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="3" offset="2" class="myCol">科室：</Col>
                                <Col span="6">
                                    <Select v-model="editForm.department" @mouseleave.native="selectDep(editForm.department)" style="width:100px" placeholder="请选择科室">
                                        <Option v-for="item in departmentList" :value="item" :key="item">{{ item }}</Option>
                                    </Select>
                                </Col>
                                <Col span="3" offset="2"  class="myCol">日期：</Col>
                                <Col span="6">
                                    <DatePicker type="date" format="yyyy-MM-dd" v-model="editForm.date" placeholder="请选择日期" style="width: 120px"></DatePicker>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="3" offset="2">考勤：</Col>
                                <Col span="17">
                                    <CheckboxGroup  v-model="editForm.attendence">
                                        <Checkbox label="按时"></Checkbox>
                                        <Checkbox label="病假一天"></Checkbox>
                                        <Checkbox label="病假半天"></Checkbox>
                                        <Checkbox label="事假一天"></Checkbox>
                                        <Checkbox label="事假半天"></Checkbox>
                                        <Checkbox label="旷课一天"></Checkbox>
                                        <Checkbox label="旷课半天"></Checkbox>
                                        <Checkbox label="迟到两次"></Checkbox>
                                        <Checkbox label="迟到一次"></Checkbox>
                                        <Checkbox label="早退两次"></Checkbox>
                                        <Checkbox label="早退一次"></Checkbox>
                                    </CheckboxGroup >
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="3" offset="2">检查：</Col>
                                <Col span="17">
                                    <RadioGroup v-model="editForm.dcheck">
                                        <Radio :label="1">考勤属实</Radio>
                                        <Radio :label="0">考勤不属实</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;margin-top:18px;">
                                <Col span="3" offset="2" class="myCol">住院号：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.hosId" placeholder="请输入住院号" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;margin-top:18px;">
                                <Col span="3" offset="2" class="myCol">性别：</Col>
                                <Col span="6">
                                    <Select v-model="editForm.gender" style="width:100px">
                                        <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </Col>
                                <Col span="3" offset="2" class="myCol">年龄：</Col>
                                <Col span="6">
                                    <Input v-model="editForm.age" placeholder="请输入年龄" style="width: 100px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="3" offset="2" class="myCol">医学诊断：</Col>
                                <Col span="12">
                                    <Select v-model="editForm.diagnosis" style="width:200px">
                                        <Option v-for="item in diagnosisList" :value="item" :key="item">{{ item }}</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="3" offset="2" class="myCol">临床操作：</Col>
                                <Col span="12">
                                    <Select v-model="editForm.operation" style="width:200px">
                                        <Option v-for="item in operationList" :value="item" :key="item">{{ item }}</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="3" offset="2" class="myCol">教学活动：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.activity"  placeholder="请输入教学活动" style="width: 200px" />
                                </Col>
                            </Row>
                        </Modal>
                        <Modal
                            v-model="modal2"
                            title="删除信息"
                            ok-text="确定"
                            cancel-text="取消"
                            @on-ok="okDelete"
                            @on-cancel="cancel">
                            <Row style="margin-bottom:24px;">
                                <Col span="12" offset="3" style="font-size:16px;margin:8px;">
                                    <Icon type="ios-trash" />
                                    是否删除该信息
                                </Col>
                            </Row>
                        </Modal>
                        <Modal
                            v-model="modal3"
                            title="新建每日实习信息"
                            ok-text="新建"
                            cancel-text="取消"
                            :scrollable="true"
                            @on-ok="okAdd"
                            @on-cancel="cancel">
                            <Row style="margin-bottom:18px;margin-top:18px;">
                                <Col span="3" offset="2" class="myCol">学号：</Col>
                                <Col span="6">
                                    <Input v-model="addForm.num" placeholder="请输入学号" style="width: 100px" />
                                </Col>
                                <Col span="3" offset="2" class="myCol">姓名：</Col>
                                <Col span="6">
                                    <Input v-model="addForm.name" placeholder="请输入姓名" style="width: 100px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="3" offset="2" class="myCol">科室：</Col>
                                <Col span="6">
                                    <Select v-model="addForm.department" @mouseleave.native="selectDep(addForm.department)" style="width:100px" placeholder="请选择科室">
                                        <Option v-for="item in departmentList" :value="item" :key="item">{{ item }}</Option>
                                    </Select>
                                </Col>
                                <Col span="3" offset="2"  class="myCol">日期：</Col>
                                <Col span="6">
                                    <DatePicker type="date" format="yyyy-MM-dd" v-model="addForm.date" placeholder="请选择日期" style="width: 120px"></DatePicker>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="3" offset="2">考勤：</Col>
                                <Col span="17">
                                    <CheckboxGroup  v-model="addForm.attendence">
                                        <Checkbox label="按时"></Checkbox>
                                        <Checkbox label="病假一天"></Checkbox>
                                        <Checkbox label="病假半天"></Checkbox>
                                        <Checkbox label="事假一天"></Checkbox>
                                        <Checkbox label="事假半天"></Checkbox>
                                        <Checkbox label="旷课一天"></Checkbox>
                                        <Checkbox label="旷课半天"></Checkbox>
                                        <Checkbox label="迟到两次"></Checkbox>
                                        <Checkbox label="迟到一次"></Checkbox>
                                        <Checkbox label="早退两次"></Checkbox>
                                        <Checkbox label="早退一次"></Checkbox>
                                    </CheckboxGroup >
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="3" offset="2">检查：</Col>
                                <Col span="17">
                                    <RadioGroup v-model="addForm.dcheck">
                                        <Radio :label="1">考勤属实</Radio>
                                        <Radio :label="0">考勤不属实</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;margin-top:18px;">
                                <Col span="3" offset="2" class="myCol">住院号：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.hosId" placeholder="请输入住院号" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;margin-top:18px;">
                                <Col span="3" offset="2" class="myCol">性别：</Col>
                                <Col span="6">
                                    <Select v-model="addForm.gender" style="width:100px">
                                        <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </Col>
                                <Col span="3" offset="2" class="myCol">年龄：</Col>
                                <Col span="6">
                                    <Input v-model="addForm.age" placeholder="请输入年龄" style="width: 100px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="3" offset="2" class="myCol">医学诊断：</Col>
                                <Col span="12">
                                    <Select v-model="addForm.diagnosis" style="width:200px">
                                        <Option v-for="item in diagnosisList" :value="item" :key="item">{{ item }}</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="3" offset="2" class="myCol">临床操作：</Col>
                                <Col span="12">
                                    <Select v-model="addForm.operation" style="width:200px">
                                        <Option v-for="item in operationList" :value="item" :key="item">{{ item }}</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="3" offset="2" class="myCol">教学活动：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.activity"  placeholder="请输入教学活动" style="width: 200px" />
                                </Col>
                            </Row>
                        </Modal>
                        <Modal
                            v-model="modal4"
                            title="每日实习详细信息"
                            ok-text="确定"
                            cancel-text="关闭"
                            @on-ok="cancel"
                            @on-cancel="cancel">
                            <Row style="margin-bottom:18px;margin-top:18px;">
                                <Col span="3" offset="2" class="myCol1">学号：</Col>
                                <Col span="6">
                                    <p>{{showForm.num}}</p>
                                </Col>
                                <Col span="3" class="myCol1">姓名：</Col>
                                <Col span="6">
                                    <p>{{showForm.name}}</p>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="3" offset="2" class="myCol1">科室：</Col>
                                <Col span="6">
                                    <p>{{showForm.department}}</p>
                                </Col>
                                <Col span="3" class="myCol1">日期：</Col>
                                <Col span="6">
                                    <p>{{showForm.date}}</p>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="3" offset="2" class="myCol1">考勤：</Col>
                                <Col span="17">
                                    <p>{{showForm.attendence}}</p>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="3" offset="2" class="myCol1">检查：</Col>
                                <Col span="17">
                                    <p>{{(showForm.dcheck==1?'考勤属实':'考勤不属实')}}</p>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;margin-top:18px;">
                                <Col span="3" offset="2" class="myCol1">住院号：</Col>
                                <Col span="6">
                                    <P>{{showForm.hosId}}</P>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;margin-top:18px;">
                                <Col span="3" offset="2" class="myCol1">性别：</Col>
                                <Col span="6">
                                    <p>{{showForm.gender}}</p>
                                </Col>
                                <Col span="3" class="myCol1">年龄：</Col>
                                <Col span="6">
                                    <P>{{showForm.age}}</P>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="3" offset="2" class="myCol1">医学诊断：</Col>
                                <Col span="16">
                                    <p>{{showForm.diagnosis==""?'无':showForm.diagnosis}}</p>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="3" offset="2" class="myCol1">临床操作：</Col>
                                <Col span="16">
                                    <p>{{showForm.operation==""?'无':showForm.operation}}</p>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="3" offset="2" class="myCol1">教学活动：</Col>
                                <Col span="6">
                                    <p>{{showForm.activity==''?'无':showForm.activity}}</p>
                                </Col>
                            </Row>
                        </Modal>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import setting from '../setting'
    import moment from 'moment'
import { constants } from 'fs';

    export default {
        data(){
            return{    
                minHeight:0,
                editIndex:-1,
                modal1:false,
                modal2:false,
                modal3:false,
                modal4:false,
                loading: true,
                list: [
                    {
                        value: '男',
                        label: '男'
                    },
                    {
                        value: '女',
                        label: '女'
                    },
                ],
                selectmodel1: '',
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
                    }, 
                    {
                        title: '日期',
                        key: 'date',
                        sortable: true
                    },   
                    {
                        title: '考勤',
                        key: 'attendence'
                    }, 
                    {
                        title:'操作',
                        slot:'action'
                    }
                ],
                data:[],
                showForm:{},
                editForm:{
                    id:'',
                    medId:'',
                    num:'',
                    name:'',
                    department:'',
                    date:'',
                    sick:0,
                    absence:0,
                    truancy:0,
                    late:0,
                    dleave:0,
                    ontime:0,
                    dcheck:0,
                    Rdescription:'',
                    attendence:[],
                    hosId:'',
                    gender:'',
                    age:'',
                    diagnosis:'',
                    operation:'',
                    activity:'',
                },
                editStatus:{
                    oriNum:'',
                    oriDate:'',
                    ifStatus:0,
                },
                addForm:{
                    id:'',
                    medId:'',
                    num:'',
                    name:'',
                    department:'',
                    date:'',
                    sick:0,
                    absence:0,
                    truancy:0,
                    late:0,
                    dleave:0,
                    ontime:1,
                    dcheck:1,
                    Rdescription:'',
                    attendence:[],
                    hosId:'1',
                    gender:'男',
                    age:'1',
                    diagnosis:'',
                    operation:'',
                    activity:'',
                },
                diagnosisList:[],
                operationList:[],
                activityList:[],
                departmentList:[],
                deleteId:{
                    id:'',
                    medId:'',
                    num:'',
                    date:''
                },
                deleteIndex:-1,
                total:0,
                myoffset:0,
                addDepartment:'',
                editDepartment:'',
                searchValue:'',
            }
        },
        mounted(){
            // let _this=this
            // this.minHeight=document.body.clientHeight-210
            // if(this.$store.state.User.teaNum!=''){
            //     let url1=setting.url+"getDailyRecordCount.json"
            //     this.$http.get(url1).then(res=>{
            //         if(res.body.code==0){
            //             _this.total=parseInt(res.body.mycount)
            //         }else{
            //             _this.$Message.error("没有每日实习数据")
            //         }
            //     })
            //     let url12=setting.url+"getDailyRecord.json"
            //     this.$http.post(url12,{myoffset:_this.myoffset}).then(res=>{
            //         if(res.body.code==0){
            //             _this.data=res.body.data
            //             _this.loading=false
            //         }else{
            //             _this.$Message.error("没有每日实习数据")
            //         }
            //     })
            //     let url3=setting.url+"getDepartment.json"
            //     this.$http.get(url3).then(res=>{
            //         if(res.body.code==0){
            //             this.departmentList=res.body.departmentList
            //         }else{
            //             this.$Message.error("科室查找出错")
            //         }
            //     })
            // }else{
            //     this.$Message.error('请先登入！')
            //     this.$router.push('/login')
            // }
        },
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
            show (row,index) {
                this.showForm=row
                this.modal4=true
            },
            handleEdit (row, index) {
                this.modal1=true
                this.editStatus.oriNum=row.num
                this.editStatus.oriDate=row.date
                this.ifStatus=0
                if(this.editForm.department!=row.department){
                    let url12=setting.url+"getList.json"
                    this.$http.post(url12,{department:row.department}).then(res=>{
                        if(res.body.code==0){
                            this.$Message.info('loading......')
                            this.editDepartment=this.editForm.department
                            this.diagnosisList=res.body.diagnosisList
                            this.operationList=res.body.operationList
                            this.editIndex = index
                            let _obj = JSON.stringify(row)
                            let objClone = JSON.parse(_obj)
                            this.editForm=objClone
                        }
                    })
                }else{
                    this.editIndex = index
                    let _obj = JSON.stringify(row)
                    let objClone = JSON.parse(_obj)
                    this.editForm=objClone
                }
            },
            handleDelete(row,index){
                this.deleteId.id=row.id
                this.deleteId.medId=row.medId
                this.deleteId.num=row.num
                this.deleteId.date=row.date
                this.deleteIndex=index
                this.modal2=true
            },
            handleAdd(){
                this.firstSelect=false
                this.sureSelect=false
                this.modal3=true
            },
            okDelete(){
                let url2=setting.url+"deleteDailyRecord.json"
                this.deleteId.date=moment(this.deleteId.date).utcOffset(8).format("YYYY-MM-DD")
                this.$http.post(url2,{deleteId:this.deleteId}).then((res)=>{
                    if(res.body.code == 0){
                        this.data.splice(this.deleteIndex,1)
                        this.$Message.info(res.body.msg)
                    }
                },(res)=>{
                    console.log('信息删除出错，请重试')
                })
            },
            okAdd(){
                let _this=this
                this.addForm.sick=0
                this.addForm.ontime=0
                this.addForm.absence=0
                this.addForm.dleave=0
                this.addForm.truancy=0
                this.addForm.late=0
                for(let i=0;i<_this.addForm.attendence.length;i++){
                    if(_this.addForm.attendence[i]=="按时"){
                        _this.addForm.ontime=1
                    }
                    if(_this.addForm.attendence[i]=="迟到一次"){
                        _this.addForm.late=1
                    }
                    if(_this.addForm.attendence[i]=="迟到两次"){
                        _this.addForm.late=2
                    }
                    if(_this.addForm.attendence[i]=="早退一次"){
                        _this.addForm.dleave=1
                    }
                    if(_this.addForm.attendence[i]=="早退两次"){
                        _this.addForm.dleave=2
                    }
                    if(_this.addForm.attendence[i]=="病假一天"){
                        _this.addForm.sick=1
                    }
                    if(_this.addForm.attendence[i]=="病假半天"){
                        _this.addForm.sick=0.5
                    }
                    if(_this.addForm.attendence[i]=="事假一天"){
                        _this.addForm.absence=1
                    }
                    if(_this.addForm.attendence[i]=="事假半天"){
                        _this.addForm.absence=0.5
                    }
                    if(_this.addForm.attendence[i]=="旷课一天"){
                        _this.addForm.truancy=1
                    }
                    if(_this.addForm.attendence[i]=="旷课半天"){
                        _this.addForm.truancy=0.5
                    }
                }
                _this.addForm.date=moment(_this.addForm.date).utcOffset(8).format("YYYY-MM-DD")
                let url2=setting.url+"addDailyRecord.json"
                _this.$http.post(url2,{addForm:_this.addForm}).then((res)=>{
                    if(res.body.code == 0){
                        _this.data.push(res.body.data)
                        _this.$Message.success(res.body.msg)
                    }
                },(res)=>{
                    console.log('信息添加出错，请重试')
                })
            },
            ok () {
                this.editForm.sick=0
                this.editForm.ontime=0
                this.editForm.absence=0
                this.editForm.dleave=0
                this.editForm.truancy=0
                this.editForm.late=0
                for(let i=0;i<this.editForm.attendence.length;i++){
                    if(this.editForm.attendence[i]=="按时"){
                        this.editForm.ontime=1
                    }
                    if(this.editForm.attendence[i]=="迟到一次"){
                        this.editForm.late=1
                    }
                    if(this.editForm.attendence[i]=="迟到两次"){
                        this.editForm.late=2
                    }
                    if(this.editForm.attendence[i]=="早退一次"){
                        this.editForm.dleave=1
                    }
                    if(this.editForm.attendence[i]=="早退两次"){
                        this.editForm.dleave=2
                    }
                    if(this.editForm.attendence[i]=="病假一天"){
                        this.editForm.sick=1
                    }
                    if(this.editForm.attendence[i]=="病假半天"){
                        this.editForm.sick=0.5
                    }
                    if(this.editForm.attendence[i]=="事假一天"){
                        this.editForm.absence=1
                    }
                    if(this.editForm.attendence[i]=="事假半天"){
                        this.editForm.absence=0.5
                    }
                    if(this.editForm.attendence[i]=="旷课一天"){
                        this.editForm.truancy=1
                    }
                    if(this.editForm.attendence[i]=="旷课半天"){
                        this.editForm.truancy=0.5
                    }
                }
                this.editForm.date=moment(this.editForm.date).utcOffset(8).format("YYYY-MM-DD")
                let url3=setting.url+"alterDailyRecord.json"
                this.$http.post(url3,{editForm:this.editForm}).then((res)=>{
                    if(res.body.code == 0){
                        this.deepClone(this.editForm,this.data[this.editIndex])
                        this.$Message.success(res.body.msg)
                    }
                },(res)=>{
                    console.log('信息更改出错，请重试')
                })
            },
            handleMore(current){
                let _this=this
                let url12=setting.url+"getDailyRecord.json"
                this.myoffset=(current*20)-20
                this.$http.post(url12,{myoffset:_this.myoffset}).then(res=>{
                    if(res.body.code==0){
                        _this.data=res.body.data
                        _this.loading=false
                    }else{
                        _this.$Message.error("没有每日实习数据")
                    }
                })
                window.scrollTo(0,0)
            },
            cancel () {
                this.modal1=false
                this.modal2=false
                this.modal3=false
                this.modal4=false
            },
            deepClone (sourceObj, targetObj) {
                for (let key in sourceObj) {
                    targetObj[key] = sourceObj[key]
                }
            },
            search(){
                if(this.searchValue===''){
                    this.myoffset=0
                    let url12=setting.url+"getDailyRecord.json"
                    this.$http.post(url12,{myoffset:this.myoffset}).then(res=>{
                        if(res.body.code==0){
                            this.data=res.body.data
                            this.loading=false
                        }else{
                            this.$Message.error("没有每日实习数据")
                        }
                    })
                }else{
                    if(/^[0-9]+$/.test(this.searchValue)){
                        let url12=setting.url+"getDailyRecordByNum.json"
                        this.$http.post(url12,{num:this.searchValue}).then(res=>{
                            if(res.body.code==0){
                                this.data=res.body.data
                            }else{
                                this.$Message.error("没有每日实习数据")
                            }
                        })
                    }else{
                        this.$Message.error("您的学号格式有误")
                    }
                }
            },
            selectDep(myDepartment){
                let _this=this
                if(myDepartment != this.addDepartment && this.modal3==true){
                    this.addDepartment=this.addForm.department
                    let url12=setting.url+"getList.json"
                    this.$http.post(url12,{department:myDepartment}).then(res=>{
                        if(res.body.code==0){
                            this.$Message.info('loading......')
                            _this.diagnosisList=res.body.diagnosisList
                            _this.operationList=res.body.operationList
                        }
                    })
                }
                if(myDepartment != this.editDepartment && this.modal1==true){
                    this.editDepartment=this.editForm.department
                    let url12=setting.url+"getList.json"
                    this.$http.post(url12,{department:myDepartment}).then(res=>{
                        if(res.body.code==0){
                            this.$Message.info('loading......')
                            _this.diagnosisList=res.body.diagnosisList
                            _this.operationList=res.body.operationList
                        }
                    })
                }
                
            }
        }
    }
</script>
<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.echarts {
  width: 100%;
  height: 100%;
  z-index: 20;
}
.myCol{
  margin-top: 7px;
}
</style>

