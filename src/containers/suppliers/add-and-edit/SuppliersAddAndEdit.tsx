import React, {useState, useEffect} from "react";

import {
  Button,
  InputNumber,
  Input,
  AutoComplete,
  PageHeader,
  Select,
  Space,
  Popconfirm,
  message,
  notification, Spin
} from "antd";
import { Form } from "antd";
import { DeleteOutlined, ReloadOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';

import { FormItemLayout, FormInputSize, Regex } from "../../../util/ComponentsUtil";
import {BaseParam} from "../../../util/config";
import { SupplierInfo } from "../../../api/data";
import {addSupplier, deleteSupplier, editSupplier, getSupplierByNumber} from "../../../api/SupplierApi";

const { Option } = Select;


const SuppliersAddAndEdit: React.FC = (props:any) => {
  const [form] = Form.useForm();
  // 修改模式
  const [supplierInfoToEdit, setSupplierInfoToEdit] = useState<SupplierInfo>();
  const supplierNumber: string = props.match.params.supplierNumber;
  const isEdit: boolean = !!supplierNumber;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFinish = (v:any) => {
    form.validateFields()
      .then(values => {
        console.log('Received values of form: ', values);
        // 调用接口
        let supplier = (values as any);
        let api = isEdit ? editSupplier(supplierNumber, supplier) : addSupplier(supplier);
        const hide = message.loading('正在处理...', 0);  // 显示正在处理
        api.then((response) => {
          console.log(response);
          const data = response.data;
          hide(); // 隐藏正在处理
          notification['success']({message: '操作成功', description: '供应商编号: '+data});  // 显示成功
          // 操作成功后跳转到列表
          setTimeout(props.history.push(BaseParam.BASE_URL+'suppliers/list'), 1000);
        }).catch(reason => {
          console.error(reason);
          hide();
          notification['error']({message: '发生了错误', description: reason.toString()});
        });
      });
  };

  // 组件首次加载时，若为修改模式则获取原本的信息
  useEffect(() => {
    if(!isEdit || !supplierNumber){
      return;
    }
    setIsLoading(true);
    // 获取原本的信息
    const hideMessage = message.loading('正在加载供应商信息...', 0);
    let api_getSupplierByNumber = getSupplierByNumber(supplierNumber);
    api_getSupplierByNumber.then(response => {
      let info = response.data;
      setSupplierInfoToEdit(info);
      form.setFieldsValue(info);    // 初始化设置要被修改的原有信息
      setIsLoading(false);
    }).catch(reason => {
      notification.error({message: '发生了错误', description: reason.toString()});
    }).finally(() => {
      hideMessage();
    });

    // // 获取原本的信息
    // let info = getSupplierInfo(supplierNumber);
    // setSupplierInfoToEdit(info);
    // form.setFieldsValue(info);    // 初始化设置要被修改的原有信息
  }, [])

  // // 获取要被修改的信息
  // function getSupplierInfo(supplierNumber: string) {
  //   let result: SupplierInfo;
  //   result = {supplierNumber: 'LINING001', supplierName: '李宁（北京）体育用品有限公司', contactInformation:'18000000000', remarks: '一般合作商', productionCategory: '运动鞋服', purchasingCategories: '羽球系列', legalPerson: '李宁', contact: '陈', sex: '男', post: '区域经理', mail: 'xxx@a.com'};
  //   return result;
  // }

  // 重置表单
  function resetForm() {
    if(isEdit && supplierInfoToEdit){
      form.setFieldsValue(supplierInfoToEdit);
    }
    else {
      form.resetFields();
    }
  }

  // 删除
  function confirmDelete() {
    const hide = message.loading('正在处理...', 0);  // 显示正在处理
    deleteSupplier(supplierNumber).then(response => {
      notification['success']({message: '删除供应商成功', description: '编号: '+response.data});  // 显示成功
      // 删除成功后跳转到列表
      setTimeout(props.history.push(BaseParam.BASE_URL+'suppliers/list'), 1000);
    }).catch(reason => {
      console.error(reason);
      notification['error']({message: '发生了错误', description: reason.toString()});
    }).finally(() => {
      hide(); // 隐藏正在处理
    });

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
          title={isEdit ? <Space size={"large"}>修改供应商<small>编号: {supplierNumber}</small></Space> : "录入供应商"}
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
        <Spin spinning={isLoading}>
          <div className={"ContentContainer ContentPadding"}>
            <Form.Item
              label={"供应商名"}
              name={"supplierName"}
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
              <Select >
                <Select.Option value={'男'}>男</Select.Option>
                <Select.Option value={'女'}>女</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label={"职务"}
              name={"post"}
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
                <CheckOutlined/>确认
              </Button>
            </Form.Item>
          </div>
        </Spin>
      </Form>
    </div>
  );
}

export default SuppliersAddAndEdit;
