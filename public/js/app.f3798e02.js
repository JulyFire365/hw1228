(function(e){function t(t){for(var a,s,i=t[0],l=t[1],u=t[2],d=0,f=[];d<i.length;d++)s=i[d],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&f.push(n[s][0]),n[s]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);c&&c(t);while(f.length)f.shift()();return o.push.apply(o,u||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],a=!0,i=1;i<r.length;i++){var l=r[i];0!==n[l]&&(a=!1)}a&&(o.splice(t--,1),e=s(s.s=r[0]))}return e}var a={},n={app:0},o=[];function s(t){if(a[t])return a[t].exports;var r=a[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=a,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(r,a,function(t){return e[t]}.bind(null,a));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var c=l;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"02a9":function(e,t,r){"use strict";r("bc7f")},"0fe0":function(e,t,r){},"2ade":function(e,t,r){"use strict";r.d(t,"a",(function(){return d})),r.d(t,"b",(function(){return f}));r("d3b7"),r("ac1f"),r("5319");var a=r("bc3a"),n=r.n(a),o=r("5c96");n.a.defaults.withcredentials=!0,n.a.defaults.headers.common["Content-Type"]="application/json;charset=UTF-8",n.a.defaults.baseURL="";var s,i=0,l=[];function u(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(r,a){n.a.get(e,{params:t}).then((function(e){r(e)})).catch((function(e){a(e)}))}))}function c(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((function(r,a){n.a.post(e,t).then((function(e){r(e)})).catch((function(e){a(e)}))}))}n.a.interceptors.request.use((function(e){return i++,s=o["Loading"].service({target:"loading-area",text:"正在加载中..."}),l.push(s),e}),(function(e){i--,i||l.forEach((function(e){return e.close()})),console.log(e),Promise.reject(e)})),n.a.interceptors.response.use((function(e){if(i--,i||l.forEach((function(e){return e.close()})),e.status&&200==e.status){if(200==e.data.status)return e.data;if(201===e.data.status)setTimeout((function(){sessionStorage.removeItem("expires_status")}),5e3),sessionStorage.getItem("expires_status")||(sessionStorage.setItem("expires_status",1),o["Message"].error({message:e.data.msg}));else{if(202!==e.data.status)return e.data.data&&e.data.data.captcha_img?e.data:Promise.reject(e.data);sessionStorage.getItem("expires_status1")||(sessionStorage.setItem("expires_status1",1),o["Message"].error({message:e.data.msg}))}}}),(function(e){return i--,i||l.forEach((function(e){return e.close()})),o["Message"].error({message:e.data.msg}),Promise.reject(e.data)}));var d=function(e){return c("/index.php?controller=admin&method=login",e)},f=function(){return u("/index.php?controller=folder&method=getList")}},"3ae9":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home"},[r("div",{staticClass:"nav"},[r("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":"1","background-color":"#333","text-color":"#fff","active-text-color":"#ffd04b"}},[r("el-menu-item",{attrs:{index:"1"}},[r("span",{attrs:{slot:"title"},slot:"title"},[r("router-link",{attrs:{to:{path:"/home/upload"}}},[r("i",{staticClass:"el-icon-menu"}),e._v("图片上传")])],1)]),r("el-menu-item",{attrs:{index:"2"}},[r("span",{attrs:{slot:"title"},slot:"title"},[r("router-link",{attrs:{to:{path:"/home"}}},[r("i",{staticClass:"el-icon-document"}),e._v("图片列表")])],1)])],1)],1),r("div",{staticClass:"content"},[r("div",{staticClass:"wrap"},[r("router-view")],1)])])},n=[],o={name:"home",data:function(){return{}},created:function(){this.isLogin()},methods:{isLogin:function(){}}},s=o,i=(r("8291"),r("2877")),l=Object(i["a"])(s,a,n,!1,null,"3db030b9",null);t["default"]=l.exports},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var a=r("2b0e"),n=r("bc3a"),o=r.n(n),s=r("2106"),i=r.n(s),l=r("5c96"),u=r.n(l),c=(r("0fae"),r("8c4f"));a["default"].use(c["a"]);var d=new c["a"]({mode:"history",routes:[{path:"/admin",name:"login",components:r("fb12")},{path:"/home",name:"home",components:r("3ae9"),children:[{path:"upload",name:"upload",components:r("9dac")}]}]}),f=d,m=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("router-view")],1)},p=[],g=r("2877"),h={},v=Object(g["a"])(h,m,p,!1,null,null,null),b=v.exports,x=(r("fa6d"),r("1f94")),y=r.n(x);a["default"].use(y.a),a["default"].use(i.a,o.a),a["default"].use(u.a),a["default"].config.productionTip=!1,new a["default"]({el:"#app",router:f,render:function(e){return e(b)}})},8291:function(e,t,r){"use strict";r("0fe0")},"83da":function(e,t,r){},"9a02":function(e,t,r){"use strict";r("83da")},"9dac":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"upload"},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"200px"}},[r("el-form-item",{attrs:{label:"图片集名称：",prop:"folderId"}},[r("el-select",{attrs:{filterable:"","allow-create":"","default-first-option":"",placeholder:"请选择或创建文件夹"},model:{value:e.ruleForm.folderId,callback:function(t){e.$set(e.ruleForm,"folderId",t)},expression:"ruleForm.folderId"}},e._l(e.staticData,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name_ch,value:e.id}})})),1)],1),r("el-form-item",{staticStyle:{"margin-top":"50px"},attrs:{label:"",prop:""}},[r("div",{attrs:{draggable:"true"},on:{click:function(t){return e.handleClickUpload("ruleForm")},dragenter:function(t){return t.preventDefault(),e.handleClickUpload("ruleForm")}}},[r("el-upload",{staticClass:"upload-demo",attrs:{drag:"",action:"/index.php?controller=folder&method=tempDir",accept:"image/jpeg,image/jpg,image/gif,image/png,.zip,.rar,.tar,.gz",multiple:"",data:e.ruleForm,disabled:!(""!=e.ruleForm.folderId),limit:e.limitNum,"on-exceed":e.handleExceed,"before-upload":e.handleBeforeUpload,"on-success":e.handleOnSuccess,"on-progress":e.handleOnProgress}},[r("i",{staticClass:"el-icon-upload"}),r("div",{staticClass:"el-upload__text"},[r("p",[e._v("将文件拖到此处，或"),r("em",[e._v("点击上传")])]),r("div",{staticStyle:{padding:"0 10px 20px","line-height":"26px"}},[e._v("支持扩展名："),r("strong",{staticStyle:{"font-weight":"bold"}},[e._v(".jpg .png .gif .zip .rar .tar .gz ")]),e._v(" 单个文件不超过100M, 一次至多上传20个源文件, 封面图默认第一个图片文件 ")])])])],1)])],1)],1)},n=[],o=(r("b0c0"),r("d3b7"),r("ac1f"),r("25f0"),r("466d"),r("159b"),r("2ade")),s={name:"upload",data:function(){return{staticData:[],limitNum:20,ruleForm:{folderId:""},rules:{folderId:[{required:!0,message:"请选择或创建文件夹",trigger:"blur"}]}}},created:function(){this.initData()},methods:{handleOnSuccess:function(e,t,r){console.log("success"),this.detailSuccess(e,t)},detailSuccess:function(){},handleOnProgress:function(e,t,r){},handleClickUpload:function(e){this.$refs[e].validate((function(e){}))},handleBeforeUpload:function(e){var t=e.size/1024/1024<100,r=/[\u4E00-\u9fff]+/g,a=r.test(e.name);function n(t){var r=e.name,a=0;return null!=t&&t.forEach((function(e){e.name==r&&(a+=1)})),a}return e.name.toString().match(/[\',:;*?~`!#$%^&+=)(<>{}]|\]|\[|\/|\\\|"|\|/gi)?(this.$message({message:"".concat(e.name," 包含特殊字符,请重新修改文件名"),type:"error"}),!1):a?(this.$message({message:"".concat(e.name," 包含中文"),type:"error"}),!1):t?n(this.imgFileCache)>1?(this.$message({message:"".concat(e.name," 文件名已存在, 请重新修改文件名！"),type:"error"}),!1):void 0:(this.$message({message:"".concat(e.name," 文件超过 50M, 上传失败!"),type:"error"}),!1)},handleExceed:function(e,t){this.$message({message:"当前上传数量限制为"+this.limitNum,type:"error"})},initData:function(){var e=this;Object(o["b"])().then((function(t){e.staticData=t.data}))}}},i=s,l=(r("02a9"),r("2877")),u=Object(l["a"])(i,a,n,!1,null,"74ec603d",null);t["default"]=u.exports},bc7f:function(e,t,r){},fb12:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"用户名",prop:"name"}},[r("el-input",{model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),r("el-form-item",{attrs:{label:"密码",prop:"password"}},[r("el-input",{attrs:{type:"password"},model:{value:e.ruleForm.password,callback:function(t){e.$set(e.ruleForm,"password",t)},expression:"ruleForm.password"}})],1),r("el-form-item",[r("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("登录")])],1)],1)],1)},n=[],o=r("2ade"),s={name:"login",data:function(){return{ruleForm:{name:"",password:""},rules:{name:[{required:!0,message:"请输入用户名称",trigger:"blur"},{min:3,max:20,message:"长度在 3 到 20个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]}}},methods:{submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;Object(o["a"])(t.ruleForm).then((function(e){200==e.status&&t.$router.push("/home/upload")}))}))}}},i=s,l=(r("9a02"),r("2877")),u=Object(l["a"])(i,a,n,!1,null,"654fe4ed",null);t["default"]=u.exports}});
//# sourceMappingURL=app.f3798e02.js.map