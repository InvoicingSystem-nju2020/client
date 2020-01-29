console.log("PATH_NAME: "+document.location.pathname);

const BASE_URL:string = '/';

const API_URL:string = process.env.NODE_env === 'development' ?
  '' :  // 生产
  '';   // 产品

export const BaseParam = {
  BASE_URL: BASE_URL,
  API_URL: API_URL
};
