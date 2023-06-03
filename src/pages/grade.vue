<template>
<div class="layout">
    <div :style="{padding: '0 12px 12px'}">
        <div :style="{padding: '12px', minHeight: '280px', background: '#fff' , margin:'24px'}">
            <row justify="start">
                <Col span="3" offset="18">
                    <Button type="primary" @click.native="handleAdd">新建成绩单</Button>
                </Col>
            </row>
            <Divider />
            <Table border size="small" :columns="columns" :data="data">
                <template slot-scope="{ row, index }" slot="action">
                    <div>
                        <Button type="primary" size="small" style="margin-right: 5px" @click="show(row,index)">详细</Button>
                        <Button type="primary" size="small" style="margin-right: 5px" @click="handleEdit(row, index)">修改</Button>
                        <Button type="error" size="small" @click="handleDelete(row, index)" style="margin-left:10px;">删除</Button>
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
                <Row style="margin-bottom:18px;margin-top:18px;">
                    <Col span="6" offset="2" class="myCol">学号：</Col>
                    <Col span="12">
                        <Input v-model="editForm.num" placeholder="请输入学号" style="width: 200px" />
                    </Col>
                </Row>
                <Row style="margin-bottom:18px;">
                    <Col span="6" offset="2" class="myCol">姓名：</Col>
                    <Col span="12">
                        <Input v-model="editForm.name" placeholder="请输入姓名" style="width: 200px" />
                    </Col>
                </Row>
                <Row style="margin-bottom:18px;">
                    <Col span="6" offset="2" class="myCol">科室：</Col>
                    <Col span="12">
                        <Input v-model="editForm.department" placeholder="请输入科室" style="width: 200px" />
                    </Col>
                </Row>
                <Row style="margin-bottom:18px;">
                    <Col span="6" offset="2">日期：</Col>
                    <Col span="12">
                        <DatePicker type="date" format="yyyy-MM-dd" v-model="editForm.Sdate" placeholder="请选择日期" style="width: 200px"></DatePicker>
                    </Col>
                </Row>
                <Row style="margin-bottom:18px;">
                    <Col span="6" offset="2" class="myCol">病历书写：</Col>
                    <Col span="12">
                        <Input v-model="editForm.writeMark" placeholder="请输入病历书写成绩" style="width: 200px" />
                        <p v-show="ifwriteMark" style="font-color:red;">格式错误</p>
                    </Col>
                </Row>
                <Row style="margin-bottom:18px;">
                    <Col span="6" offset="2" class="myCol">查体：</Col>
                    <Col span="12">
                        <Input v-model="editForm.physicalMark" placeholder="请输入查体成绩" style="width: 200px" />
                    </Col>
                </Row>
                <Row style="margin-bottom:18px;">
                    <Col span="6" offset="2" class="myCol">病历分析：</Col>
                    <Col span="12">
                        <Input v-model="editForm.analysisMark" placeholder="请输入病历分析成绩" style="width: 200px" />
                    </Col>
                </Row>
                <Row style="margin-bottom:18px;">
                    <Col span="6" offset="2" class="myCol">技能操作：</Col>
                    <Col span="12">
                        <Input v-model="editForm.performancMark" placeholder="请输入临床基本技能操作成绩" style="width: 200px" />
                    </Col>
                </Row>
                <Row style="margin-bottom:18px;">
                    <Col span="6" offset="2" class="myCol">口试：</Col>
                    <Col span="12">
                        <Input v-model="editForm.oralMark" placeholder="请输入口试成绩" style="width: 200px" />
                    </Col>
                </Row>
                <Row style="margin-bottom:18px;">
                    <Col span="6" offset="2" class="myCol">理论考试：</Col>
                    <Col span="12">
                        <Input v-model="editForm.testMark" placeholder="请输入理论考试成绩" style="width: 200px" />
                    </Col>
                </Row>
                <Row style="margin-bottom:18px;">
                    <Col span="6" offset="2" class="myCol">职业道德：</Col>
                    <Col span="12">
                        <Input v-model="editForm.ethnicsMark" placeholder="请输入职业道德成绩" style="width: 200px" />
                    </Col>
                </Row>
                <Row style="margin-bottom:18px;">
                    <Col span="6" offset="2" class="myCol">教师签名：</Col>
                    <Col span="12">
                        <Input v-model="editForm.signature" placeholder="请输入教师姓名" style="width: 200px" />
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
                title="新建信息"
                ok-text="确定"
                cancel-text="取消"
                @on-ok="okAdd"
                @on-cancel="cancel">
                <Row style="margin-bottom:18px;margin-top:18px;">
                    <Col span="6" offset="2" class="myCol">学号：</Col>
                    <Col span="12">
                        <Input v-model="addForm.num" placeholder="请输入学号" style="width: 200px" />
                    </Col>
                </Row>
                <Row style="margin-bottom:18px;">
                    <Col span="6" offset="2" class="myCol">姓名：</Col>
                    <Col span="12">
                        <Input v-model="addForm.name" placeholder="请输入姓名" style="width: 200px" />
                    </Col>
                </Row>
                <Row style="margin-bottom:18px;">
                    <Col span="6" offset="2" class="myCol">科室：</Col>
                    <Col span="12">
                        <Input v-model="addForm.department" placeholder="请输入科室" style="width: 200px" />
                    </Col>
                </Row>
                <Row style="margin-bottom:18px;">
                    <Col span="6" offset="2">考核日期：</Col>
                    <Col span="12">
                        <DatePicker type="date" format="yyyy-MM-dd" v-model="addForm.Sdate" placeholder="请选择日期" style="width: 200px"></DatePicker>
                    </Col>
                </Row>
                <Row style="margin-bottom:18px;">
                    <Col span="6" offset="2" class="myCol">病历书写：</Col>
                    <Col span="12">
                        <Input v-model="addForm.writeMark" placeholder="请输入病历书写成绩" style="width: 200px" />
                        <p v-show="ifwriteMark" style="font-color:red;">格式错误</p>
                    </Col>
                </Row>
                <Row style="margin-bottom:18px;">
                    <Col span="6" offset="2" class="myCol">查体：</Col>
                    <Col span="12">
                        <Input v-model="addForm.physicalMark" placeholder="请输入查体成绩" style="width: 200px" />
                    </Col>
                </Row>
                <Row style="margin-bottom:18px;">
                    <Col span="6" offset="2" class="myCol">病历分析：</Col>
                    <Col span="12">
                        <Input v-model="addForm.analysisMark" placeholder="请输入病历分析成绩" style="width: 200px" />
                    </Col>
                </Row>
                <Row style="margin-bottom:18px;">
                    <Col span="6" offset="2" class="myCol">技能操作：</Col>
                    <Col span="12">
                        <Input v-model="addForm.performancMark" placeholder="请输入临床基本技能操作成绩" style="width: 200px" />
                    </Col>
                </Row>
                <Row style="margin-bottom:18px;">
                    <Col span="6" offset="2" class="myCol">口试：</Col>
                    <Col span="12">
                        <Input v-model="addForm.oralMark" placeholder="请输入口试成绩" style="width: 200px" />
                    </Col>
                </Row>
                <Row style="margin-bottom:18px;">
                    <Col span="6" offset="2" class="myCol">理论考试：</Col>
                    <Col span="12">
                        <Input v-model="addForm.testMark" placeholder="请输入理论考试成绩" style="width: 200px" />
                    </Col>
                </Row>
                <Row style="margin-bottom:18px;">
                    <Col span="6" offset="2" class="myCol">职业道德：</Col>
                    <Col span="12">
                        <Input v-model="addForm.ethnicsMark" placeholder="请输入职业道德成绩" style="width: 200px" />
                    </Col>
                </Row>
                <Row style="margin-bottom:18px;">
                    <Col span="6" offset="2" class="myCol">教师签名：</Col>
                    <Col span="12">
                        <Input v-model="addForm.signature" placeholder="请输入教师姓名" style="width: 200px" />
                    </Col>
                </Row>
            </Modal>
            <Modal
                v-model="modal4"
                title="成绩单详细信息"
                ok-text="确定"
                cancel-text="关闭"
                @on-ok="cancel"
                @on-cancel="cancel">
                <Row style="margin-bottom:24px;">
                    <Col span="6" offset="2" class="myCol" >学生学号：</Col>
                    <Col span="16">
                        <p style="width: 250px;" class="myCol">{{showForm.num}}</p>
                    </Col>
                </Row>
                <Row style="margin-bottom:24px;">
                    <Col span="6" offset="2" class="myCol">学生姓名：</Col>
                    <Col span="16">
                        <p style="width: 250px;" class="myCol">{{showForm.name}}</p>
                    </Col>
                </Row>
                <Row style="margin-bottom:24px;">
                    <Col span="6" offset="2" class="myCol">所在科室：</Col>
                    <Col span="16">
                            <p style="width: 250px;" class="myCol">{{showForm.department}}</p>
                    </Col>
                </Row>
                <Row style="margin-bottom:24px;">
                    <Col span="6" offset="2" class="myCol">考核日期：</Col>
                    <Col span="16">                        
                        <p style="width: 250px;" class="myCol">{{showForm.Sdate}}</p>
                    </Col>
                </Row>
                <Row style="margin-bottom:24px;">
                    <Col span="6" offset="2" class="myCol">病历书写：</Col>
                    <Col span="16">
                        <p style="width: 250px;" class="myCol">{{showForm.writeMark}}</p>
                    </Col>
                </Row>
                <Row style="margin-bottom:24px;">
                    <Col span="6" offset="2" class="myCol">查体：</Col>
                    <Col span="16">
                            <p style="width: 250px;" class="myCol">{{showForm.physicalMark}}</p>
                    </Col>
                </Row>
                <Row style="margin-bottom:24px;">
                    <Col span="6" offset="2" class="myCol">病历分析：</Col>
                    <Col span="16">
                        <p style="width: 250px;" class="myCol">{{showForm.analysisMark}}</p>
                    </Col>
                </Row>
                <Row style="margin-bottom:24px;">
                    <Col span="6" offset="2" class="myCol">技能操作：</Col>
                    <Col span="16">
                            <p style="width: 250px;" class="myCol">{{showForm.performancMark}}</p>
                    </Col>
                </Row>
                <Row style="margin-bottom:24px;">
                    <Col span="6" offset="2" class="myCol">口试：</Col>
                    <Col span="16">
                            <p style="width: 250px;" class="myCol">{{showForm.oralMark}}</p>
                    </Col>
                </Row>
                <Row style="margin-bottom:24px;">
                    <Col span="6" offset="2" class="myCol">理论考试：</Col>
                    <Col span="16">
                            <p style="width: 250px;" class="myCol">{{showForm.testMark}}</p>
                    </Col>
                </Row>
                <Row style="margin-bottom:24px;">
                    <Col span="6" offset="2" class="myCol">职业道德：</Col>
                    <Col span="16">
                        <p style="width: 250px;" class="myCol">{{showForm.ethnicsMark}}</p>
                    </Col>
                </Row>
                <Row style="margin-bottom:24px;">
                    <Col span="6" offset="2" class="myCol">总分：</Col>
                    <Col span="16">
                        <p style="width: 250px;" class="myCol">{{showForm.totalMark}}</p>
                    </Col>
                </Row>
                <Row style="margin-bottom:24px;">
                    <Col span="6" offset="2" class="myCol">教师签名：</Col>
                    <Col span="16">
                        <p style="width: 250px;" class="myCol">{{showForm.signature}}</p>
                    </Col>
                </Row>
            </Modal>
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
            minHeight:0,
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
                    title: '总分',
                    key: 'totalMark',
                    sortable: true
                },   
                {
                    title: '考核时间',
                    key: 'Sdate',
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
                id:'',
                num:'',
                name:'',
                department:'',
                Sdate:'',
                writeMark:'',
                physicalMark:'',
                analysisMark:'',
                performancMark:'',
                oralMark:'',
                testMark:'',
                ethnicsMark:'',
                totalMark:'',
                signature:'',
            },
            addForm:{
                id:'',
                num:'',
                name:'',
                department:'',
                Sdate:'',
                writeMark:'',
                physicalMark:'',
                analysisMark:'',
                performancMark:'',
                oralMark:'',
                testMark:'',
                ethnicsMark:'',
                totalMark:'',
                signature:'',
            },
            deleteId:-1,
            deleteIndex:-1,
            ifwriteMark:0,
        }
    },
    mounted(){ },
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
            let url2=setting.url+"deleteGrade.json"
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
            this.addForm.totalMark=parseInt(this.addForm.writeMark)+parseInt(this.addForm.physicalMark)+parseInt(this.addForm.analysisMark)+parseInt(this.addForm.ethnicsMark)+parseInt(this.addForm.performancMark)+parseInt(this.addForm.oralMark)+parseInt(this.addForm.testMark)
            let url2=setting.url+"addGrade.json"
            _this.$http.post(url2,{addForm:_this.addForm}).then((res)=>{
                if(res.body.code == 0){
                    let myForm=res.body.data
                    myForm.Sdate=moment(myForm.Sdate).format("YYYY-MM-DD")
                    _this.data.push(myForm)
                    _this.$Message.success(res.body.msg)
                }
            },(res)=>{
                console.log('信息添加出错，请重试')
            })
        },
        ok () {
            let _this=this
            let url3=setting.url+"alterGrade.json"
            _this.$http.post(url3,{editForm:_this.editForm}).then((res)=>{
                if(res.body.code == 0){
                    _this.data[_this.editIndex].id=_this.editForm.id
                    _this.data[_this.editIndex].num=_this.editForm.num
                    _this.data[_this.editIndex].name=_this.editForm.name
                    _this.data[_this.editIndex].department=_this.editForm.department
                    _this.data[_this.editIndex].writeMark=_this.editForm.writeMark
                    _this.data[_this.editIndex].physicalMark=_this.editForm.physicalMark
                    _this.data[_this.editIndex].analysisMark=_this.editForm.analysisMark
                    _this.data[_this.editIndex].performancMark=_this.editForm.performancMark
                    _this.data[_this.editIndex].oralMark=_this.editForm.oralMark
                    _this.data[_this.editIndex].testMark=_this.editForm.testMark
                    _this.data[_this.editIndex].ethnicsMark=_this.editForm.ethnicsMark
                    _this.data[_this.editIndex].totalMark=parseInt(this.editForm.writeMark)+parseInt(this.editForm.physicalMark)+parseInt(this.editForm.analysisMark)+parseInt(this.editForm.ethnicsMark)+parseInt(this.editForm.performancMark)+parseInt(this.editForm.oralMark)+parseInt(this.editForm.testMark)
                    _this.data[_this.editIndex].signature=_this.editForm.signature
                    _this.data[_this.editIndex].Sdate=moment(_this.editForm.Sdate).format("YYYY-MM-DD")
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
