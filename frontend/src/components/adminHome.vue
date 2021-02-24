<template>
    <div class="home">
    <div class="nav">
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#333"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1">
                <span slot="title"><router-link :to="{path:'/home/upload'}"><i class="el-icon-menu"></i>图片上传</router-link></span>
            </el-menu-item>
            <el-menu-item index="2">
                <span slot="title"> <router-link :to="{path:'/home'}"><i class="el-icon-document"></i>图片列表</router-link></span>
            </el-menu-item>
        </el-menu>
    </div>
    <div class="content">
        <div class="wrap">
            <router-view></router-view>
        </div>
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
        isLogin(){}
    }
}
</script>
<style lang="less" scoped>
.nav{
    width: 10%;
    min-width: 160px;
    height: 100%;
    position: fixed;
    background: #333;
    box-sizing: border-box;
    padding-top: 6%;
    a,span {
        display: inline-block;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }
    .el-menu-item{
        padding: 0;
    }
}
a{color:#fff;text-decoration: none;}
a.router-link-exact-active.router-link-active{color: #ffd04b;}
.content{
    width: 100%;
    box-sizing: border-box;
    padding-left: 12%;
    padding-top: 30px;
    background: #f5f5f5;
    height: 100vh;
    .wrap {
        width: 98%;
        box-sizing: border-box;
        padding: 40px 40px 100px;
        background: #fff;
        min-height: 60vh;
    }
}
/deep/ .el-menu{
    border-right: none;
}
</style>