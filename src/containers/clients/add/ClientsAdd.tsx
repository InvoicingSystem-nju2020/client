import React, {useState} from "react";

import {Button, InputNumber, Input, AutoComplete, PageHeader, Select } from "antd";
import { Form } from "antd";

import { FormItemLayout, FormInputSize, Regex } from "../../../util/ComponentsUtil";


const { Option } = Select;

function ClientsAdd(props: any) {
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
          title={"录入客户"}
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
            label={"客户编号"}
            name={"clientsNumber"}
            hasFeedback
            rules={[
              {
              required: true,
              message: '请输入客户编号'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"客户名称"}
            name={"clientsName"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入客户名称'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"类型"}
            name={"clientsType"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入客户的类型'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"联系人"}
            name={"clientsContact"}
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
            name={"clientsSex"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入客户联系人的性别'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"职务"}
            name={"clientsPost"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入客户联系人的职务'
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
                message: '请输入客户联系人的联系方式'
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
            label={"其他"}
            name={"other"}
            hasFeedback
          >
            <Input.TextArea
              autoSize={{ minRows: 2, maxRows: 6 }}
              placeholder={"可不填"}
            />
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

export default ClientsAdd;
