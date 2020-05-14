import React, {useEffect, useState} from "react";

import {Button, InputNumber, Input, AutoComplete, PageHeader, Select, DatePicker, Space, Popconfirm} from "antd";
import { Form } from "antd";
import { DeleteOutlined, ReloadOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';

import moment from 'moment';

import {FormItemLayout, FormInputSize, Regex, DateFormat} from "../../../util/ComponentsUtil";
import GoodsSearchAndShowByNumber from "../../../components/goods-search-and-show-by-number/GoodsSearchAndShowByNumber";
import ClientSearch from "../../../components/client-search/ClientsSearch";
import {SelectProps} from "antd/es/select";
import {OrderInfo, SupplierInfo} from "../../../api/data";


const { Option } = Select;

function OrdersAddAndEdit(props: any) {
  const [form] = Form.useForm();
  const [typeOfPayment, setTypeOfPayment] = useState<string>(); // 付款方式
  const [stateOptions, setStateOptions] = useState<SelectProps<object>['options']>(); // 订单状态选项
  // 修改模式
  const [orderInfoToEdit, setOrderInfoToEdit] = useState<OrderInfo>();
  const orderNumber: string = props.match.params.orderNumber;
  const isEdit: boolean = !!orderNumber;
  // 商品搜索框重置状态(状态提升至此，从而使得能够控制重置)
  const [isResetting, setIsResetting] = useState<boolean>(false);

  // 表单提交
  const onFinish = (v:any) => {
    form.validateFields()
      .then(values => {
        console.log('Received values of form: ', values);
      });
  };

  // 组件首次加载时，若为修改模式则获取原本的信息
  useEffect(() => {
    if(!isEdit || !orderNumber){
      return;
    }
    // 获取原本的信息
    let info = getOrderInfo(orderNumber);
    setOrderInfoToEdit(info);
    form.setFieldsValue(info);    // 初始化设置要被修改的原有信息
  }, [])

  // 获取要被修改的信息
  function getOrderInfo(orderNumber: string) {
    let result: OrderInfo;
    result = {orderNumber: 'xxxxxx01', salesPerson: '张三', clientNumber: 'TFS2010-001', writeAnInvoice: 1, goodsNumber: 'WQP00001', finalPrice: 2480, numbers: 2, totalAmount: 4960, typeOfPayment: '预支付', typeOfShipping: '自提', state: '已完成'};
    return result;
  }

  // 重置表单
  function resetForm() {
    if(isEdit && orderInfoToEdit){
      form.resetFields();
      form.setFieldsValue(orderInfoToEdit);
      setIsResetting(true);   // 触发自定义子组件重置
    }
    else {
      form.resetFields();
    }
  }

  // 删除
  function confirmDelete() {

  }

  // 价格和数量变化
  const onPriceAndNumChange = (changedValues:any, allValues:any) => {
    let price = form.getFieldValue('finalPrice');
    let num = form.getFieldValue('numbers');
    if(price && num){
      form.setFieldsValue({totalAmount:price*num});
    }
    else{
      form.setFieldsValue({totalAmount:undefined});
    }
  };

  // 开始时设置订单的默认状态
  useEffect(() => {
    getAndSetOrderStateOptions();
  }, []);

  // 付款方式变化时
  const onTypeOfPaymentChange = () => {
    getAndSetOrderStateOptions();
  };

  // 获取订单状态选项
  const getAndSetOrderStateOptions = () => {
    const typeOfPayment = form.getFieldValue('typeOfPayment');
    const selectedState = form.getFieldValue('state');
    let options:string[] = [];
    if(typeOfPayment === '现金'){
      options = ['待付款', '已售', '已完成'];
    }
    else if(typeOfPayment === '预支付'){
      options = ['已售', '已完成'];
    }
    else if(typeOfPayment === '赊账'){
      options = ['赊账中', '已到账', '已完成'];
    }
    // console.log(options)
    // 若选项改变了则选取一个默认值
    if(options.length > 0 && !options.includes(selectedState)){
      form.setFieldsValue({state: options[0]});
    }
    setStateOptions(options.map(value => {return {value: value, label: value} }));
  };

  return (
    <div>
      <Form
        form={form}
        className={"Form"}
        {...FormItemLayout}
        onFinish={onFinish}
        onValuesChange={onPriceAndNumChange}
        scrollToFirstError
        size={FormInputSize}
        initialValues={{
          writeAnInvoice: 0,
          typeOfPayment: '现金',
          typeOfShipping: '自提'
        }}
      >
        <PageHeader
          title={isEdit ? <Space size={"large"}>修改订单<small>编号: {orderNumber}</small></Space> : "录入订单"}
          ghost={false}
          onBack={() => window.history.back()}
          extra={[
            (isEdit?
                <Popconfirm
                  placement="bottomRight"
                  title={"确认删除？"}
                  onConfirm={confirmDelete}
                  key="deleteBtn"
                >
                  <Button size={"large"} type="primary" danger>
                    <DeleteOutlined />删除
                  </Button>
                </Popconfirm> : ''
            ),
            <Button key="resetBtn" size={"large"} onClick={resetForm}>
              <ReloadOutlined />重置
            </Button>,
            <Button key="cancelBtn" size={"large"} onClick={() => window.history.back()}>
              <CloseOutlined />取消
            </Button>,
            <Button key="okBtn" size={"large"} type="primary" htmlType="submit">
              <CheckOutlined />确认
            </Button>
          ]}
        >
        </PageHeader>
        <div className={"ContentContainer ContentPadding"}>
          <Form.Item
            label={"售货员"}
            name={"salesPerson"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入售货员'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <ClientSearch
            clientNumber={orderInfoToEdit?.clientNumber}
            isResetting={isResetting}
            setIsResetting={setIsResetting}
            form={form}
          />
          <Form.Item
            label={"是否开票"}
            name={"writeAnInvoice"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请选择是否开票'
              }
            ]}
          >
            <Select>
              <Option value={0}>否</Option>
              <Option value={1}>是</Option>
            </Select>
          </Form.Item>
          <GoodsSearchAndShowByNumber
            showPrice={true}
            goodsNumberToShow={orderInfoToEdit?.goodsNumber}
            isResetting={isResetting}
            setIsResetting={setIsResetting}
          />
          <Form.Item
            label={"成交价"}
            name={"finalPrice"}

            hasFeedback
            validateFirst={true}
            rules={[
              {
                required: true,
                message: '请输入成交价'
              },
              {
                type: 'number',
                min: 0,
                message: '请输入正确的成交价，>0'
              },
              {
                pattern: Regex.price,
                message: '请输入正确格式的成交价，例如50、100.52'
              },
            ]}
          >
            <InputNumber
              min={0}
              style={{width: "100%"}}
            />
          </Form.Item>
          <Form.Item
            label={"数量"}
            name={"numbers"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入数量'
              },
              {
                type: 'number',
                min: 0,
                message: '请输入正确的数量，>0'
              }
            ]}
          >
            <InputNumber
              min={0}
              style={{width: "100%"}}
            />
          </Form.Item>
          <Form.Item
            label={"总金额"}
            name={"totalAmount"}
            validateFirst={true}
            rules={[
              {
                required: true,
                message: '请输入总金额'
              },
              {
                type: 'number',
                min: 0,
                message: '请输入正确的总金额，>0'
              },
              {
                pattern: Regex.price,
                message: '请输入正确格式的总金额，例如50、100.52'
              },
            ]}
          >
            <InputNumber
              min={0}
              style={{width: "100%"}}
            />
          </Form.Item>
          <Form.Item
            label={"付款方式"}
            name={"typeOfPayment"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请选择付款方式'
              }
            ]}
          >
            <Select value={typeOfPayment} onChange={onTypeOfPaymentChange}>
              <Option value={'现金'}>现金</Option>
              <Option value={'预支付'}>预支付</Option>
              <Option value={'赊账'}>赊账</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={"运输方式"}
            name={"typeOfShipping"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请选择运输方式'
              }
            ]}
          >
            <Select>
              <Option value={'自提'}>自提</Option>
              <Option value={'邮寄'}>邮寄</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={"订单状态"}
            name={"state"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请选择订单状态'
              }
            ]}
          >
            <Select options={stateOptions}></Select>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 2 }}>
            <Button type="primary" htmlType="submit" size="large">
              <CheckOutlined />确认
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default OrdersAddAndEdit;
