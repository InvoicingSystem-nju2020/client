import React from "react";

import {Button, InputNumber, PageHeader} from "antd";
import { Form, Input, AutoComplete } from "antd";

import { FormItemLayout, FormInputSize, Regex } from "../../../util/ComponentsUtil";
import {GoodsAddFormData} from "../../../api/data";

//自定义组件
// import GoodsAddForm from "./GoodsAddForm/GoodsAddForm";


function GoodsAdd(props: any) {
  const { getFieldDecorator } = props.form;

  // 自动补全的dataSource
  let types: string[] = ['网球拍', '羽球拍'];
  let units: string[] = ['支', '个'];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.form.validateFields((err:any, values:any) => {
      if (!err) {   // 所有校验通过
        console.log('Received values of form: ', values);
        let data:GoodsAddFormData = values;
      }
    })
  }

  return (
    <div>
      <Form className={"Form"} {...FormItemLayout} onSubmit={handleSubmit}>
        <PageHeader
          title={"录入商品"}
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
          {/* <GoodsAddForm/> */}
          <Form.Item
            label={"商品名"}
            hasFeedback
          >
            {getFieldDecorator('goodsName', {
              rules: [
                {
                  required: true,
                  message: '请输入商品名'
                }
              ]
            })(<Input id={"goodsName"} name={"goodsName"} size={FormInputSize} />)}
          </Form.Item>
          <Form.Item
            label={"简称"}
            hasFeedback
          >
            {getFieldDecorator('abbreviation', {
              rules: [
                {
                  required: true,
                  message: '请输入商品简称'
                }
              ]
            })(<Input id={"abbreviation"} name={"abbreviation"} size={FormInputSize} />)}
          </Form.Item>
          <Form.Item
            label={"品牌"}
            hasFeedback
          >
            {getFieldDecorator('brand', {
              rules: [
                {
                  required: true,
                  message: '请输入商品的品牌'
                }
              ]
            })(<Input id={"brand"} name={"brand"} size={FormInputSize} />)}
          </Form.Item>
          <Form.Item
            label={"型号"}
            hasFeedback
          >
            {getFieldDecorator('model', {
              rules: [
                {
                  required: true,
                  message: '请输入商品的型号'
                }
              ]
            })(<Input id={"model"} name={"model"} size={FormInputSize} />)}
          </Form.Item>
          <Form.Item
            label={"货号"}
            hasFeedback
          >
            {getFieldDecorator('goodsNo', {
              rules: [
                {
                  required: true,
                  message: '请输入商品的货号'
                }
              ]
            })(<Input id={"goodsNo"} name={"goodsNo"} size={FormInputSize} />)}
          </Form.Item>
          <Form.Item
            label={"材料"}
            hasFeedback
          >
            {getFieldDecorator('material', {
              rules: [
                {
                  required: true,
                  message: '请输入商品的材料'
                }
              ]
            })(<Input id={"material"} name={"material"} size={FormInputSize} />)}
          </Form.Item>
          <Form.Item
            label={"颜色"}
            hasFeedback
          >
            {getFieldDecorator('colour', {
              rules: [
                {
                  required: true,
                  message: '请输入商品的颜色'
                }
              ]
            })(<Input id={"colour"} name={"colour"} size={FormInputSize} />)}
          </Form.Item>
          <Form.Item
            label={"种类"}
            hasFeedback
          >
            {getFieldDecorator('type', {
              rules: [
                {
                  required: true,
                  message: '请输入商品的种类'
                }
              ]
            })(<AutoComplete dataSource={types} size={FormInputSize} backfill={true}>
              <Input id={"type"} name={"type"} />
            </AutoComplete>)}
          </Form.Item>
          <Form.Item
            label={"规格"}
            hasFeedback
          >
            {getFieldDecorator('specifications', {
              rules: [
                {
                  required: true,
                  message: '请输入商品的规格'
                }
              ]
            })(<Input id={"specifications"} name={"specifications"} size={FormInputSize} />)}
          </Form.Item>
          <Form.Item
            label={"单位"}
            hasFeedback
          >
            {getFieldDecorator('unit', {
              rules: [
                {
                  required: true,
                  message: '请输入商品的计量单位'
                }
              ]
            })(<AutoComplete dataSource={units} size={FormInputSize} backfill={true}>
              <Input id={"unit"} name={"unit"} />
            </AutoComplete>)}
          </Form.Item>
          <Form.Item
            label={"重量"}
            hasFeedback
          >
            {getFieldDecorator('weight', {
              rules: [
                {
                  required: true,
                  message: '请输入商品的重量'
                },
                {
                  pattern: Regex.weight,
                  message: '请输入正确格式的商品重量，例如315G，单位g、G、kg、KG、t、T、克、千克、吨'
                }
              ]
            })(<Input id={"weight"} name={"weight"} size={FormInputSize} />)}
          </Form.Item>
          <Form.Item
            label={"零售价"}
            hasFeedback
          >
            {getFieldDecorator('retailPrice', {
              validateFirst: true,
              rules: [
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
              ]
            })(<InputNumber
              id={"retailPrice"}
              name={"retailPrice"}
              min={0}
              size={FormInputSize}
              style={{width: "100%"}}
            />)}
          </Form.Item>
          <Form.Item
            label={"产地"}
            hasFeedback
          >
            {getFieldDecorator('placeOfProduction', {
              rules: [
                {
                  required: true,
                  message: '请输入商品的产地'
                }
              ]
            })(<Input id={"placeOfProduction"} name={"placeOfProduction"} size={FormInputSize} />)}
          </Form.Item>
          <Form.Item
            label={"保质期/月"}
            hasFeedback
          >
            {getFieldDecorator('qualityGuaranteePeriod', {
              validateFirst: true,
              rules: [
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
              ]
            })(<InputNumber
              id={"qualityGuaranteePeriod"}
              name={"qualityGuaranteePeriod"}
              min={0}
              size={FormInputSize}
              style={{width: "100%"}}
            />)}
          </Form.Item>
          <Form.Item
            label={"备注"}
            hasFeedback
          >
            {getFieldDecorator('remarks', {})(
              <Input.TextArea
                id={"remarks"}
                name={"remarks"}
                autoSize={{ minRows: 2, maxRows: 6 }}
                placeholder={"可不填"}
              />
            )}
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

// export default GoodsAdd;
export default Form.create(
  { name: 'GoodsAdd' }
)(GoodsAdd);
