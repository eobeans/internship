<template>
    <div class="layout">
        <Layout>
            <Layout>
                <Layout :style="{padding: '0 12px 12px'}">
                    <Content :style="{padding: '12px', minHeight: '280px', background: '#fff' , margin:'24px'}">
                        <row justify="start">
                            <Col span="3" offset="18">
                                <Button type="primary" @click.native.prevent="handleAdd">新建学校账号信息</Button>
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
                                <Col span="6" offset="2">编号：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.teaNum" placeholder="请输入您的编号" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="6" offset="2">姓名：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.teaName" placeholder="请输入您得姓名" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="6" offset="2">手机号码：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.teaPhone" placeholder="请输入手机号码" style="width: 200px" />
                                </Col>
                            </Row>

                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2">密码：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.teaPassword" placeholder="请输入密码" style="width: 200px" />
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
                            title="新建账号信息"
                            ok-text="新建"
                            cancel-text="取消"
                            @on-ok="okAdd"
                            @on-cancel="cancel">
                            <Row style="margin-bottom:18px;margin-top:18px;">
                                <Col span="6" offset="2">编号：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.teaNum" placeholder="请输入您的编号" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="6" offset="2">姓名：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.teaName" placeholder="请输入您得姓名" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="6" offset="2">手机号码：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.teaPhone" placeholder="请输入手机号码" style="width: 200px" />
                                </Col>
                            </Row>

                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2">密码：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.teaPassword" placeholder="请输入密码" style="width: 200px" />
                                </Col>
                            </Row>
                        </Modal>
                        <Modal
                            v-model="modal4"
                            title="详细账号信息"
                            ok-text="确定"
                            cancel-text="取消"
                            @on-ok="cancel"
                            @on-cancel="cancel">
                            <Row style="margin-bottom:18px;margin-top:18px;">
                                <Col span="6" offset="2">编号：</Col>
                                <Col span="12">
                                    <p>{{showForm.teaNum}}</p>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="6" offset="2">姓名：</Col>
                                <Col span="12">
                                     <p>{{showForm.teaName}}</p>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="6" offset="2">手机号码：</Col>
                                <Col span="12">
                                     <p>{{showForm.teaPhone}}</p>
                                </Col>
                            </Row>

                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2">密码：</Col>
                                <Col span="12">
                                     <p>{{showForm.teaPassword}}</p>
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
                modal1:false,
                modal2:false,
                modal3:false,
                modal4:false,
                columns: [
                    {
                        title: '编号',
                        key: 'teaNum',
                        sortable: true
                    },
                    {
                        title: '姓名',
                        key: 'teaName'
                    },
                    {
                        title: '手机号',
                        key: 'teaPhone',
                    }, 
                    {
                        title:'操作',
                        slot:'action'
                    }
                ],
                data:[],
                editForm:{
                    id:'',
                    teaNum:'',
                    teaName:'',
                    teaPhone:'',
                    teaPassword:'',
                },
                addForm:{
                    id:'',
                    teaNum:'',
                    teaName:'',
                    teaPhone:'',
                    teaPassword:'',
                },
                showForm:{},
                editIndex:-1,
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
                    case 11:
                        _this.$router.push('/mytest')
                        break
                    default:
                        _this.$Message.error('发生了意料之外的错误')
                        break
                }
            },
            show(row,index){
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
                let url2=setting.url+"deleteTeacher.json"
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
                let url2=setting.url+"addTeacher.json"
                _this.$http.post(url2,{form:_this.addForm}).then((res)=>{
                    if(res.body.code == 0){
                        _this.data.unshift(res.body.data)
                        _this.$Message.success(res.body.msg)
                    }
                },(res)=>{
                    console.log('信息添加出错，请重试')
                })
            },
            ok () {
                let _this=this
                let url3=setting.url+"alterTeacher.json"
                _this.$http.post(url3,{form:_this.editForm}).then((res)=>{
                    if(res.body.code == 0){
                        _this.data[_this.editIndex].id=_this.editForm.id
                        _this.data[_this.editIndex].teaNum=_this.editForm.teaNum
                        _this.data[_this.editIndex].teaName=_this.editForm.teaName
                        _this.data[_this.editIndex].teaPhone=_this.editForm.teaPhone
                        _this.data[_this.editIndex].teaPassword=_this.editForm.teaPassword
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