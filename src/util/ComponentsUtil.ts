
/**
 * 表单项布局
 * 24为一行
 */
const FormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  }
};
const FormInputSize = 'large';

/**
 * 正则校验
 */
const Regex = {
  weight: /^\d+(g|G|kg|KG|t|T|克|千克|吨)$/,
  price: /^\d+(\.\d{1,2})?$/,     // 价格，小数点可选，若有小数点则小数点后需要有1~2位小数
}

/**
 * 日期格式
 */
const DateFormat = {
  dateFormat: 'YYYY/MM/DD',
  monthFormat: 'YYYY/MM'
}

export {FormItemLayout, FormInputSize, Regex, DateFormat};
