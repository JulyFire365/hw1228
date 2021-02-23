<template>
    <div class="home">
        <div class="nav">
            <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#333"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="2">
                <i class="el-icon-document"></i>
                <span slot="title">图片上传</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="el-icon-menu"></i>
                <span slot="title">图片列表</span>
            </el-menu-item>
            </el-menu>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name: 'home',
    data(){
        return {

        }
    },
    created(){
        this.isLogin();
    },
    methods: {
        isLogin(){},
        handleOpen(){},
        handleClose(){}
    }
}
</script>
<style scoped>
.nav{
    width: 10%;
    min-width: 160px;
    height: 100%;
    position: fixed;
    background: #333;
    box-sizing: border-box;
    padding-top: 6%;
}
.content{
    width: 100%;
    box-sizing: border-box;
    padding-left: 14%;
    padding-top: 30px;
    float: left;
    background: #f5f5f5;
    height: 100vh;
}
/deep/ .el-menu{
    border-right: none;
}
</style>