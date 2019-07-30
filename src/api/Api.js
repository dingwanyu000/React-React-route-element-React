import axios from "axios";

// axios.defauls.baseURL = "locahost:8080";
//请求超时时间
//axios.defaults.timeout = 10000;
// axios拦截器
axios.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error.response.data); // 返回接口返回的错误信息
    }
);

export function get(url, params = {}) {
    return axios.get(url, {
        params: params,
        validateStatus: function (status) {
            // axios 底层采用 Promise 实现，下方表达式表示只有返回 code 为 2xx 才被正常返回（resolve），非 2xx 全部当做异常（reject）
            return status >= 200 && status < 300
        }
    }).then(response => {
        // 返回后端返回数据
        return response.data
    }).catch(error => {
        // 异常处理
        proxyUtil.alertMessage(error)
    })
}

export function post(url, params = {}) {
    return axios.post(url, params).then(response => {
        return response.data
    }).catch(error => {
        // 异常处理
        proxyUtil.alertMessage(error)
    })
}

export function asyncAll(requests = []) {
    // 使用 axios 的 all 方法
    return axios.all(requests).then(resultArr => {
        // 对结果做特殊化处理，此处是对返回接口 code 在一定范围内作信息弹框
        for (let result of resultArr) {
            let code = result.code
            if (code > 220 || code < 200) {
                proxyUtil.alertMessage(result.msg)
            }
        }
        //  返回每个方法返回的接口数据
        return resultArr
    }).catch(error => {
        // 异常处理
        proxyUtil.alertMessage(error)
    })
}

