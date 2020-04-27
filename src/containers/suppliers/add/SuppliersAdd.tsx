import React, {useState} from "react";

import {Button, InputNumber, Input, AutoComplete, PageHeader, Select } from "antd";
import { Form } from "antd";

import { FormItemLayout, FormInputSize, Regex } from "../../../util/ComponentsUtil";


const { Option } = Select;

function SuppliersAdd(props: any) {
  const [form] = Form.useForm();
  // const { getFieldDecorator } = props.form;

  const onFinish = (v:any) => {
    form.validateFields()
      .then(values => {
        console.log('Received values of form: ', values);
      });
  };

  return (
    <div>
      <Form
        form={form}
        className={"Form"}
        {...FormItemLayout}
        onFinish={onFinish}
        size={FormInputSize}
      >
        <PageHeader
          title={"录入供应商"}
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
        <div className={"ContentContainer"}
          style={{
            padding: 24
          }}
        >
          <Form.Item
            label={"供应商名"}
            name={"suppliersName"}
            hasFeedback
            rules={[
              {
              required: true,
              message: '请输入供应商名'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"联系方式"}
            name={"contactInformation"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入联系人的联系方式'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"备注"}
            name={"remarks"}
            hasFeedback
          >
            <Input.TextArea
              autoSize={{ minRows: 2, maxRows: 6 }}
              placeholder={"可不填"}
            />
          </Form.Item>
          <Form.Item
            label={"生产类别"}
            name={"productionCategory"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入生产类别'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"采购类别"}
            name={"purchasingCategories"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入采购类别'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"法人"}
            name={"legalPerson"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入法人'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"联系人"}
            name={"contact"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入联系人'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"性别"}
            name={"sex"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入联系人的性别'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"职务"}
            name={"Post"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入联系人的职务'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"邮箱"}
            name={"mail"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入客户的邮箱'
              },
              {
                type: 'email',
                message: '请输入正确的邮箱'
              }
            ]}
          >
            <Input />
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

export default SuppliersAdd;
