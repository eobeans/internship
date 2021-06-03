<template>
    <div>
        <div class="layout">
            <Layout>
                <Content :style="{padding: '0 50px'}">
                    <Card shadow >
                        <Row style="min-height:480px;">
                            <Col span="8" offset="8">
                                <div style="min-height: 200px;">
                                    <div style="background:#fff;padding: 20px;">
                                        <Card>
                                            <p slot="title">注册信息</p>
                                            <Row style="margin-bottom:18px;">
                                                <Col span="6">教师编号：</Col>
                                                <Col span="12">
                                                    <Input v-model="registerForm.number" placeholder="请输入您的编号" style="width: 200px" />
                                                </Col>
                                            </Row>
                                            <Row style="margin-bottom:18px;">
                                                <Col span="6">教师姓名：</Col>
                                                <Col span="12">
                                                    <Input v-model="registerForm.name" placeholder="请输入真实姓名" style="width: 200px" />
                                                </Col>
                                            </Row>
                                            <Row style="margin-bottom:18px;">
                                                <Col span="6">手机号码：</Col>
                                                <Col span="12">
                                                    <Input v-model="registerForm.phoneNumber" placeholder="请输入手机号码" style="width: 200px" />
                                                </Col>
                                            </Row>

                                            <Row style="margin-bottom:24px;">
                                                <Col span="6">密码：</Col>
                                                <Col span="12">
                                                    <Input v-model="registerForm.passWord" type="password" placeholder="请输入密码" style="width: 200px" />
                                                </Col>
                                            </Row>
                                            <Row style="margin-bottom:24px;">
                                                <Col span="6">确认密码：</Col>
                                                <Col span="12">
                                                    <Input v-model="registerForm.comfirepassWord" type="password" placeholder="请确认密码" style="width: 200px" />
                                                </Col>
                                            </Row>
                                            <Row style="margin-bottom:18px;">
                                                <Col span="8" offset="7" style="text-align:center" @click.native="register">
                                                    <Button>注册</Button>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Content>
                <!-- <Footer class="layout-footer-center">2018--2018 &copy; 数据库综合实验&nbsp;&nbsp;&nbsp;&nbsp;马勇杰&nbsp;&nbsp;李泽臣&nbsp;&nbsp;徐卓</Footer> -->
            </Layout>
        </div>
    </div>
</template>

<style scoped>
.inputText{
    width: 200px;
    margin: 5px;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 200px;
    height: 30px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    display:flex;
    align-items:center; 
    justify-content:center;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
</style>


<script>
export default {

    name:'home',
    data(){
        return{
            registerForm:{
                name:'',
                number:'',
                phoneNumber:'',
                passWord: '',
                comfirepassWord:'',
            },
        }
    },
    mounted:
        function(){
            let _this = this
            this.$http.get('http://localhost:3000/getList.json').then((res)=>{
                if(res.body.code == 0){
                    _this.list = res.body.list
                }
            },(res)=>{
                console.log('fail to get message!')
            })
        },
    methods:{
        register(){
            let _this=this
            if (_this.registerForm.name == ''||_this.registerForm.number == ''||_this.registerForm.phoneNumber == ''||_this.registerForm.comfirepassWord == ''||_this.registerForm.passWord == ''){
                _this.$Message.error('请完整输入表单信息')
            }else if (_this.registerForm.phoneNumber.length != 11 || !/^[0-9]+$/.test(_this.registerForm.phoneNumber)){
                _this.$Message.error('请输入符合规定的手机号')
            }else if (_this.registerForm.passWord!=_this.registerForm.comfirepassWord){
                _this.$Message.error('请重新确认密码')
            }else{
                _this.$http.post('http://localhost:3000/postRegisterForm.json',{registerForm:_this.registerForm}).then((res)=>{
                    if(res.body.code == 0){
                        _this.$Message.success('注册成功，正在自动登入')
                        this.$router.push('/home')
                    }
                },(res)=>{
                    console.log('fail to register!')
                })
            }
        }
    }

    
}
</script>

