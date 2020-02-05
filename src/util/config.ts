// console.log(process.env);
// console.log(process.env.REACT_APP_BASE_URL);

// const BASE_URL:string = '/';
//
// const API_URL:string = process.env.NODE_ENV === 'development' ?
//   '' :  // 生产
//   '';   // 产品

/**
 * 环境
 */
const BASE_URL:any = process.env.REACT_APP_BASE_URL;

const API_URL:any = process.env.REACT_APP_API_URL;

const BaseParam = {
  BASE_URL: BASE_URL,
  API_URL: API_URL
};

export { BaseParam };