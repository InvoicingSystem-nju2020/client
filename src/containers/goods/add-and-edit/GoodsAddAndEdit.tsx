import React, {useEffect, useState} from "react";

import {Button, InputNumber, Input, AutoComplete, PageHeader, Select, Space, Popconfirm} from "antd";
import { Form } from "antd";
import { DeleteOutlined, ReloadOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';

import { FormItemLayout, FormInputSize, Regex } from "../../../util/ComponentsUtil";
import {GoodsInfo} from "../../../api/data";


const { Option } = Select;

function GoodsAddAndEdit(props: any) {
  const [form] = Form.useForm();
  const [types, setTypes] = useState<{ value: string }[]>([{value:'网球拍'}, {value:'羽球拍'}]);
  const [units, setUnits] = useState([{value:'支'}, {value:'个'}]);
  // 修改模式
  const [goodsInfoToEdit, setGoodsInfoToEdit] = useState<GoodsInfo>();
  const goodsNumber: string = props.match.params.goodsNumber;
  const isEdit: boolean = !!goodsNumber;

  const onFinish = (v:any) => {
    form.validateFields()
      .then(values => {
        console.log('Received values of form: ', values);
      });
  };

  // 组件首次加载时，若为修改模式则获取原本的信息
  useEffect(() => {
    if(!isEdit || !goodsNumber){
      return;
    }
    // 获取原本的信息
    let info = getSupplierInfo(goodsNumber);
    setGoodsInfoToEdit(info);
    form.setFieldsValue(info);    // 初始化设置要被修改的原有信息
  }, [])

  // 获取要被修改的信息
  function getSupplierInfo(supplierNumber: string) {
    let result: GoodsInfo;
    result = {goodsNumber: 'xxxxxxx01', goodsName: '室内器材', abbreviation:'网球拍', brand: 'wilson', model: 'pro staff', goodsNo: 'WRT74181U2', material: '碳纤维', colour: '黑', type: '球拍', specifications: '97(in)2/16*19', unit: '支', weight: '315G', weightNum: 315, weightUnit: 'g', retailPrice:2480, placeOfProduction: '中国', qualityGuaranteePeriod: 6, remarks: 'xxx'};
    return result;
  }

  // 重置表单
  function resetForm() {
    if(isEdit && goodsInfoToEdit){
      form.setFieldsValue(goodsInfoToEdit);
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
          title={isEdit ? <Space size={"large"}>修改商品<small>编号: {goodsNumber}</small></Space> : "录入商品"}
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
            label={"商品名"}
            name={"goodsName"}
            hasFeedback
            rules={[
              {
              required: true,
              message: '请输入商品名'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"简称"}
            name={"abbreviation"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入商品简称'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"品牌"}
            name={"brand"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入商品的品牌'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"型号"}
            name={"model"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入商品的型号'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"货号"}
            name={"goodsNo"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入商品的货号'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"材料"}
            name={"material"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入商品的货号'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"颜色"}
            name={"colour"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入商品的颜色'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"种类"}
            name={"type"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入商品的种类'
              }
            ]}
          >
            <AutoComplete options={types} backfill={true}>
              <Input />
            </AutoComplete>
          </Form.Item>
          <Form.Item
            label={"规格"}
            name={"specifications"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入商品的规格'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"单位"}
            name={"unit"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入商品的计量单位'
              }
            ]}
          >
            <AutoComplete options={units} backfill={true}>
              <Input />
            </AutoComplete>
          </Form.Item>
          {/*<Form.Item*/}
          {/*  label={"重量"}*/}
          {/*  name={"weight"}*/}
          {/*  hasFeedback*/}
          {/*  rules={[*/}
          {/*    {*/}
          {/*      required: true,*/}
          {/*      message: '请输入商品的重量'*/}
          {/*    },*/}
          {/*    {*/}
          {/*      pattern: Regex.weight,*/}
          {/*      message: '请输入正确格式的商品重量，例如315G，单位g、G、kg、KG、t、T、克、千克、吨'*/}
          {/*    }*/}
          {/*  ]}*/}
          {/*>*/}
          {/*  <Input />*/}
          {/*</Form.Item>*/}
          <Form.Item
            label={"重量"}
            // initialValue={{weightNum: undefined, weightUnit: 'g'}}
          >
            <Input.Group compact>
              <Form.Item
                name={'weightNum'}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: '请输入商品的重量'
                  },
                  {
                    type: 'number',
                    min: 0,
                    message: '请输入正确的商品重量，>0'
                  }
                ]}
                noStyle
              >
                <InputNumber
                  min={0}
                />
              </Form.Item>
              <Form.Item
                name={'weightUnit'}
                noStyle
              >
                <Select defaultValue={'g'}>
                  <Option value={'g'}>g</Option>
                  <Option value={'kg'}>kg</Option>
                  <Option value={'t'}>t</Option>
                </Select>
              </Form.Item>
            </Input.Group>
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
            label={"产地"}
            name={"placeOfProduction"}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入商品的产地'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"保质期/月"}
            name={"qualityGuaranteePeriod"}
            hasFeedback
            validateFirst={true}
            rules={[
              {
                required: true,
                message: '请输入商品的保质期/月'
              },
              {
                transform: (value: string) => {
                  return parseInt(value)
                },
                type: 'number',
                min: 0,
                message: '请输入正确的保质期/月'
              }
            ]}
          >
            <InputNumber
              min={0}
              style={{width: "100%"}}
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

// export default GoodsAddAndEdit;
export default GoodsAddAndEdit;
