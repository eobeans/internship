<template>
    <div class="layout">
        <Layout>
            <Layout>
                <Layout :style="{padding: '0 12px 12px'}">
                    <Content :style="{padding: '12px', minHeight: '280px', background: '#fff' , margin:'24px'}">
                        <row justify="start">
                            <Col span="3" offset="18">
                                <Button type="primary" @click.native.prevent="handleAdd">新建学生信息</Button>
                            </Col>
                        </row>
                        <Divider />
                        <Table border size="small" :columns="columns" :data="data">
                            <template slot-scope="{ row, index }" slot="action">
                                <div>
                                    <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详细</Button>
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
                                <Col span="6" offset="2">学号：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.num" placeholder="请输入您的学号" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="6" offset="2">姓名：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.name" placeholder="请输入真实姓名" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="6" offset="2">专业：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.major" placeholder="请输入您的专业" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="6" offset="2">年级：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.rank" placeholder="请输入您的年级" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="6" offset="2">国籍：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.nation" placeholder="请输入您的国籍" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2">实习城市：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.city"  placeholder="请输入实习城市" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2">实习医院：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.hospital"  placeholder="请输入实习医院" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2">手机号码：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.phone"  placeholder="请输入手机号码" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2">电子邮箱：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.email"  placeholder="请输入电子邮箱" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2">openId：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.openId"  placeholder="请确认openId" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2">password:</Col>
                                <Col span="12">
                                    <Input v-model="editForm.password"  placeholder="请确认password" style="width: 200px" />
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
                                <Col span="6" offset="2">学号：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.num" placeholder="请输入您的学号" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="6" offset="2">姓名：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.name" placeholder="请输入真实姓名" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="6" offset="2">专业：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.major" placeholder="请输入您的专业" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="6" offset="2">年级：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.rank" placeholder="请输入您的年级" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="6" offset="2">国籍：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.nation" placeholder="请输入您的国籍" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2">实习城市：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.city"  placeholder="请输入实习城市" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2">实习医院：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.hospital"  placeholder="请输入实习医院" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2">手机号码：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.phone"  placeholder="请确认手机号码" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2">电子邮箱：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.email"  placeholder="请确认电子邮箱" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2">openId：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.openId"  placeholder="请确认openId" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2">password:</Col>
                                <Col span="12">
                                    <Input v-model="addForm.password"  placeholder="请确认password" style="width: 200px" />
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
                        title: '年级',
                        key: 'rank',
                        sortable: true
                    }, 
                    {
                        title: '实习城市',
                        key: 'city'
                    },   
                    {
                        title: '实习医院',
                        key: 'hospital'
                    }, 
                    {
                        title:'操作',
                        slot:'action'
                    }
                ],
                data:[],
                editForm:{
                    id:'',
                    num:'',
                    name:'',
                    major:'',
                    rank:'',
                    nation:'',
                    city:'',
                    hospital:'',
                    phone:'',
                    email:'',
                    openId:'',
                    password:'',
                },
                addForm:{
                    num:'',
                    name:'',
                    major:'',
                    rank:'',
                    nation:'',
                    city:'',
                    hospital:'',
                    phone:'',
                    email:'',
                    openId:'',
                    password:'',
                    
                },
                deleteId:-1,
                deleteIndex:-1,
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
            show (index) {
                this.$Modal.success({
                    title: '学生信息',
                    content: `学号：${this.data[index].num}<br>姓名：${this.data[index].name}<br>专业：${this.data[index].major}<br>年级：${this.data[index].rank}<br>国籍：${this.data[index].nation}<br>实习城市：${this.data[index].city}<br>实习医院：${this.data[index].hospital}<br>手机号码：${this.data[index].phone}<br>电子邮箱：${this.data[index].email}<br>openId：${this.data[index].openId}<br>password：${this.data[index].password}`
                })
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
                let url2=setting.url+"deleteStudent.json"
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
                let url2=setting.url+"addStudent.json"
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
                let _this=this
                let url3=setting.url+"alterStudent.json"
                _this.$http.post(url3,{editForm:_this.editForm}).then((res)=>{
                    if(res.body.code == 0){
                        _this.data[_this.editIndex].id=_this.editForm.id
                        _this.data[_this.editIndex].num=_this.editForm.num
                        _this.data[_this.editIndex].name=_this.editForm.name
                        _this.data[_this.editIndex].major=_this.editForm.major
                        _this.data[_this.editIndex].rank=_this.editForm.rank
                        _this.data[_this.editIndex].nation=_this.editForm.nation
                        _this.data[_this.editIndex].city=_this.editForm.city
                        _this.data[_this.editIndex].hospital=_this.editForm.hospital
                        _this.data[_this.editIndex].phone=_this.editForm.phone
                        _this.data[_this.editIndex].email=_this.editForm.email
                        _this.data[_this.editIndex].openId=_this.editForm.openId
                        _this.data[_this.editIndex].password=_this.editForm.password
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
            },
        }
    }
</script>
