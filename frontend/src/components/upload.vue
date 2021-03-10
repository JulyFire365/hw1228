<template>
    <div class="upload">
        <div class="part-left">
            <el-form :model="ruleForm"
                     :rules="rules"
                     label-width="0px"
                     ref="ruleForm"
                     class="demo-ruleForm">
                <el-form-item label=""
                              prop="folderId">
                    <el-select v-model="ruleForm.folderId"
                               @change="changeDir"
                               @hook:mounted="cancalReadOnly"
                               @visible-change="cancalReadOnly"
                               ref="selectWrap"
                               filterable
                               allow-create
                               default-first-option
                               placeholder="请选择或创建相册">
                        <el-option v-for="item in staticData"
                                   :key="item.id"
                                   :label="item.name_ch"
                                   :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label=""
                              prop=""
                              style="margin-top: 50px;">
                    <div draggable="true"
                         @click="handleClickUpload('ruleForm')"
                         @dragenter.prevent="handleClickUpload('ruleForm')">
                        <el-upload class="upload-demo"
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
                                   :on-change="changeFn"
                                   :on-progress="handleOnProgress">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">
                                <p>将文件拖到此处，或<em>点击上传</em></p>
                                <div style="padding:0 10px 20px; line-height: 26px;">支持扩展名：<strong style="font-weight:bold;">.jpg .png .gif .zip .rar .tar .gz </strong>
                                    单个文件不超过200M, 一次至多上传200个源文件, 封面图默认第一个图片文件
                                </div>
                            </div>
                        </el-upload>
                        <p style="color:red;">* 文件名称请勿包含特殊字符或中文,压缩包仅解压一级目录</p>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <ul class="part-right"
            v-if="errArr.length">
            <li>错误提示：</li>
            <li v-for="(item,index) in errArr"
                :key="index">
                <!-- <span>{{item.name}}</span>  -->
                {{item.msg}}
            </li>
        </ul>
    </div>
</template>
<script>  
import { uploadStatic, foldRecordInDb } from '@/request'
export default {
    name: 'upload',
    data () {
        return {
            insetDirFlag: true,
            width: document.body.clientWidth,
            staticData: [],
            limitNum: 200,
            errArr: [],
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
    created () {
        this.initData();
    },
    methods: {
        cancalReadOnly(onOff) {
            this.$nextTick(() => {
                if (!onOff) {
                    const select = this.$refs;
                    const input = select.selectWrap.$el.querySelector('.el-input__inner');
                    input.removeAttribute('readonly');
                }
            });
        },
        changeDir(){
            this.insetDirFlag = true;
        },
        changeFn (file, fileList) {
            // console.log(file);
            // console.log(fileList);
            if (file.response) {
                if (file.response.status == 201) {

                    let _file = {
                        name: file.name,
                        msg: file.response.msg
                    }
                    this.errArr.unshift(_file);
                    console.log(this.errArr)
                }
                if (file.response.status == 200) {
                    let _flag = true;
                    // this.ruleForm.folderId
                    this.staticData.forEach(item => {
                        if (item.name_ch == this.ruleForm.folderId || item.id == this.ruleForm.folderId) {
                            _flag = false;
                        }
                    })
                    this.insetDirFlag && _flag && foldRecordInDb({ id: this.ruleForm.folderId });
                    this.insetDirFlag = false;
                }
            }

        },
        handleOnSuccess (res, file, fileList) {
            // console.log("success");
            // this.detailSuccess(res,file);
        },
        // detailSuccess(){},
        handleOnProgress (event, file, fileList) {
            // console.log(file.response);
            // if(file.response && file.response.status == 201){
            //     this.errArr.unshift(file.response.msg);
            //     console.log(this.errArr)
            // }
        },
        handleClickUpload (formName) {
            this.$refs[formName].validate((valid) => { });
        },
        handleBeforeUpload (file) {
            const isLt200M = file.size / 1024 / 1024 < 201
            const chineseReg = /[\u4E00-\u9fff]+/g
            const isChineseName = chineseReg.test(file.name)

            // 检查相同文件名
            function checkSameName (arr) {
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

            if (file.name.toString().match(/[\',:;*?~`!#$%^&+=)(<>{}]|\]|\[|\/|\\\|"|\|/ig)) {
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

            if (!isLt200M) {
                this.$message({
                    message: `${file.name} 文件超过 200M, 上传失败!`,
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
        handleExceed (files, fileList) {
            this.$message({
                message: '当前上传数量限制为' + this.limitNum,
                type: 'error'
            })
        },
        initData () {
            uploadStatic()
                .then(res => {
                    this.staticData = res.data;
                })
        }
    }
}
</script>
<style lang="less" scoped>
@warnColor: red;
.upload {
    clear: both;
    overflow: hidden;
}
.part-left {
    width: 570px;
    margin: 60px 0 0 150px;
    float: left;
}
.part-right {
    width: 300px;
    margin-left: 100px;
    margin-top: 140px;
    float: left;
    span {
        display: inline-block;
        margin-right: 20px;
    }
    li {
        color: @warnColor;
        padding: 4px 0;
        margin: 10px 0;
        border-bottom: 1px solid @warnColor;
    }
}
/deep/ .el-upload-dragger {
    height: auto;
}
@media (max-width: 750px) {
    .part-left {
        width: 100%;
        margin: 40px auto 0;
        float: none;
    }
    /deep/ .el-form-item__label {
        display: none;
        width: 0px !important;
    }
    /depp/ .el-form-item__content {
        margin-left: 0px !important;
    }
}
</style>