import React, {useEffect, useState} from "react";

import {Button, InputNumber, Input, AutoComplete, PageHeader, Select, Space, Popconfirm} from "antd";
import { Form } from "antd";
import { DeleteOutlined, ReloadOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';

import { FormItemLayout, FormInputSize, Regex } from "../../../util/ComponentsUtil";
import {ClientInfo} from "../../../api/data";

const { Option } = Select;

function ClientsAddAndEdit(props: any) {
  const [form] = Form.useForm();
  const [clientInfoToEdit, setClientInfoToEdit] = useState<ClientInfo>();
  // 修改模式
  const clinetsNumber: string = props.match.params.clientsNumber;
  const isEdit: boolean = !!clinetsNumber;

  const onFinish = (v:any) => {
    form.validateFields()
      .then(values => {
        console.log('Received values of form: ', values);
      });
  };

  // 组件首次加载时，若为修改模式则获取原本的信息
  useEffect(() => {
    if(!isEdit || !clinetsNumber){
      return;
    }
    // 获取原本的信息
    let info = getClientInfo(clinetsNumber);
    setClientInfoToEdit(info);
    form.setFieldsValue(info);    // 初始化设置要被修改的原有信息
  }, [])

  // 获取要被修改的信息
  function getClientInfo(clinetsNumber: string) {
    let result: ClientInfo;
    result = {clientsNumber: 'TFS2010-001', clientsName: '江苏省网球协会', clientsType: '团购', clientsContact: '胡', clientsSex: '男', clientsPost: '网协主席', contactInformation:'18000000000', remarks: '一般合作商', mail: 'xxx@a.com', other: '已退休'};
    return result;
  }

  // 重置表单
  function resetForm() {
    if(isEdit && clientInfoToEdit){
      form.setFieldsValue(clientInfoToEdit);
    }
    else {
      form.resetFields();
    }
  }

  // 删除
  function confirmDelete() {

  }

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
          title={isEdit ? <Space size={"large"}>修改客户<small>编号: {clinetsNumber}</small></Space> : "录入客户"}
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
              <CheckOutlined/>确认
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default ClientsAddAndEdit;
