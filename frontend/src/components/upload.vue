<template>
    <div class="upload">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
        <el-form-item label="图片集名称：" prop="folderId">
        <el-select
            v-model="ruleForm.folderId"
            filterable
            allow-create
            default-first-option
            placeholder="请选择或创建文件夹">
            <el-option
            v-for="item in staticData"
            :key="item.id"
            :label="item.name_ch"
            :value="item.id">
            </el-option>
        </el-select>
        </el-form-item>
         <el-form-item label="" prop="" style="margin-top: 50px;">
            <div draggable="true" @click="handleClickUpload('ruleForm')" @dragenter.prevent="handleClickUpload('ruleForm')">
            <el-upload
                class="upload-demo"
                drag
                action="/index.php?controller=folder&method=tempDir"
                accept="image/jpeg,image/jpg,image/gif,image/png,.zip,.rar,.tar,.gz"
                multiple
                :data="ruleForm"
                :disabled="!(ruleForm.folderId != '')"
                :limit="limitNum"
                :on-exceed="handleExceed"
                :before-upload="handleBeforeUpload"
                :on-success="handleOnSuccess"
                :on-progress="handleOnProgress">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                    <p>将文件拖到此处，或<em>点击上传</em></p>
                    <div style="padding:0 10px 20px; line-height: 26px;">支持扩展名：<strong style="font-weight:bold;">.jpg .png .gif .zip .rar .tar .gz </strong> 
                    单个文件不超过100M, 一次至多上传20个源文件, 封面图默认第一个图片文件
                    </div>
                </div>
            </el-upload> 
            </div>
         </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {uploadStatic} from '@/request'
export default {
    name: 'upload',
    data(){
        return {
            staticData: [],
            limitNum: 20,
            ruleForm: {
                folderId: ''
            },
            rules: {
                folderId: [
                    { required: true, message: '请选择或创建文件夹', trigger: 'blur' }
                ]
            }
        }
    },
    created(){
        this.initData();
    },
    methods:{
        handleOnSuccess(res, file, fileList) {
            console.log("success");
            this.detailSuccess(res,file)
        },
        detailSuccess(){},
        handleOnProgress(event, file, fileList) {

        },
        handleClickUpload(formName){
            this.$refs[formName].validate((valid) => {});
        },
        handleBeforeUpload(file){
            const isLt100M = file.size / 1024 / 1024  < 100
            const chineseReg = /[\u4E00-\u9fff]+/g
            const isChineseName = chineseReg.test(file.name)

            // 检查相同文件名
            function checkSameName(arr) {
                let _name = file.name
                let _tag = 0
                if (arr != null) {
                    arr.forEach((item) => {
                        if (item.name == _name) {
                            _tag += 1
                        }
                    })
                }
                return _tag
            }

            if(file.name.toString().match(/[\',:;*?~`!#$%^&+=)(<>{}]|\]|\[|\/|\\\|"|\|/ig)){
                this.$message({
                    message: `${file.name} 包含特殊字符,请重新修改文件名`,
                    type: 'error'
                })
                return false;
            }

            if (isChineseName) {
                this.$message({
                    message: `${file.name} 包含中文`,
                    type: 'error'
                })
                return false;
            }

            if (!isLt100M) {
                this.$message({
                    message: `${file.name} 文件超过 50M, 上传失败!`,
                    type: 'error'
                })
                return false;
            }

            if (checkSameName(this.imgFileCache) > 1) {
                this.$message({
                    message: `${file.name} 文件名已存在, 请重新修改文件名！`,
                    type: 'error'
                })
                return false;
            }
        },
        handleExceed(files, fileList){
            this.$message({
                message: '当前上传数量限制为' + this.limitNum,
                type: 'error'
            })
        },
        initData(){
            uploadStatic()
            .then(res=>{
                this.staticData = res.data;
            })
        }
    }
}
</script>
<style lang="less" scoped>
.upload{
    width: 600px;
    margin: 60px 0 0 200px
}
/deep/ .el-upload-dragger{
    height: auto;
}
</style>