import * as api from "./asyn";

//------------------------------User Auth-----------------------

export const login = params => {
    return api.post(`/index.php?controller=admin&method=login`, params);
};

export const uploadStatic = () => {
    return api.get(`/index.php?controller=folder&method=getList`);
};
