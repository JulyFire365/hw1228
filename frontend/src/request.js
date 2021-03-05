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

export const getAllImg = param => {
    return api.get(`/index.php?controller=folder&method=getAllImg`,param);
};

//把新建相册名称存储到数据库
export const foldRecordInDb = param => {
    return api.get(`/index.php?controller=folder&method=foldRecordInDb`,param);
};

