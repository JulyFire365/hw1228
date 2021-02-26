import Vue from "vue";
import Router from 'vue-router';
Vue.use(Router);

const newRouter = new Router({
    mode: 'history',
    routes: [
    //     {
    //     path: "*",
    //     redirect: "/login"
    // },
    {
        path: "/admin",
        name: "login",
        components: require("./components/adminLogin.vue")
    },
    {
        path: "/home",
        name: "home",
        components: require("./components/adminHome.vue"),
        children: [
            {
                path: "upload",
                name: "upload",
                components: require("./components/upload.vue")
            },
            {
                path: "imgList",
                name: "imgList",
                components: require("./components/imgList.vue")
            },
            {
                path: "img",
                name: "img",
                components: require("./components/img.vue")
            }
        ]
    }
    ]
});

export default newRouter;