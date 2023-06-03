<template>
    <div class="layout">
        <div>
            <div>
                <div :style="{padding: '0 12px 12px'}">
                    <div :style="{padding: '12px', minHeight: '280px', background: '#fff' , margin:'24px'}">
                        <row justify="start">
                            <Col span="3" offset="18">
                                <Button type="primary" @click.native.prevent="handleAdd">新建实习轮转表</Button>
                            </Col>
                        </row>
                        <Divider />
                        <Table border size="small" :columns="columns" :data="data">
                            <template slot-scope="{ row, index }" slot="action">
                                <div>
                                    <Button type="primary" size="small" style="margin-right: 5px" @click="show(row, index)">详情</Button>
                                    <Button type="primary" size="small" style="margin-right: 5px" @click="handleEdit(row, index)">修改</Button>
                                    <Button type="error" size="small" @click="handleDelete(row, index)">删除</Button>
                                </div>
                            </template>
                        </Table>
                        <Modal
                            v-model="modal1"
                            title="修改信息"
                            ok-text="保存"
                            cancel-text="取消"
                            @on-ok="ok"
                            @on-cancel="cancel">
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">学生学号：</Col>
                                <Col span="12">
                                     <Input v-model="editForm.num"  placeholder="请输入学生学号" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">学生姓名：</Col>
                                <Col span="12">
                                     <Input v-model="editForm.name"  placeholder="请输入学生姓名" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">所在科室：</Col>
                                <Col span="12">
                                     <Input v-model="editForm.department"  placeholder="请输入所在科室名" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">开始时间：</Col>
                                <Col span="12">
                                     <DatePicker type="date" format="yyyy-MM-dd" @on-change="editForm.beginTime=$event" v-model="editForm.beginTime" placeholder="请选择日期" style="width: 200px"></DatePicker>                                
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">结束时间：</Col>
                                <Col span="12">
                                     <DatePicker type="date" format="yyyy-MM-dd" @on-change="editForm.endTime=$event" v-model="editForm.endTime" placeholder="请选择日期" style="width: 200px"></DatePicker>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">学生小结：</Col>
                                <Col span="12">
                                     <Input v-model="editForm.report"  placeholder="请输入学生小结" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">学生小结日期：</Col>
                                <Col span="12">
                                     <DatePicker type="date" format="yyyy-MM-dd"  @on-change="editForm.reportDate=$event" v-model="editForm.reportDate" placeholder="请选择日期" style="width: 200px"></DatePicker>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">教师评语：</Col>
                                <Col span="12">
                                     <Input v-model="editForm.teachComment"  placeholder="请输入教师评语" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">科室意见：</Col>
                                <Col span="12">
                                     <Input v-model="editForm.directorComment"  placeholder="请输入科室意见" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">主任签名：</Col>
                                <Col span="12">
                                     <Input v-model="editForm.directorCheck"  placeholder="请输入主任姓名" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">主任签名日期：</Col>
                                <Col span="12">
                                    <DatePicker type="date" format="yyyy-MM-dd"  @on-change="editForm.checkDate=$event" v-model="editForm.checkDate" placeholder="请选择日期" style="width: 200px"></DatePicker>
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
                            @on-ok="okAdd"
                            @on-cancel="cancel">
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">学生学号：</Col>
                                <Col span="12">
                                     <Input v-model="addForm.num"  placeholder="请输入学生学号" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">学生姓名：</Col>
                                <Col span="12">
                                     <Input v-model="addForm.name"  placeholder="请输入学生姓名" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">所在科室：</Col>
                                <Col span="12">
                                     <Input v-model="addForm.department"  placeholder="请输入所在科室名" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">开始时间：</Col>
                                <Col span="12">
                                     <DatePicker type="date" format="yyyy-MM-dd" v-model="addForm.beginTime" placeholder="请选择日期" style="width: 200px"></DatePicker>                                
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">结束时间：</Col>
                                <Col span="12">
                                     <DatePicker type="date" format="yyyy-MM-dd" v-model="addForm.endTime" placeholder="请选择日期" style="width: 200px"></DatePicker>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">学生小结：</Col>
                                <Col span="12">
                                     <Input v-model="addForm.report"  placeholder="请输入学生小结" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">学生小结日期：</Col>
                                <Col span="12">
                                     <DatePicker type="date" format="yyyy-MM-dd" v-model="addForm.reportDate" placeholder="请选择日期" style="width: 200px"></DatePicker>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">教师评语：</Col>
                                <Col span="12">
                                     <Input v-model="addForm.teachComment"  placeholder="请输入教师评语" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">科室意见：</Col>
                                <Col span="12">
                                     <Input v-model="addForm.directorComment"  placeholder="请输入科室意见" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">主任签名：</Col>
                                <Col span="12">
                                     <Input v-model="addForm.directorCheck"  placeholder="请输入主任姓名" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">主任签名日期：</Col>
                                <Col span="12">
                                    <DatePicker type="date" format="yyyy-MM-dd" v-model="addForm.checkDate" placeholder="请选择日期" style="width: 200px"></DatePicker>
                                </Col>
                            </Row>
                        </Modal>
                        <Modal
                            v-model="modal4"
                            title="实习轮转表详细信息"
                            ok-text="确定"
                            cancel-text="关闭"
                            @on-ok="cancel"
                            @on-cancel="cancel">
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" >学生学号：</Col>
                                <Col span="16">
                                    <p style="width: 250px">{{showForm.num}}</p>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">学生姓名：</Col>
                                <Col span="16">
                                    <p style="width: 250px;margin-top: 7px;">{{showForm.name}}</p>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">所在科室：</Col>
                                <Col span="16">
                                     <p style="width: 250px;margin-top: 7px;">{{showForm.department}}</p>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">开始时间：</Col>
                                <Col span="16">                        
                                    <p style="width: 250px;margin-top: 7px;">{{showForm.beginTime}}</p>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">结束时间：</Col>
                                <Col span="16">
                                    <p style="width: 250px;margin-top: 7px;">{{showForm.endTime}}</p>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">学生小结：</Col>
                                <Col span="16">
                                     <p style="width: 250px;margin-top: 7px;">{{showForm.report}}</p>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">学生小结日期：</Col>
                                <Col span="16">
                                    <p style="width: 250px;margin-top: 7px;">{{showForm.reportDate}}</p>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">教师评语：</Col>
                                <Col span="16">
                                     <p style="width: 250px;margin-top: 7px;">{{showForm.teachComment}}</p>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">科室意见：</Col>
                                <Col span="16">
                                     <p style="width: 250px;margin-top: 7px;">{{showForm.directorComment}}</p>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">主任签名：</Col>
                                <Col span="16">
                                     <p style="width: 250px;margin-top: 7px;">{{showForm.directorCheck}}</p>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2" class="myCol">主任签名日期：</Col>
                                <Col span="16">
                                    <p style="width: 250px;margin-top: 7px;">{{showForm.checkDate}}</p>
                                </Col>
                            </Row>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import setting from '../setting'
    import moment from 'moment'
    export default {
        data(){
            return{
                editIndex:-1,
                modal1:false,
                modal2:false,
                modal3:false,
                modal4:false,
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
                        title: '开始时间',
                        key: 'beginTime',
                        sortable: true
                    },   
                    {
                        title: '结束时间',
                        key: 'endTime',
                        sortable: true
                    }, 
                    {
                        title: '实习时长(天)',
                        key: 'myduration',
                        sortable: true
                    }, 
                    {
                        title:'操作',
                        slot:'action'
                    }
                ],
                data:[],
                showForm:{},
                editForm:{
                    num:'',
                    name:'',
                    department:'',
                    beginTime:'',
                    endTime:'',
                    report:'',
                    reportDate:'',
                    teachComment:'',
                    directorComment:'',
                    directorCheck:'',
                    checkDate:'',
                },
                addForm:{
                    num:'',
                    name:'',
                    department:'',
                    beginTime:'',
                    endTime:'',
                    report:'',
                    reportDate:'',
                    teachComment:'',
                    directorComment:'',
                    directorCheck:'',
                    checkDate:moment().format("YYYY-MM-DD"),
                },
                deleteId:-1,
                deleteIndex:-1,
            }
        },
        mounted(){
            // let _this=this
            // this.minHeight=document.body.clientHeight-210
            // if(this.$store.state.User.teaNum!=''){
            //     let url1=setting.url+"getAllRotation.json"
            //     this.$http.get(url1).then(res=>{
            //         if(res.body.code==0){
            //             _this.data=res.body.data
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
                this.editIndex = index
                let _obj = JSON.stringify(row)
                let objClone = JSON.parse(_obj)
                this.editForm=objClone
                this.modal1=true
            },
            handleDelete(row,index){
                this.deleteId=row.id
                this.deleteIndex=index
                this.modal2=true
            },
            handleAdd(){
                this.modal3=true
            },
            okDelete(){
                let _this=this
                let url2=setting.url+"deleteRotation.json"
                _this.$http.post(url2,{deleteId:_this.deleteId}).then((res)=>{
                    if(res.body.code == 0){
                        _this.data.splice(_this.deleteIndex,1)
                        _this.$Message.info(res.body.msg)
                    }
                },(res)=>{
                    console.log('信息删除出错，请重试')
                })
            },
            okAdd(){
                let _this=this
                let url2=setting.url+"addRotation.json"
                _this.$http.post(url2,{addForm:_this.addForm}).then((res)=>{
                    if(res.body.code == 0){
                        let myForm=res.body.data
                        myForm.myduration=moment(_this.addForm.endTime).diff(moment(_this.addForm.beginTime),"days")
                        myForm.beginTime=moment(_this.addForm.beginTime).format("YYYY-MM-DD")
                        myForm.endTime=moment(_this.addForm.endTime).format("YYYY-MM-DD")
                        _this.data.push(myForm)
                        _this.$Message.success(res.body.msg)
                    }
                },(res)=>{
                    console.log('信息添加出错，请重试')
                })
            },
            ok () {
                let _this=this
                let url3=setting.url+"alterRotation.json"
                _this.$http.post(url3,{editForm:_this.editForm}).then((res)=>{
                    if(res.body.code == 0){
                        _this.data[_this.editIndex].num=_this.editForm.num
                        _this.data[_this.editIndex].department=_this.editForm.department
                        _this.data[_this.editIndex].report=_this.editForm.report
                        _this.data[_this.editIndex].teachComment=_this.editForm.teachComment
                        _this.data[_this.editIndex].directorComment=_this.editForm.directorComment
                        _this.data[_this.editIndex].directorCheck=_this.editForm.directorCheck
                        _this.data[_this.editIndex].id=_this.editForm.id
                        _this.data[_this.editIndex].myduration=moment(_this.editForm.endTime).diff(moment(_this.editForm.beginTime),"days")
                        _this.data[_this.editIndex].beginTime=moment(_this.editForm.beginTime).format("YYYY-MM-DD")
                        _this.data[_this.editIndex].endTime=moment(_this.editForm.endTime).format("YYYY-MM-DD")
                        _this.data[_this.editIndex].checkDate=moment(_this.editForm.checkDate).format("YYYY-MM-DD")
                        _this.data[_this.editIndex].reportDate=moment(_this.editForm.reportDate).format("YYYY-MM-DD")
                        _this.$Message.success(res.body.msg)
                    }
                },(res)=>{
                    console.log('信息更改出错，请重试')
                })
            },
            cancel () {
                this.modal1=false
                this.modal2=false
                this.modal3=false
                this.modal4=false
            },
        }
    }
</script>
