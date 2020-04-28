import React, {useState} from "react";

import {Input, AutoComplete, Col, Row, Form, Card} from 'antd';
import { SelectProps } from 'antd/es/select';
import {FormInputSize} from "../../util/ComponentsUtil";
import {FormItemProps} from "antd/es/form";


class GoodsInfo{
  goodsNumber: string
  goodsName: string
  abbreviation: string
  brand: string
  model:string
  goodsNo: string
  material: string
  unit: string

  constructor(goodsNumber: string, goodsName: string, abbreviation: string, brand: string, model: string, goodsNo: string, material: string, unit: string) {
    this.goodsNumber = goodsNumber;
    this.goodsName = goodsName;
    this.abbreviation = abbreviation;
    this.brand = brand;
    this.model = model;
    this.goodsNo = goodsNo;
    this.material = material;
    this.unit = unit;
  }
}


const GoodsSearchAndShowByNumber: React.FC = () => {
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);
  const [goodsInfosResult, setGoodsInfosResult] = useState<GoodsInfo[]>([]);
  const [selectedGoodsNumber, setSelectedGoodsNumber] = useState<string>('');
  const [validateStatus, setValidateStatus] = useState<FormItemProps['validateStatus']>('');

  // 展示搜索结果
  const searchResult = (query: string) => {
    const result = [
      new GoodsInfo('WQP00001', '室内器材',
        '网球拍', 'wilson', 'pro staff', 'WRT74181U2', '碳纤维', '支'),
      new GoodsInfo('YQP00001', '室内器材',
        '羽球拍', 'YONEX', 'VTLD-F', 'YY1032987', '碳纤维', '支'),
      new GoodsInfo('YMQ00001', '室内耗材',
        '羽毛球', 'LINING', 'A+90', 'AYQD016-1', '鹅毛', '个')
    ];
    setGoodsInfosResult(result);
    return result.map((item, index) => {
      return {
        value: item.goodsNumber,
        label: (
          <Row>
            <Col xs={24} sm={10}>
              {item.goodsNumber}
            </Col>
            <Col xs={24} sm={5}>
              {item.abbreviation}
            </Col>
            <Col xs={24} sm={4}>
              {item.brand}
            </Col>
            <Col xs={24} sm={5}>
              {item.model}
            </Col>
          </Row>
        )
      }
    });
  };

  // 处理搜索输入
  const handleSearch = (value: string) => {
    if(value) {
      let results = searchResult(value);
      setOptions(results);
      if(results.length > 0 && results[0].value === value){    // 当输入的值就是搜索后最匹配的值时
        selectAndShow(value);
      }
      else {
        setValidateStatus('error');
      }
    }
    else{
      setOptions([]);
      setValidateStatus('error');
    }
  };

  // 处理选择
  const onSelect = (value: string) => {
    console.log('onSelect', value);
    selectAndShow(value);
  };

  // 选择一个商品后显示信息
  const selectAndShow = (selectedGoodsNumber: string) => {
    setValidateStatus('success');   // 设置表单校验状态
    setSelectedGoodsNumber(selectedGoodsNumber);    // 选中了这个GoodsInfo
  }

  const getAndShowGoodsInfo = () => {
    if(validateStatus === 'success'){   // 已经选择
      // 找到对应的GoodsInfo
      let info = goodsInfosResult[0];
      for (let i = 0; i < goodsInfosResult.length; i++) {
        if(goodsInfosResult[i].goodsNumber === selectedGoodsNumber){
          info = goodsInfosResult[i];
        }
      }
      // 返回渲染
      return (
        <Row>
          <Col span={24}>
            <Row gutter={18}>
              <Col span={8}><b>商品编号:</b> </Col>
              <Col>{info.goodsNumber}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={18}>
              <Col span={8}><b>商品名称:</b> </Col>
              <Col>{info.goodsName}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={18}>
              <Col span={8}><b>简称:</b> </Col>
              <Col>{info.abbreviation}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={18}>
              <Col span={8}><b>品牌:</b> </Col>
              <Col>{info.brand}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={18}>
              <Col span={8}><b>型号:</b> </Col>
              <Col>{info.model}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={18}>
              <Col span={8}><b>货号:</b> </Col>
              <Col>{info.goodsNo}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={18}>
              <Col span={8}><b>材料:</b> </Col>
              <Col>{info.material}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={18}>
              <Col span={8}><b>单位:</b> </Col>
              <Col>{info.unit}</Col>
            </Row>
          </Col>
        </Row>
      )
    }
    else {
      return (
        <div style={{textAlign: 'center'}}>
          请输入商品编号并选择一个商品
        </div>
      )
    }
  }

  return (
    <Form.Item
      label={"商品编号"}
    >
      <Form.Item
        name={"goodsNumber"}
        hasFeedback
        validateStatus={validateStatus}
        rules={[
          {
            required: true,
            message: '请输入商品编号',
          }
        ]}
      >
        <AutoComplete
          options={options}
          onSelect={onSelect}
          onSearch={handleSearch}
        >
          <Input.Search size={FormInputSize} placeholder="输入商品编号搜索" />
        </AutoComplete>
      </Form.Item>
      <Card style={{marginTop: '1rem', height: '15rem', overflow: 'auto'}}>
        {getAndShowGoodsInfo()}
      </Card>
    </Form.Item>
  );
};

export default GoodsSearchAndShowByNumber;