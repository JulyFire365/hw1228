<template>
    <div>
        <ul>
            <li v-for="(item,index) in imgList" :key="index">
                <img :src="item.link" alt="">
                <p>{{item.name}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
import {getAllFile} from '@/request';
export default {
    name: 'imgList',
    data(){
        return {
            imgList: []
        }
    },
    created(){
        this.init()
    },
    methods: {
        init(){
            getAllFile().then(res=>{
                this.imgList = res.data
            })
        }
    }
}
</script>
<style lang="less" scoped>
ul {
    overflow: hidden;
}
li {
    border: 1px solid #ddd;
    float: left;
    width: 200px;
    height: 200px;
    box-sizing: border-box;
    padding: 20px 0;
    overflow: hidden;
    margin: 20px;
    text-align: center;
    position: relative;
    cursor: pointer;
    img {width: 80%;}
    p{
        position: absolute;
        top: 40%;
        left: 0;
        z-index: 1;
        width: 100%;
        text-align: center;
        padding: 2px 0;
        background: rgba(0,0,0,0.5);
        color: #f5f5f5;
        opacity: .5;
    }
}
</style>