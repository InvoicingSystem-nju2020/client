import React, {useEffect, useState} from 'react';

import {Form, Row, Col, PageHeader, Input, Button, InputNumber, notification} from 'antd';
import { Table } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

import {AdvancedSearchForm} from "../../../components/advanced-search-form/AdvancedSearchForm";
import {Link} from "react-router-dom";
import {getGoods, GetGoodsParams} from "../../../api/GoodsApi";

// 表格列
const { Column } = Table;

// 商品信息
class GoodsInfo {
  goodsNumber: string
  goodsName: string
  abbreviation: string
  brand: string
  type: string
  model:string
  goodsNo: string
  material: string
  colour: string
  specifications: string
  unit: string
  weight: string
  stock: number
  buyingPrice: number
  retailPrice: number
  placeOfProduction: string
  qualityGuaranteePeriod: number
  remarks: string

  constructor(goodsNumber: string, goodsName: string, abbreviation: string, brand: string, type: string, model: string, goodsNo: string, material: string, colour: string, specifications: string, unit: string, weight: string, stock: number, buyingPrice: number, retailPrice: number, placeOfProduction: string, qualityGuaranteePeriod: number, remarks: string) {
    this.goodsNumber = goodsNumber;
    this.goodsName = goodsName;
    this.abbreviation = abbreviation;
    this.brand = brand;
    this.type = type;
    this.model = model;
    this.goodsNo = goodsNo;
    this.material = material;
    this.colour = colour;
    this.specifications = specifications;
    this.unit = unit;
    this.weight = weight;
    this.stock = stock;
    this.buyingPrice = buyingPrice;
    this.retailPrice = retailPrice;
    this.placeOfProduction = placeOfProduction;
    this.qualityGuaranteePeriod = qualityGuaranteePeriod;
    this.remarks = remarks;
  }
}

// 搜索条件
const conditions = [
  <Form.Item
    name='goodsNumber'
    label='商品编号'
  >
    <Input />
  </Form.Item>,
  <Form.Item
    name='goodsName'
    label='名称'
  >
    <Input />
  </Form.Item>,
  <Form.Item
    name='abbreviation'
    label='简称'
  >
    <Input />
  </Form.Item>,
  <Form.Item
    name='brand'
    label='品牌'
  >
    <Input />
  </Form.Item>,
  <Form.Item
    name='model'
    label='型号'
  >
    <Input />
  </Form.Item>,
  <Form.Item
    name='goodsNo'
    label='货号'
  >
    <Input />
  </Form.Item>,
  <Form.Item
    name='material'
    label='材料'
  >
    <Input />
  </Form.Item>,
  <Form.Item
    name='colour'
    label='颜色'
  >
    <Input />
  </Form.Item>,
  <Form.Item
    name='type'
    label='种类'
  >
    <Input />
  </Form.Item>,
  <Form.Item
    name='placeOfProduction'
    label='产地'
  >
    <Input />
  </Form.Item>,
  <Form.Item
    label='售价'
  >
    <Input.Group compact>
      <Form.Item name={'minRetailPrice'} noStyle>
        <InputNumber placeholder={'最低价格'} style={{width:'50%'}}/>
      </Form.Item>
      <Form.Item name={'maxRetailPrice'} noStyle>
        <InputNumber placeholder={'最高价格'} style={{width:'50%'}}/>
      </Form.Item>
    </Input.Group>
  </Form.Item>
];


