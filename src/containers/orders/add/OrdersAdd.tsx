import React, {useState} from "react";

import {Button, InputNumber, Input, AutoComplete, PageHeader, Select, DatePicker} from "antd";
import { Form } from "antd";
import moment from 'moment';

import {FormItemLayout, FormInputSize, Regex, DateFormat} from "../../../util/ComponentsUtil";
import GoodsSearchAndShowByNumber from "../../../components/goods-search-and-show-by-number/GoodsSearchAndShowByNumber";


const { Option } = Select;

function OrdersAdd(props: any) {
  const [form] = Form.useForm();
  // const { getFieldDecorator } = props.form;

  const onFinish = (v:any) => {
    form.validateFields()
      .then(values => {
        console.log('Received values of form: ', values);
      });
  };

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
      >
        <PageHeader
          title={"录入订单"}
          ghost={false}
          onBack={() => window.history.back()}
          extra={[
            <Button key="cancelBtn" size={"large"} onClick={() => window.history.back()}>
              取消
          </Button>,
            <Button key="okBtn" size={"large"} type="primary" htmlType="submit">
              确认
          </Button>,
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
          客户
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
            <Select defaultValue={0}>
              <Option value={0}>否</Option>
              <Option value={1}>是</Option>
            </Select>
          </Form.Item>
          <GoodsSearchAndShowByNumber showPrice={true}/>
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
            <Select defaultValue={'现金'}>
              <Option value={'现金'}>现金</Option>
              <Option value={'预付'}>预付</Option>
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
            <Select defaultValue={'自提'}>
              <Option value={'自提'}>自提</Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 2 }}>
            <Button type="primary" htmlType="submit" size="large">
              确认
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default OrdersAdd;
