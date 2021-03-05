<template>
    <div class="home">
        <div class="nav">
            <p class="user">Hello, {{name}}.</p>
            <el-menu default-active="1"
                     class="el-menu-vertical-demo"
                     background-color="#333"
                     text-color="#fff"
                     active-text-color="#ffd04b">
                <el-menu-item index="1">
                    <span slot="title">
                        <router-link :to="{path:'/home/upload'}"><i class="el-icon-menu"></i>图片上传</router-link>
                    </span>
                </el-menu-item>
                <el-menu-item index="2">
                    <span slot="title">
                        <router-link :to="{path:'/home/imgList'}"><i class="el-icon-document"></i>相册列表</router-link>
                    </span>
                </el-menu-item>
            </el-menu>

            <p @click="logoutFn"
               class="logout">退出登录</p>
        </div>
        <div class="content">
            <div class="wrap">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import { isLogin, logout } from '@/request'
export default {
    name: 'home',
    data () {
        return {
            name: ''
        }
    },
    created () {
        this.loginStatus();
    },
    methods: {
        loginStatus () {
            isLogin().then(res => {
                if (res.status == 200) {
                    this.name = res.data.name
                } else {
                    this.$router.push('/admin');
                }
            })
        },
        logoutFn () {
            logout().then(res => {
                if (res.status == 200) {
                    this.$router.push('/admin');
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.nav {
    width: 8%;
    min-width: 160px;
    height: 100%;
    position: fixed;
    background: #333;
    box-sizing: border-box;
    padding-top: 6%;
    a,
    span {
        display: inline-block;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }
    .el-menu-item {
        padding: 0;
    }
}
.user {
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    color: #fff;
    width: 100%;
    padding-top: 20px;
}
.logout {
    text-align: center;
    margin-top: 100px;
    color: #fff;
    text-decoration: underline;
    cursor: pointer;
}
a {
    color: #fff;
    text-decoration: none;
}
a.router-link-exact-active.router-link-active {
    color: #ffd04b;
}
.content {
    width: 100%;
    box-sizing: border-box;
    padding-left: 10%;
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
/deep/ .el-menu {
    border-right: none;
}
@media (max-width: 750px) {
    .nav {
        width: 100%;
        top: 0;
        height: 60px;
        padding-top: 0;
        z-index: 2;
    }
    .user {
        display: none;
    }
    /deep/ .el-menu {
        width: 80%;
        float: left;
        li {
            width: 40%;
            float: left;
        }
    }
    .logout {
        width: 20%;
        float: right;
        margin-top: 24px;
        font-size: 100%;
        font: inherit;
    }
    .content {
        padding-left: 0;
        padding-top: 0;
        .wrap {
            width: 100%;
            height: 100vh;
            padding: 20px;
        }
    }
}
</style>