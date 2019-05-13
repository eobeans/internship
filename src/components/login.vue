<template>
    <div>
        <div class="layout">
            <Layout>
                <Content :style="{padding: '0 50px'}">
                    <Card>
                        <div style="min-height: 496px;">
                            <form style="margin-top:160px;" @keyup.enter="handleLogin">
                                <input type="text" name="username" class="inputText" v-model="loginForm.username" placeholder="用户" autocomplete="on">
                                <input type="password" name="password" class="inputText" v-model="loginForm.password" placeholder="密码" autocomplete="on">
                                <span @click="handleLogin"  style="margin-left:12px;">Login</span>
                            </form>
                            <Modal
                                v-model="modal"
                                title="注册信息"
                                ok-text="注册"
                                cancel-text="取消"
                                @on-ok="ok"
                                @on-cancel="cancel">
                                <Row style="margin-bottom:18px;margin-top:18px;">
                                    <Col span="6" offset="2">教师编号：</Col>
                                    <Col span="12">
                                        <Input v-model="registerForm.number" placeholder="请输入您的编号" style="width: 200px" />
                                    </Col>
                                </Row>
                                <Row style="margin-bottom:18px;">
                                    <Col span="6" offset="2">教师姓名：</Col>
                                    <Col span="12">
                                        <Input v-model="registerForm.name" placeholder="请输入真实姓名" style="width: 200px" />
                                    </Col>
                                </Row>
                                <Row style="margin-bottom:18px;">
                                    <Col span="6" offset="2">手机号码：</Col>
                                    <Col span="12">
                                        <Input v-model="registerForm.phoneNumber" placeholder="请输入手机号码" style="width: 200px" />
                                    </Col>
                                </Row>

                                <Row style="margin-bottom:24px;">
                                    <Col span="6" offset="2">密码：</Col>
                                    <Col span="12">
                                        <Input v-model="registerForm.passWord" type="password" placeholder="请输入密码" style="width: 200px" />
                                    </Col>
                                </Row>
                                <Row style="margin-bottom:24px;">
                                    <Col span="6" offset="2">确认密码：</Col>
                                    <Col span="12">
                                        <Input v-model="registerForm.comfirepassWord" type="password" placeholder="请确认密码" style="width: 200px" />
                                    </Col>
                                </Row>
                            </Modal>
                        </div>
                    </Card>
                </Content>
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
import setting from '../setting'
export default {
    data(){
        return{
            list:[
                {name: 'oringe'}
            ],
            loginForm: {
                username: '',
                password: '',
            },
            modal:false,
            registerForm:{
                name:'',
                number:'',
                phoneNumber:'',
                passWord: '',
                comfirepassWord:'',
            },
        }
    },
    methods:{
        handleLogin() {
            let _this = this
            let url1=setting.url+"postUser.json"
            this.$http.post(url1,{loginForm:_this.loginForm}).then((res)=>{
                if(res.body.code == 0){
                    // alert(res.body.teaNum) 123
                    // this.$store.state.User.teaNum
                    this.$store.commit('setUser',res.body.teaNum)
                    this.$router.push('/attendence')
                }else{
                    _this.$Message.error('账号或密码错误！')
                }
            },(res)=>{
                _this.$Message.error('出错误了！')
            })
        },
        register(){
            this.modal=true
        },
        ok () {
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
                        this.$router.push('/attendence')
                    }
                },(res)=>{
                    _this.$Message.error('注册失败，请重试')
                })
            }
        },
        cancel () {
            this.modal=false
        },
    }

    
}
</script>

