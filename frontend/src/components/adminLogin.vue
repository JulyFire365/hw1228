<template>
<div>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
	<el-form-item label="用户名" prop="name">
		<el-input v-model="ruleForm.name"></el-input>
	</el-form-item>
	<el-form-item label="密码" prop="password">
		<el-input type="password" v-model="ruleForm.password"></el-input>
	</el-form-item>
	<el-form-item>
    	<el-button style="width: 100%" type="primary" @click="submitForm('ruleForm')">登录</el-button>
  	</el-form-item>
</el-form>
</div>
</template>

<script>
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
			  this.axios.post('/index.php?controller=admin&method=login',this.ruleForm)
			  .then(res=>{
				  console.log(res);
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

<style scoped>
.demo-ruleForm{
	width: 400px;
	margin: 14% auto;
}
</style>