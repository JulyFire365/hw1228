<template>
    <div>
        <ul>
            <li v-for="(item,index) in imgList" :key="index" @click="linkToIMg(item.id)">
                <img :src="item.link" alt="">
                <p>{{item.name}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
import {getAllFile,uploadStatic} from '@/request';
export default {
    name: 'imgList',
    data(){
        return {
            imgList: [],
            staticData: []
        }
    },
    created(){
        this.init()
    },
    methods: {
        init(){
            getAllFile().then(res=>{
                console.log(res.data);
                this.imgList = res.data
            })
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
ul {
    overflow: hidden;
}
li {
    float: left;
    border: 1px solid #ddd;
    width: 200px;
    height: 200px;
    padding: 10px 0;
    overflow: hidden;
    margin: 20px;
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content:center;
    box-sizing: border-box;
    border-radius: 2px;
    cursor: pointer;
    img {
        max-width: 90%;
        max-height: 90%;
        align-content: center;
        border-radius: 2px;
    }
    p{
        position: absolute;
        top: 40%;
        left: 0;
        z-index: 1;
        width: 100%;
        text-align: center;
        padding: 2px 0;
        background: rgba(0,0,0,0.9);
        color: #f5f5f5;
        opacity: .5;
    }
}

@media (max-width:750px) {
    li{
        margin: 2%;
        width: 46%;
    }
    ul {
        position: relative;
        top: 40px;
    }
}
</style>