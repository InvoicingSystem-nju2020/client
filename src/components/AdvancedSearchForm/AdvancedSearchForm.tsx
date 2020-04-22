import React, {useState} from "react";
import {Button, Col, Form, Input, InputNumber, Row} from "antd";
import { DownOutlined, UpOutlined } from '@ant-design/icons';

// CSS
import './AdvancedSearchForm.css'


interface Condition {
  label:string;
  name:string;
}

const AdvancedSearchFormItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 4}
  }
};


const AdvancedSearchForm = (props:any) => {
  let conditions:Condition[] = props.conditions;
  let priceConditions:Condition[] = props.priceConditions ? props.priceConditions : [];

  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();

  // 渲染搜索条件
  const getFields = () => {
    let count = expand ? conditions.length : 6;
    console.log('len:' + conditions.length);
    const children = [];
    for (let i = 0; i < count; i++) {
      let condition = conditions[i];
      children.push(
        <Col span={8} key={condition.name}>
          <Form.Item
            name={condition.name}
            label={condition.label}
          >
            <Input />
          </Form.Item>
        </Col>,
      );
    }
    if(expand && priceConditions.length >= 0) {
      for (let i = 0; i < priceConditions.length; i++){
        let priceCondition = priceConditions[i];
        children.push(
          <Col span={8} key={priceCondition.name}>
            <Form.Item
              label={priceCondition.label}
            >
              <Input.Group compact>
                <Input name={'min'+priceCondition.name} placeholder={'最低价格'} style={{width:'50%'}}/>
                <Input name={'max'+priceCondition.name} placeholder={'最高价格'} style={{width:'50%'}}/>
              </Input.Group>
            </Form.Item>
          </Col>
        );
      }
    }
    return children;
  };

  const onFinish = (values:any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      className="AdvancedSearchForm"
      onFinish={onFinish}
      {...AdvancedSearchFormItemLayout}
    >
      <Row gutter={24}>{getFields()}</Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => {
              form.resetFields();
            }}
          >
            重置
          </Button>
          <a
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            {expand ? <UpOutlined /> : <DownOutlined />} {expand ? '收起' : '展开'}
          </a>
        </Col>
      </Row>
    </Form>
  );
};

export default AdvancedSearchForm;