<template>
    <div>
        <ul v-if="imgArr.length">
            <li v-for="(item,index) in imgArr"
                :key="index">
                <div class="wrap"
                     @click="viewPic(item)">
                    <img :src="item.thumbImg"
                         alt="">
                </div>
                <p class="txt">{{item.originImg.split('/')[item.originImg.split('/').length-1]}}</p>
            </li>
        </ul>
        <div class="empty"
             v-else>相册暂无图片</div>

        <el-dialog title=""
                   class="pop"
                   height="80%"
                   :visible.sync="dialogVisible">
            <img :src="imgCur"
                 alt="">
        </el-dialog>
    </div>
</template>
<script>
import { getAllImg } from '@/request';
export default {
    data () {
        return {
            dialogVisible: false,
            name: '',
            imgCur: '',
            imgArr: []
        }
    },
    created () {
        this.id = location.href.split('?id=')[1] || '';
        this.getAllFn();
    },
    methods: {
        getAllFn () {
            getAllImg({ id: this.id }).then(res => {
                if (res.status == 200) {
                    this.imgArr = res.data;
                }
            })
        },
        viewPic (img) {
            this.imgCur = img.originImg;
            this.dialogVisible = true
        }
    }
}
</script>
<style lang="less" scoped>
.txt {
    width: 100%;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.pop {
    text-align: center;
    height: 100vh;
    img {
        max-width: 100%;
        max-height: 100%;
    }
}
.dialog-footer {
    text-align: center;
    display: block;
}
ul {
    overflow: hidden;
}
li {
    width: 200px;
    height: 200px;
    margin: 20px;
    float: left;
    text-align: center;
    cursor: pointer;
    .wrap {
        width: 100%;
        height: 180px;

        border: 1px solid #ccc;
        border-radius: 2px;
    }
    img {
        max-width: 90%;
        max-height: 90%;
        align-content: center;
        border-radius: 2px;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
    p {
        text-align: center;
        width: 100%;
        padding: 10px 0;
    }
}
.empty {
    width: 100%;
    text-align: center;
    margin: 200px 0;
}

/deep/ .el-dialog__body{
    padding-top: 0;
}

@media (max-width: 750px) {
    /deep/ .el-dialog {
        width: 100% !important;
    }
    ul {
        margin-top: 50px;
    }
    li {
        width: 46%;
        margin: 20px 2%;
    }
    .pop {
        // width: 100%;
    }
}
</style>