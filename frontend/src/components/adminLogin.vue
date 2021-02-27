<template>
<div class="wrap">
<div class="login-wrap">
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
	<el-form-item label="" prop="name">
		<el-input v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
	</el-form-item>
	<el-form-item label="" prop="password">
		<el-input type="password" @keyup.enter.native="submitForm('ruleForm')" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
	</el-form-item>
	<el-form-item>
    	<el-button class="btn" style="width: 100%" type="primary" @click="submitForm('ruleForm')">登录</el-button>
  	</el-form-item>
</el-form>
</div>
</div>
</template>

<script>
import {login} from '@/request'
export default {
  name: 'login',
  data(){
	  return {
		ruleForm: {
			name: '',
			password:''
		},
		rules: {
          	name: [
            	{ required: true, message: '请输入用户名称', trigger: 'blur' },
            	{ min: 3, max: 20, message: '长度在 3 到 20个字符', trigger: 'blur' }
          	],
          	password: [
            	{ required: true, message: '请输入密码', trigger: 'blur' }
          	]
		}
	  }
  },
  methods: {
	submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
			  login(this.ruleForm)
			  .then(res=>{
				if(res.status == 200){
					this.$router.push('/home/upload');
				}
			  })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    }
  }
}
</script>

<style lang="less" scoped>
.login-wrap{
	width: 400px;
	padding: 10px 20px;
    box-sizing: border-box;
	box-shadow: 1px 1px 7px #ddd;
	border-radius: 4px;
	background: #fff;
	position: fixed;
	left: 10%;
	top: 50%;
	margin-top: -200px;
}
.btn {
	background: rgb(100,161,215);
	color: #fff;
    text-indent: 0;
    font-size: 16px;
    text-decoration: none;
    text-align: center;
}
.demo-ruleForm{
	width: 300px;
	margin: 14% auto;
}
.wrap {
	height: 100vh;
	background: url("../img/bg_5.jpg");
}
@media (max-width: 750px) {
	.login-wrap{
		left: 50%;
		margin-left: -200px;
	}
}
</style>