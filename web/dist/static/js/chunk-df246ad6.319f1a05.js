(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-df246ad6"],{"1e3d":function(e,t,r){"use strict";r("f2f1")},"4e4d":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-page-header",{attrs:{content:e.name+" ("+e.list.length+"张图片)"},on:{back:e.goBack}}),r("div",{staticClass:"image-box"},e._l(e.list,(function(t,n){return r("div",{key:n,staticClass:"block"},[r("el-image",{staticClass:"img",attrs:{src:t.thumbImg,"preview-src-list":e.getPreview(n),fit:"cover",lazy:""}})],1)})),0)],1)},o=[],s=(r("b0c0"),r("d81d"),r("a434"),r("99af"),r("4ec3")),i={name:"Photo",data:function(){return{id:null,name:"",list:[]}},mounted:function(){var e=this;this.id=this.$route.params.id,this.name=this.$route.query.album,this.id?Object(s["b"])(this.id).then((function(t){var r=t.data;e.list=r})):this.$message.error("相册异常，无法展示！")},methods:{click:function(e){console.log(e)},goBack:function(){this.$router.back()},getPreview:function(e){var t=this.list.map((function(e){return e.originImg})),r=t.splice(e);return r.concat(t)}}},a=i,c=(r("1e3d"),r("2877")),u=Object(c["a"])(a,n,o,!1,null,"9bc33400",null);t["default"]=u.exports},"4ec3":function(e,t,r){"use strict";r.d(t,"b",(function(){return u})),r.d(t,"a",(function(){return l}));r("d3b7"),r("25f0");var n=r("bc3a"),o=r.n(n),s=r("5c96"),i=r("4360"),a=o.a.create({timeout:Settings.timeout});a.interceptors.request.use((function(e){return i["a"].getters.token,e}),(function(e){return console.log(e),Promise.reject(e)})),a.interceptors.response.use((function(e){var t=e.status;if(t<200||t>300)return s["Message"].error({message:e.message}),Promise.reject(e);var r=e.data;return r.hasOwnProperty("status")&&200!==r.status?(Object(s["Message"])({message:r.errmsg||"Error",type:"error",duration:5e3}),Promise.reject(r)):r}),(function(e){console.log("err",e);var t=e.response.status,r=0,n="";try{r=e.response.data.status,n=e.response.data.errmsg||e.message}catch(o){if(-1!==e.toString().indexOf("Error: timeout"))return s["Message"].error({title:"网络请求超时",duration:5e3}),Promise.reject(e)}return 403===t?s["MessageBox"].confirm("您的账号登录状态已过期，您可以停留在当前页上，或者重新登录","确认退出",{confirmButtonText:"重新登录",cancelButtonText:"取消",type:"warning"}).then((function(){i["a"].dispatch("user/resetToken").then((function(){location.reload()}))})):r?s["Message"].error({message:n,duration:5e3}):s["Message"].error({title:"接口请求失败",duration:5e3}),Promise.reject(e)}));var c=a;function u(e){return c({url:"/index.php?controller=folder&method=getAllImg",method:"get",params:{id:e}})}function l(){return c({url:"/index.php?controller=folder&method=getList",method:"get"})}},a434:function(e,t,r){"use strict";var n=r("23e7"),o=r("23cb"),s=r("a691"),i=r("50c4"),a=r("7b0b"),c=r("65f0"),u=r("8418"),l=r("1dde"),d=l("splice"),f=Math.max,m=Math.min,g=9007199254740991,h="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!d},{splice:function(e,t){var r,n,l,d,p,b,v=a(this),w=i(v.length),k=o(e,w),x=arguments.length;if(0===x?r=n=0:1===x?(r=0,n=w-k):(r=x-2,n=m(f(s(t),0),w-k)),w+r-n>g)throw TypeError(h);for(l=c(v,n),d=0;d<n;d++)p=k+d,p in v&&u(l,d,v[p]);if(l.length=n,r<n){for(d=k;d<w-n;d++)p=d+n,b=d+r,p in v?v[b]=v[p]:delete v[b];for(d=w;d>w-n+r;d--)delete v[d-1]}else if(r>n)for(d=w-n;d>k;d--)p=d+n-1,b=d+r-1,p in v?v[b]=v[p]:delete v[b];for(d=0;d<r;d++)v[d+k]=arguments[d+2];return v.length=w-n+r,l}})},d81d:function(e,t,r){"use strict";var n=r("23e7"),o=r("b727").map,s=r("1dde"),i=s("map");n({target:"Array",proto:!0,forced:!i},{map:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}})},f2f1:function(e,t,r){}}]);