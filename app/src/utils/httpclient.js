import axios from 'axios';

const basrUrl = "http://route.showapi.com";

function formatterDateTime() {
    var date=new Date()
    var month=date.getMonth() + 1
    var datetime = date.getFullYear()
        + ""
        + (month >= 10 ? month : "0"+ month)
        + ""/
        + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
        + ""
        + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours())
        + ""
        + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
        + ""
        + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
    return datetime;
}

function filterUrl(url){
    if(url.startsWith('http') || url.startsWith('https')){
        return url;
    };
    return basrUrl+"/"+url;
}

function filterParams(params){
    params = params || {};
    let key = {"showapi_timestamp": formatterDateTime(), "showapi_appid": '82135', "showapi_sign": 'a64348be58b7486bb31af997f729fd7d', "showapi_res_gzip": "1"};
    return Object.assign({}, params, key)
}

import { Indicator } from 'mint-ui';

// 开启loading
axios.interceptors.request.use(function (config) {
    Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
    });
    return config;
}, function (error) {
    return Promise.reject(error);
});
 
// 关闭loading
axios.interceptors.response.use(function (response) {
    Indicator.close();
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default {
    // 封装并发请求
    all(arr){
        return new Promise((resolve, reject)=>{
            axios.all(arr)
            .then(axios.spread(function(){
                resolve(Object.values(arguments));
            }))
            .catch(error=>{
                reject(error);
            });
        });
    },
    // 封装get请求
    get(url, params){
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: filterUrl(url),
                params: filterParams(params)
            }).then(res => {
                resolve(res);
            }).catch(error => {
                reject(error);
            });
        });
    },
    // 封装post请求
    post(url, params){
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: filterUrl(url),
                data: filterParams(params),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret;
                  }],
            }).then(res => {
                resolve(res);
            }).catch(error => {
                reject(error);
            });
        });
    }
}