import axios from "axios";
import { Message, Loading } from "element-ui";
axios.defaults.withcredentials = true;
axios.defaults.baseURL = "";

// loading框设置局部刷新，且所有请求完成后关闭loading框

let loading,
    loadCount = 0,
    loadingArray = [];

axios.interceptors.request.use(
    config => {
        loadCount++;
        loading = Loading.service({
            target: "loading-area",
            // target: document.querySelector('.loading-area'),
            text: "正在加载中..."
        });
        loadingArray.push(loading);
        return config;
    },
    err => {
        loadCount--;
        if (!loadCount) {
            loadingArray.forEach(item => item.close());
        }
        console.log(err);
        Promise.reject(err);
    }
);

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
    response => {
        loadCount--;
        if (!loadCount) {
            loadingArray.forEach(item => item.close());
        }
        if (response.status && response.status == 200) {
            if (response.data.status == 200) {
                return response.data;
            } else if (response.data.status === 201) {
                // setTimeout(() => {
                //     sessionStorage.removeItem('expires_status');
                // }, 5000)
                // if (!sessionStorage.getItem("expires_status")) {
                //     sessionStorage.setItem("expires_status", 1);
                    Message.error({ message: response.data.msg });
                // }
            } else if (response.data.status === 202) {
                    Message.error({ message: response.data.msg });
                    location.href = '/admin'
            } else {
                // 错误提示
                if (!response.data.data) {
                    return Promise.reject(response.data);
                }
                return response.data;
            }
        }
    },

    error => {
        loadCount--;
        if (!loadCount) {
            loadingArray.forEach(item => item.close());
        }
        Message.error({
            message: error.data.msg
        });
        return Promise.reject(error.data);
    }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get (url, params = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params
            })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * 封装gets方法
 * @param urlParams
 * @param data
 * @returns {Promise}
 */

export function gets (url, params = {}) {
    return new Promise((resolve, reject) => {
        let combineParams = "",
            urlParams = "";
        if (JSON.stringify(params) == "{}") {
            urlParams = url;
        } else {
            for (let i in params) {
                combineParams += i + "=" + params[i] + "&";
            }
            combineParams = combineParams.replace(/(&*$)/g, "");
            urlParams = url + "?" + combineParams;
        }
        axios
            .get(urlParams)
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, data = {}) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, data)
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch (url, data = {}) {
    return new Promise((resolve, reject) => {
        axios
            .patch(url, data)
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put (url, data = {}) {
    return new Promise((resolve, reject) => {
        axios
            .put(url, data)
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del (url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(url, data).then(
            response => {
                resolve(response);
            },
            err => {
                reject(err);
            }
        );
    });
}
