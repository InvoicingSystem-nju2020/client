import React, {useState} from "react";
import {Button, Col, Form, Input, InputNumber, Row} from "antd";
import { DownOutlined, UpOutlined, SearchOutlined } from '@ant-design/icons';

// CSS
import './AdvancedSearchForm.css'


/**
 * 搜索条件
 * label: 标签名
 * name: 条件的属性名
 * example: {label: '商品名称', name: 'goodsName'}
 */
class Condition {
  label:string;
  name:string;

  constructor(label: string, name: string) {
    this.label = label;
    this.name = name;
  }
}

// 搜索表单布局
const AdvancedSearchFormItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 4}
  }
};

// 默认显示的搜索条件个数
const DEFAULT_CONDITIONS_NUM = 6;

/**
 * 高级搜索表单
 * @conditions: Condition[], 普通条件
 * @priceConditions: Condition[], 价格条件
 */
const AdvancedSearchForm = (props:any) => {
  let conditions:Condition[] = props.conditions;
  let priceConditions:Condition[] = props.priceConditions ? props.priceConditions : [];

  const needExpand:boolean = (conditions.length + priceConditions.length) > DEFAULT_CONDITIONS_NUM;
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();

  // 渲染搜索条件
  const getFields = () => {
    // 不需要扩展时 || 需要且展开状态 时全部显示
    let count = (!needExpand || expand ) ? conditions.length : DEFAULT_CONDITIONS_NUM;
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
            <SearchOutlined />搜索
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
            { needExpand ?
              <span>{expand ? <UpOutlined /> : <DownOutlined />} {expand ? '收起' : '展开'}</span>
              : <span></span>}
          </a>
        </Col>
      </Row>
    </Form>
  );
};

export {AdvancedSearchForm, Condition};