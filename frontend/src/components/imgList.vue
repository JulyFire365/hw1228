<template>
    <div>
        <el-button v-if="permission.includes('del')" class="del-wrap" type="primary" @click="delFn">删除选中相册</el-button>
        <el-checkbox-group 
            v-model="checkedCities">
            <ul>
                <li v-for="(item,index) in staticData" :key="index">
                    <div class="img-wrap"><img :src="item.link" alt="" @click="linkToIMg(item.id)"></div>
                    <div class="fold-name">
                        <div v-if="item.name_ch == '默认相册' || item.name_ch == 'wh' || !permission.includes('del')" style="font-size: 13px; padding-top: 2px;" >{{item.name_ch}}</div>
                        <el-checkbox v-else :label="item.id" :key="item.id">{{item.name_ch}}</el-checkbox>
                    </div>
                </li>
            </ul>
        </el-checkbox-group>
    </div>
</template>
<script>
import {uploadStatic,delFold,getPermission} from '@/request';
export default {
    name: 'imgList',
    data(){
        return {
            checkedCities: [],
            idArr: [],
            staticData: [],
            permission: []
        }
    },
    created(){
        this.init();
        this.getPermission();
    },
    methods: {
        delFn(){
            if(!this.checkedCities.length){
                this.$message.error('未选中任何相册');
                return false;
            }
            for(let i = 0; i < this.staticData.length; i++){
                this.checkedCities.includes(this.staticData[i]['id']) ? this.staticData.splice(i,1) : '';
            }

            delFold({'idArr': this.checkedCities}).then(res=>{
                if(res.status == 200){
                    this.$message.success("删除成功");
                }
            })
        },
        getPermission(){
            getPermission().then(res=>{
                this.permission = res.data.permission;
            })
        },
        init(){
            uploadStatic().then(res=>{
                this.staticData = res.data;
            })
        },
        linkToIMg(id){
            this.$router.push({path:'/home/img',query: {id}})
        }
    }
}
</script>
<style lang="less" scoped>
.del-wrap {
    box-sizing: border-box;
    margin: 20px;
}
ul {
    overflow: hidden;
}
.img-wrap{
    width: 100%;
    height: 160px;
    background: #FAF7F7;
    position: relative;
    text-align: center;
    overflow: hidden;
    img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 100%;
        max-height: 100%;
        cursor: pointer;
    }
}
.fold-name{
    padding-top: 10px;
}
li {
    border: 1px solid #ddd;
    width: 200px;
    height: 200px;
    float: left;
    overflow: hidden;
    margin: 20px;
    text-align: center;
    position: relative;
    box-sizing: border-box;
    border-radius: 2px;
    cursor: pointer;
}

@media (max-width:750px) {
    li{
        margin: 2%;
        width: 46%;
    }
    ul {
        padding-top: 20px;
    }
}
</style>