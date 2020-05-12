import React, {useEffect, useState} from "react";

import {Button, InputNumber, Input, AutoComplete, PageHeader, Select, DatePicker, Space, Popconfirm} from "antd";
import { Form } from "antd";
import { DeleteOutlined, ReloadOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';

import moment from 'moment';

import {FormItemLayout, FormInputSize, Regex, DateFormat} from "../../../util/ComponentsUtil";
import GoodsSearchAndShowByNumber from "../../../components/goods-search-and-show-by-number/GoodsSearchAndShowByNumber";
import SupplierSearchAndShow from "../../../components/suppliers-search-and-show/SuppliersSearchAndShow";
import {PurchaseRecordInfo} from "../../../api/data";


const { Option } = Select;

function PurchaseRecordsAddAndEdit(props: any) {
  const [form] = Form.useForm();
  // 修改模式
  const [purchaseRecordInfoToEdit, setPurchaseRecordInfoToEdit] = useState<PurchaseRecordInfo>();
  const id: string = props.match.params.id;
  const isEdit: boolean = !!id;
  // 商品搜索框重置状态(状态提升至此，从而使得能够控制重置)
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const onFinish = (v:any) => {
    form.validateFields()
      .then(values => {
        console.log('Received values of form: ', values);
      });
  };

  // 组件首次加载时，若为修改模式则获取原本的信息
  useEffect(() => {
    if(!isEdit || !id){
      return;
    }
    // 获取原本的信息
    let info = getSupplierInfo(id);
    setPurchaseRecordInfoToEdit(info);
    form.setFieldsValue(info);    // 初始化设置要被修改的原有信息
  }, [])

  // 获取要被修改的信息
  function getSupplierInfo(supplierNumber: string) {
    let result: PurchaseRecordInfo;
    result = {id: 'PR00000001', purchaseTime: moment('2019/04', DateFormat.monthFormat), goodsNumber: 'WQP00001', numbers: 24, discount: 0.5, unitPrice: 1240, totalAmount: 29760, taxIncluded: '是', precautionsForPreservation: '防晒防潮', supplierNumber: 'AMER001', remarks: 'xx'};
    return result;
  }

  // 重置表单
  function resetForm() {
    if(isEdit && purchaseRecordInfoToEdit){
      form.resetFields();
      form.setFieldsValue(purchaseRecordInfoToEdit);
      setIsResetting(true);
    }
    else {
      form.resetFields();
    }
  }

  // 删除
  function confirmDelete() {

  }

  // 价格和数量变动时自动计算总金额
  const onPriceAndNumChange = (changedValues:any, allValues:any) => {
    let unitPrice = form.getFieldValue('unitPrice');
    let num = form.getFieldValue('numbers');
    if(unitPrice && num){
      form.setFieldsValue({totalAmount:unitPrice*num});
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
        initialValues={{taxIncluded: '是'}}
      >
        <PageHeader
          title={isEdit ? <Space size={"large"}>修改进货记录<small>编号: {id}</small></Space> : "录入进货记录"}
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
            label={"进货时间"}
            name={"purchaseTime"}
            hasFeedback
            rules={[
              {
              required: true,
              message: '请选择进货时间'
              }
            ]}
          >
            <DatePicker format={DateFormat.monthFormat} picker={'month'}/>
          </Form.Item>
          <GoodsSearchAndShowByNumber
            showPrice={true}
            goodsNumberToShow={purchaseRecordInfoToEdit?.goodsNumber}
            isResetting={isResetting}
            setIsResetting={setIsResetting}
          />
          <Form.Item
            label={"数量"}
            name={"numbers"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入进货数量'
              },
              {
                type: 'number',
                min: 0,
                message: '请输入正确的商品数量，>0'
              }
            ]}
          >
            <InputNumber
              min={0}
              style={{width: "100%"}}
            />
          </Form.Item>
          <Form.Item
            label={"折扣"}
            name={"discount"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入折扣'
              },
              {
                type: 'number',
                min: 0,
                message: '请输入正确的折扣，>0'
              }
            ]}
          >
            <InputNumber
              min={0}
              style={{width: "100%"}}
            />
          </Form.Item>
          <Form.Item
            label={"单价"}
            name={"unitPrice"}
            validateFirst={true}
            rules={[
              {
                required: true,
                message: '请输入商品的单价'
              },
              {
                type: 'number',
                min: 0,
                message: '请输入正确的商品单价，>0'
              },
              {
                pattern: Regex.price,
                message: '请输入正确格式的商品单价，例如50、100.52'
              },
            ]}
          >
            <InputNumber
              min={0}
              style={{width: "100%"}}
            />
          </Form.Item>
          <Form.Item
            label={"金额"}
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
            label={"是否含税"}
            name={"taxIncluded"}
          >
            <Select>
              <Option value={'是'}>是</Option>
              <Option value={'否'}>否</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={"保存注意事项"}
            name={"precautionsForPreservation"}
            hasFeedback
          >
            <Input.TextArea
              autoSize={{ minRows: 2, maxRows: 6 }}
              placeholder={"可不填"}
            />
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
          <SupplierSearchAndShow/>
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

export default PurchaseRecordsAddAndEdit;
