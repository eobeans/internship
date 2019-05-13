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
</style>
<template>
    <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" :style="{background: '#fff'}">
                <Menu active-name="1-9" theme="light" width="auto" :style="{ minHeight: minHeight + 'px'}">
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
            </Sider>
            <Layout>
                <Layout :style="{padding: '0 12px 12px'}">
                    <Content :style="{padding: '12px', minHeight: '280px', background: '#fff' , margin:'24px'}">
                        <row justify="start">
                            <Col span="3" offset="18">
                                <Button type="primary" @click.native.prevent="handleAdd">新建医院账号信息</Button>
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
                                <Col span="6" offset="2">所属医院：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.docHosipital" placeholder="请输入您的医院" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;margin-top:18px;">
                                <Col span="6" offset="2">所属科室：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.docDepartment" placeholder="请输入您的科室" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;margin-top:18px;">
                                <Col span="6" offset="2">编号：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.docNum" placeholder="请输入您的编号" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="6" offset="2">姓名：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.docName" placeholder="请输入您得姓名" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="6" offset="2">手机号码：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.docPhone" placeholder="请输入手机号码" style="width: 200px" />
                                </Col>
                            </Row>

                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2">密码：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.docPassword" placeholder="请输入密码" style="width: 200px" />
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
                                <Col span="6" offset="2">所属医院：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.docHosipital" placeholder="请输入您的医院" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;margin-top:18px;">
                                <Col span="6" offset="2">所属科室：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.docDepartment" placeholder="请输入您的科室" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;margin-top:18px;">
                                <Col span="6" offset="2">编号：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.docNum" placeholder="请输入您的编号" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="6" offset="2">姓名：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.docName" placeholder="请输入您得姓名" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="6" offset="2">手机号码：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.docPhone" placeholder="请输入手机号码" style="width: 200px" />
                                </Col>
                            </Row>

                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2">密码：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.docPassword" placeholder="请输入密码" style="width: 200px" />
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
                                <Col span="6" offset="2">所属医院：</Col>
                                <Col span="12">
                                    <p>{{showForm.docHosipital}}</p>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;margin-top:18px;">
                                <Col span="6" offset="2">所属科室：</Col>
                                <Col span="12">
                                    <p>{{showForm.docDepartment}}</p>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;margin-top:18px;">
                                <Col span="6" offset="2">编号：</Col>
                                <Col span="12">
                                    <p>{{showForm.docNum}}</p>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="6" offset="2">姓名：</Col>
                                <Col span="12">
                                     <p>{{showForm.docName}}</p>
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;">
                                <Col span="6" offset="2">手机号码：</Col>
                                <Col span="12">
                                     <p>{{showForm.docPhone}}</p>
                                </Col>
                            </Row>

                            <Row style="margin-bottom:24px;">
                                <Col span="6" offset="2">密码：</Col>
                                <Col span="12">
                                     <p>{{showForm.docPassword}}</p>
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
                minHeight:0,
                modal1:false,
                modal2:false,
                modal3:false,
                modal4:false,
                columns: [
                    {
                        title: '所属医院',
                        key: 'docHosipital',
                        sortable: true
                    }, 
                    {
                        title: '编号',
                        key: 'docNum',
                        sortable: true
                    },
                    {
                        title: '姓名',
                        key: 'docName'
                    },
                    {
                        title: '手机号',
                        key: 'docPhone',
                    }, 
                    {
                        title:'操作',
                        slot:'action'
                    }
                ],
                data:[],
                editForm:{
                    id:'',
                    docNum:'',
                    docName:'',
                    docPhone:'',
                    docPassword:'',
                    docHosipital:'',
                    docDepartment:'',
                },
                addForm:{
                    id:'',
                    docNum:'',
                    docName:'',
                    docPhone:'',
                    docPassword:'',
                    docHosipital:'',
                    docDepartment:'',
                },
                showForm:{},
                editIndex:-1,
                deleteId:-1,
                deleteIndex:-1,
            }
        },
        mounted(){
            let _this=this
            this.minHeight=document.body.clientHeight-210
            if(this.$store.state.User.teaNum!=''){
                let url1=setting.url+"getDoctor.json"
                this.$http.get(url1).then(res=>{
                    if(res.body.code==0){
                        _this.data=res.body.data
                    }else{
                        _this.$Message.error(res.body.err)
                    }
                })
            }else{
                this.$Message.error('请先登入！')
                this.$router.push('/login')
            }
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
                let url2=setting.url+"deleteDoctor.json"
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
                let url2=setting.url+"addDoctor.json"
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
                let url3=setting.url+"alterDoctor.json"
                _this.$http.post(url3,{form:_this.editForm}).then((res)=>{
                    if(res.body.code == 0){
                        _this.data[_this.editIndex].id=_this.editForm.id
                        _this.data[_this.editIndex].docNum=_this.editForm.docNum
                        _this.data[_this.editIndex].docName=_this.editForm.docName
                        _this.data[_this.editIndex].docPhone=_this.editForm.docPhone
                        _this.data[_this.editIndex].docPassword=_this.editForm.docPassword
                        _this.data[_this.editIndex].docHosipital=_this.editForm.docHosipital
                        _this.data[_this.editIndex].docDepartment=_this.editForm.docDepartment
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