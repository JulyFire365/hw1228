<template>
    <div>
        <ul v-if="imgArr.length">
            <li v-for="(item,index) in imgArr"
                :key="index">
                <div class="wrap"
                     @click="viewPic(item)">
                    <img :src="item"
                         alt="">
                </div>
                <p class="txt">{{item.split('/')[item.split('/').length-1]}}</p>
            </li>
        </ul>
        <div class="empty"
             v-else>相册暂无图片</div>

        <el-dialog title="大图"
                   class="pop"
                   width="40%"
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
        this.getList();
    },
    methods: {
        getList () {
            getAllImg({ id: this.id }).then(res => {
                if (res.status == 200) {
                    this.imgArr = res.data;
                }
            })
        },
        viewPic (img) {
            this.imgCur = img;
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

    img {
        max-width: 90%;
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
        width: 100%;
    }
}
</style>