function GoodsList() {
  let [data, setData] = useState<GoodsInfo[]>([]) ;  // dataSource数组
  let [loading, setLoading] = useState(true);
  let brands: string[] = ['李宁', 'victor'];   // 所有品牌
  let types: string[] = ['球拍', '球类'];   // 所有商品种类
  let placesOfProduction: string[] = ['中国', '日本'];   // 所有商品种类

  const [params, setParams] = useState<GetGoodsParams>({});  // 搜索筛选参数

  let pageSize: number = 20;

  // 获取商品列表
  function getGoodsList() {
    // let temp:GoodsInfo[] = [
    //   new GoodsInfo('xxxxxxxx', '室内器材', '网球拍', 'wilson', '球拍', 'pro staff', 'WRT74181U2', '碳纤维', '黑', '97(in)2/16*19', '支', '315G', 100, 1560, 2480, '中国', 6, '')
    // ];
    // setData(temp);
    // setLoading(false);
    let api = getGoods(params);
    setLoading(true);
    api.then(response => {
      console.log(response);
      let list = response.data.goodsList;
      setData(list);
    }).catch(reason => {
      console.error(reason);
      notification.error({message: '发生了错误', description: reason.toString()});
    }).finally(() => {
      setLoading(false);
    });
  }
  // 加载时获取一次商品列表
  useEffect(() => {
    getGoodsList();
  }, []);

  // 处理表格变化
  function handleTableChange (pagination:any, filters:any, sorter:any) {
    console.log(filters);
    console.log(sorter);
    // 品牌筛选
    if(filters.brand){
      if(filters.brand.length >= 1){
        params.brand = filters.brand;
      }else{  // 全部
        params.brand = undefined;
      }
    }
    // 种类筛选
    if(filters.type){
      if(filters.type.length >= 1){
        params.type = filters.type;
      }else{  // 全部
        params.type = undefined;
      }
    }
    // 产地筛选
    if(filters.placeOfProduction){
      if(filters.placeOfProduction.length >= 1){
        params.place = filters.placeOfProduction;
      }else{  // 全部
        params.place = undefined;
      }
    }
    // 排序
    params.sorter = sorter.field;
    params.desc = sorter.order === 'descend' ? 1 : 0;
    console.log(params);
    // 获取列表
    getGoodsList();
  }

  // 处理搜索栏
  function onSearchFormFinish(name: string, info: any) {
    console.log(info);
    // 组装数据
    // 改成数组形式符合接口
    if(info.values.brand){
      info.values.brand = [info.values.brand];
    }
    if(info.values.type){
      info.values.type = [info.values.type];
    }
    if(info.values.placeOfProduction){
      info.values.place = [info.values.placeOfProduction];
      info.values.placeOfProduction = undefined;  // 接口中使用place而不是placeOfProduction
    }

    Object.assign(params, info.values);
    console.log("params", params);
    // 获取列表
    getGoodsList();
  }

  return(
    <div>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="商品列表"
        extra={[
          <Button key="addBtn" size={"large"} type="primary" href={"add"}>
            <PlusOutlined /> 录入商品
          </Button>,
        ]}
      >
      </PageHeader>
      <div className={"ContentContainer"}>
        <div>
          <Form.Provider onFormFinish={onSearchFormFinish}>
            <AdvancedSearchForm conditions={conditions}/>
          </Form.Provider>
        </div>
        <Table dataSource={data} rowKey={'goodsNumber'} pagination={{ pageSize: pageSize }} loading={loading}
               onChange={handleTableChange}
               expandable={{
                 expandedRowRender: info =>
                   <Row>
                     <Col xs={24} sm={8}>
                       <Row gutter={18}>
                         <Col><b>材料:</b> </Col>
                         <Col>{info.material}</Col>
                       </Row>
                     </Col>
                     <Col xs={24} sm={8}>
                       <Row gutter={18}>
                         <Col><b>规格:</b> </Col>
                         <Col>{info.specifications}</Col>
                       </Row>
                     </Col>
                     <Col xs={24} sm={8}>
                       <Row gutter={18}>
                         <Col><b>单位:</b> </Col>
                         <Col>{info.unit}</Col>
                       </Row>
                     </Col>
                     <Col xs={24} sm={24}>
                       <Row gutter={18}>
                         <Col><b>备注:</b> </Col>
                         <Col>{info.remarks === '' ? '无' : info.remarks}</Col>
                       </Row>
                     </Col>
                   </Row>
               }}
        >
          <Column title={"商品编号"} dataIndex={"goodsNumber"} sorter={true}/>
          <Column title={"名称"} dataIndex={"goodsName"} sorter={true}/>
          <Column title={"简称"} dataIndex={"abbreviation"} sorter={true}/>
          <Column title={"品牌"} dataIndex={"brand"} sorter={true}
                  filters={ brands.map(value => {return { text: value, value: value}} ) }
          />
          <Column title={"种类"} dataIndex={"type"} sorter={true}
                  filters={ types.map(value => {return { text: value, value: value}} ) }
          />
          <Column title={"型号"} dataIndex={"model"}/>
          <Column title={"货号"} dataIndex={"goodsNo"}/>
          <Column title={"材料"} dataIndex={"material"}/>
          <Column title={"颜色"} dataIndex={"colour"} sorter={true}/>
          {/*<Column title={"规格"} dataIndex={"specifications"}/>*/}
          {/*<Column title={"单位"} dataIndex={"unit"}/>*/}
          <Column title={"重量"} dataIndex={"weight"}/>
          <Column title={"产地"} dataIndex={"placeOfProduction"} sorter={true}
                  filters={ placesOfProduction.map(value => {return { text: value, value: value}} ) }
          />
          <Column title={"保质期/月"} dataIndex={"qualityGuaranteePeriod"} sorter={true}/>
          {/*<Column title={"备注"} dataIndex={"remarks"} width={'8rem'}/>*/}
          <Column title={"库存"} dataIndex={"stock"}/>
          <Column title={"进货价"} dataIndex={"buyingPrice"} />
          <Column title={"零售价"} dataIndex={"retailPrice"}/>
          <Column title={""} fixed={'right'} align={'center'}
                  render={ (info) => <Link to={'/goods/edit/'+info.goodsNumber}><EditOutlined /></Link> }
          />
        </Table>
      </div>
    </div>
  );
}

export default GoodsList;