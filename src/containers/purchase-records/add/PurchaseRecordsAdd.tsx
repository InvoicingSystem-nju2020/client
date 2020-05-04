import React, {useState} from "react";

import {Button, InputNumber, Input, AutoComplete, PageHeader, Select, DatePicker} from "antd";
import { Form } from "antd";
import moment from 'moment';

import {FormItemLayout, FormInputSize, Regex, DateFormat} from "../../../util/ComponentsUtil";
import GoodsSearchAndShowByNumber from "../../../components/goods-search-and-show-by-number/GoodsSearchAndShowByNumber";
import SupplierSearchAndShow from "../../../components/suppliers-search-and-show/SuppliersSearchAndShow";


const { Option } = Select;

function PurchaseRecordsAdd(props: any) {
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
          title={"录入进货记录"}
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
            <DatePicker format={DateFormat.dateFormat}/>
          </Form.Item>
          <GoodsSearchAndShowByNumber/>
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
            label={"零售价"}
            name={"retailPrice"}
            hasFeedback
            validateFirst={true}
            rules={[
              {
                required: true,
                message: '请输入商品的零售价'
              },
              {
                type: 'number',
                min: 0,
                message: '请输入正确的商品零售价，>0'
              },
              {
                pattern: Regex.price,
                message: '请输入正确格式的商品零售价，例如50、100.52'
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
            hasFeedback
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
            hasFeedback
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
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入商品的零售价'
              }
            ]}
          >
            <Select defaultValue={'是'}>
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
              确认
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default PurchaseRecordsAdd;
