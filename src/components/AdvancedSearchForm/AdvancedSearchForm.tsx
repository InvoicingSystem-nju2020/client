import React, {useState} from "react";
import {Button, Col, Form, Input, InputNumber, Row} from "antd";
import { DownOutlined, UpOutlined, SearchOutlined } from '@ant-design/icons';

// CSS
import './AdvancedSearchForm.css'


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
 * @conditions: <Form.Item>形式的组件
 */
const AdvancedSearchForm = (props:any) => {
  let conditions = props.conditions;

  const needExpand:boolean = conditions.length > DEFAULT_CONDITIONS_NUM;
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();

  // 渲染搜索条件
  const getFields = () => {
    // 不需要扩展时 || 需要且展开状态 时全部显示
    let count = (!needExpand || expand ) ? conditions.length : DEFAULT_CONDITIONS_NUM;
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={8} key={i}>
          {conditions[i]}
        </Col>,
      );
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

export {AdvancedSearchForm};