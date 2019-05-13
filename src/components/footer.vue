<template>
    <div>
        <div class="layout">
            <Layout>
                <Footer class="layout-footer-center" style="max-height:24px;"><p style="line-height:8px;">copyright@南方医科大学</p></Footer>
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
.layout-footer-center{
    text-align: center;
}
</style>


<script>
export default {

    name:'footer',
    data(){
        return{

        }
    },
    methods:{},   
}
</script>

