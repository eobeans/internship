<template>
    <div class="layout">
        <Layout>
            <Layout>
                <Layout :style="{padding: '0 12px 12px'}">
                    <Content :style="{padding: '12px', minHeight: '280px', background: '#fff' , margin:'24px'}">
                        <row justify="start">
                            <Col span="3" offset="18">
                                <Button type="primary" @click="myadd">新建临床操作信息</Button>
                            </Col>
                        </row>
                        <Divider />
                        <Table border size="small" :columns="columns" :data="data">
                            <template slot-scope="{ row, index }" slot="action">
                                <div>
                                    <Button type="primary" size="small" style="margin-right: 5px;margin-left:10px;" @click="myalter(row,index)">修改临床操作</Button>
                                    <Button type="error" size="small" @click="mydelete(row, index)" style="margin-left:10px;">删除临床操作</Button>
                                </div>
                            </template>
                        </Table>
                        <Page :total="total" :page-size="20" :current="1" @on-change="handleMore" style="margin-top:22px;"/>
                        <Modal
                            v-model="modal1"
                            title="新建临床操作信息"
                            ok-text="新建"
                            cancel-text="关闭"
                            @on-ok="addDisease"
                            @on-cancel="cancel">
                            <Row style="margin-bottom:18px;margin-top:18px;">
                                <Col span="6" offset="2">科室：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.department" placeholder="请输入该临床操作所属科室" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;margin-top:18px;">
                                <Col span="6" offset="2">临床操作-中文名：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.operation" placeholder="请输入临床操作-中文名" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;margin-top:18px;">
                                <Col span="6" offset="2">临床操作-英文名：</Col>
                                <Col span="12">
                                    <Input v-model="addForm.Eoperation" placeholder="请输入临床操作-英文名" style="width: 200px" />
                                </Col>
                            </Row>
                        </Modal>
                        <Modal
                            v-model="modal2"
                            title="修改病种信息"
                            ok-text="保存"
                            cancel-text="关闭"
                            @on-ok="editDisease"
                            @on-cancel="cancel">
                            <Row style="margin-bottom:18px;margin-top:18px;">
                                <Col span="6" offset="2">科室：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.department" placeholder="请输入临床操作所属科室" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;margin-top:18px;">
                                <Col span="6" offset="2">临床操作-中文名：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.operation" placeholder="请输入临床操作-中文名" style="width: 200px" />
                                </Col>
                            </Row>
                            <Row style="margin-bottom:18px;margin-top:18px;">
                                <Col span="6" offset="2">临床操作-英文名：</Col>
                                <Col span="12">
                                    <Input v-model="editForm.Eoperation" placeholder="请输入临床操作-英文名" style="width: 200px" />
                                </Col>
                            </Row>
                        </Modal>
                        <Modal
                            v-model="modal3"
                            title="删除信息"
                            ok-text="确定"
                            cancel-text="取消"
                            @on-ok="deleteDisease"
                            @on-cancel="cancel">
                            <Row style="margin-bottom:24px;">
                                <Col span="12" offset="3" style="font-size:16px;margin:8px;">
                                    <Icon type="ios-trash" />
                                    是否删除该信息
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
                columns: [
                    {
                        title: '科室',
                        key: 'department',
                        sortable: true
                    },
                    {
                        title: '临床操作-中文名',
                        key: 'operation'
                    },
                    {
                        title: '临床操作-英文名',
                        key: 'Eoperation',
                    }, 
                    {
                        title:'操作',
                        slot:'action'
                    }
                ],
                data:[],
                total:100,
                myoffset:0,
                modal1:false,
                modal2:false,
                modal3:false,
                addForm:{
                    id:'',
                    department:'',
                    operation:'',
                    Eoperation:'',
                },
                editForm:{
                    id:'',
                    department:'',
                    operation:'',
                    Eoperation:'',
                },
                deleteId:-1,
                editIndex:-1,
                deleteIndex:-1,
            }
        },
        mounted(){ },
        methods:{
            selectNav(val){
                switch(val)
                {
                    case 1:
                        this.$router.push('/attendence')
                        break
                    case 2:
                        this.$router.push('/student')
                        break
                    case 3:
                        this.$router.push('/dailyRecord')
                        break
                    case 4:
                        this.$router.push('/totation')
                        break
                    case 5:
                        this.$router.push('/grade')
                        break
                    case 6:
                        this.$router.push('/diseaserecord')
                        break
                    case 7:
                        this.$router.push('/disease')
                        break
                    case 8:
                        this.$router.push('/operation')
                        break
                    case 9:
                        this.$router.push('/doctor')
                        break
                    case 10:
                        this.$router.push('/teacher')
                        break
                    default:
                        this.$Message.error('发生了意料之外的错误')
                        break
                }
            },
            cancel () {
                this.modal1=false
                this.modal2=false
                this.modal3=false
            },
            handleMore(current){
                let url12=setting.url+"getDiffOperation.json"
                this.myoffset=parseInt((current*20)-20)
                this.$http.post(url12,{myoffset:this.myoffset}).then(res=>{
                    if(res.body.code==0){
                        let _obj = JSON.stringify(res.body.data)
                        let objClone = JSON.parse(_obj)
                        this.data=objClone
                    }else{
                        this.$Message.error("没有病种信息")
                    }
                })
                window.scrollTo(0,0)
            },
            myadd(){
                this.modal1=true
            },
            myalter(row,index){
                let _obj = JSON.stringify(row)
                let objClone = JSON.parse(_obj)
                this.editForm=objClone
                this.editIndex=index
                this.modal2=true
            },
            mydelete(row,index){
                this.deleteId=row.id
                this.deleteIndex=index
                this.modal3=true
            },
            addDisease(){
                let url1=setting.url+"addOperation.json"
                this.$http.post(url1,{form:this.addForm}).then((res)=>{
                    if(res.body.code == 0){
                        this.data.unshift(res.body.data)
                        this.$Message.success(res.body.msg)
                    }
                },(res)=>{
                    this.$Message.error('信息添加出错，请重试')
                })
            },
            editDisease(){
                let url2=setting.url+"alterOperation.json"
                this.$http.post(url2,{form:this.editForm}).then((res)=>{
                    if(res.body.code == 0){
                        this.data[this.editIndex].id=this.editForm.id
                        this.data[this.editIndex].department=this.editForm.department
                        this.data[this.editIndex].operation=this.editForm.operation
                        this.data[this.editIndex].Eoperation=this.editForm.Eoperation
                        this.$Message.success(res.body.msg)
                    }
                },(res)=>{
                    this.$Message.error('信息修改出错，请重试')
                })
            },
            deleteDisease(){
                let url3=setting.url+"deleteOperation.json"
                this.$http.post(url3,{deleteId:this.deleteId}).then((res)=>{
                    if(res.body.code == 0){
                        this.data.splice(this.deleteIndex,1)
                        this.$Message.success(res.body.msg)
                    }
                },(res)=>{
                    this.$Message.error('信息删除出错，请重试')
                })
            },
        },
    }
</script>
