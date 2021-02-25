import * as api from "./asyn";

//------------------------------User Auth-----------------------
//登录
export const login = params => {
    return api.post(`/index.php?controller=admin&method=login`, params);
};
//判断用户是否登录
export const isLogin = () => {
    return api.post(`/index.php?controller=admin&method=isLogin`);
};
//登出
export const logout = () => {
    return api.post(`/index.php?controller=admin&method=logout`);
};
//文件夹静态属性
export const uploadStatic = () => {
    return api.get(`/index.php?controller=folder&method=getList`);
};
//获取文件列表及第一张图片路径
export const getAllFile = () => {
    return api.get(`/index.php?controller=folder&method=getAllFile`);
};
