import axios from "axios";

import {BaseParam} from "../util/config";

const qs = require('qs');

// axios.defaults.baseURL = BaseParam.API_URL;
axios.defaults.baseURL = '';
axios.defaults.withCredentials = true;
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.responseType = 'json';

function Get(url:string, params:any) {
  return axios.get(url, {
    params: params,
    paramsSerializer: function(params) {
      return qs.stringify(params, {arrayFormat: 'repeat'});   // 转换数组为标准形式, a=1&a=2&a=3
    }
  });
};

function Post(url:string, data:any) {
  return axios.post(url, data);
};

function Put(url:string, data:any) {
  return axios.put(url, data);
}

function Patch(url:string, data:any) {
  return axios.patch(url, data);
}

function Delete(url:string) {
  return axios.delete(url);
}

export { Get, Post, Put, Patch, Delete };