<template>
    <div>
        <div class="layout">
            <Layout>
                <Header>
                    <Menu mode="horizontal" theme="dark" active-name="1">
                        <div class="layout-logo">
                            <img style="width:100%;height:auto;maring:0;" src="http://zhjw.smu.edu.cn//styles/images/customize/logo_school1.png" alt="">
                        </div>
                        <div class="layout-nav">
                            <Menu-Item name="1">
                                <Icon type="ios-navigate"></Icon>
                                留学生实习管理支持系统
                            </Menu-Item>
                        </div>
                    </Menu>
                 </Header>
            </Layout>
        </div>
    </div>
</template>

<style scoped>
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
</style>

<script>
export default {
    name:'home',
    data(){
        return{}
    }
}
</script>
