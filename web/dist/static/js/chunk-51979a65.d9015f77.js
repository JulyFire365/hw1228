(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51979a65"],{"065a":function(e,t,r){"use strict";r("9428")},"4e4d":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-page-header",{attrs:{content:e.name},on:{back:e.goBack}}),r("div",{staticClass:"image-box"},e._l(e.list,(function(t,n){return r("div",{key:n,staticClass:"block"},[r("el-image",{staticClass:"img",attrs:{src:t,"preview-src-list":e.list,fit:"cover",lazy:""}})],1)})),0)],1)},s=[],o=(r("b0c0"),r("4ec3")),a={name:"Photo",data:function(){return{id:null,name:"",list:[]}},mounted:function(){var e=this;this.id=this.$route.params.id,this.name=this.$route.query.album,this.id?Object(o["b"])(this.id).then((function(t){var r=t.data;e.list=r})):this.$message.error("相册异常，无法展示！")},methods:{click:function(e){console.log(e)},goBack:function(){this.$router.back()}}},i=a,c=(r("065a"),r("2877")),u=Object(c["a"])(i,n,s,!1,null,"75aad598",null);t["default"]=u.exports},"4ec3":function(e,t,r){"use strict";r.d(t,"b",(function(){return u})),r.d(t,"a",(function(){return l}));r("d3b7"),r("25f0");var n=r("bc3a"),s=r.n(n),o=r("5c96"),a=r("4360"),i=s.a.create({timeout:Settings.timeout});i.interceptors.request.use((function(e){return a["a"].getters.token,e}),(function(e){return console.log(e),Promise.reject(e)})),i.interceptors.response.use((function(e){var t=e.status;if(t<200||t>300)return o["Message"].error({message:e.message}),Promise.reject(e);var r=e.data;return r.hasOwnProperty("status")&&200!==r.status?(Object(o["Message"])({message:r.errmsg||"Error",type:"error",duration:5e3}),Promise.reject(r)):r}),(function(e){console.log("err",e);var t=e.response.status,r=0,n="";try{r=e.response.data.status,n=e.response.data.errmsg||e.message}catch(s){if(-1!==e.toString().indexOf("Error: timeout"))return o["Message"].error({title:"网络请求超时",duration:5e3}),Promise.reject(e)}return 403===t?o["MessageBox"].confirm("您的账号登录状态已过期，您可以停留在当前页上，或者重新登录","确认退出",{confirmButtonText:"重新登录",cancelButtonText:"取消",type:"warning"}).then((function(){a["a"].dispatch("user/resetToken").then((function(){location.reload()}))})):r?o["Message"].error({message:n,duration:5e3}):o["Message"].error({title:"接口请求失败",duration:5e3}),Promise.reject(e)}));var c=i;function u(e){return c({url:"/index.php?controller=folder&method=getAllImg",method:"get",params:{id:e}})}function l(){return c({url:"/index.php?controller=folder&method=getAllFile",method:"get"})}},9428:function(e,t,r){}}]);