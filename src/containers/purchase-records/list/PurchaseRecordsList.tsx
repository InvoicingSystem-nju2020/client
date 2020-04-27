import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import {Form, Row, Col, PageHeader, Input, Button, InputNumber} from 'antd';
import { Table } from 'antd';
import { DatePicker } from 'antd';
import 'moment/locale/zh-cn';

import { EditOutlined, AccountBookOutlined } from '@ant-design/icons';

import {AdvancedSearchForm} from "../../../components/advanced-search-form/AdvancedSearchForm";
import { DateFormat } from "../../../util/ComponentsUtil";

// 表格列
const { Column } = Table;
// 日期区间选择
const { RangePicker } = DatePicker;

// 商品信息
class PurchaseRecordInfo {
  id: string
  purchaseTime: string
  createTime: string
  goodsNumber: string
  brand: string
  abbreviation: string
  model: string
  goodsNo: string
  material: string
  unit: string
  numbers: number
  retailPrice: number
  discount: number
  unitPrice: number
  totalAmount: number
  taxIncluded: string
  precautionsForPreservation: string
  remarks: string
  supplierNumber: string
  supplierName: string

  constructor(id: string, purchaseTime: string, createTime: string, goodsNumber: string, brand: string, abbreviation: string, model: string, goodsNo: string, material: string, unit: string, numbers: number, retailPrice: number, discount: number, unitPrice: number, totalAmount: number, taxIncluded: string, precautionsForPreservation: string, remarks: string, supplierNumber: string, supplierName: string) {
    this.id = id;
    this.purchaseTime = purchaseTime;
    this.createTime = createTime;
    this.goodsNumber = goodsNumber;
    this.brand = brand;
    this.abbreviation = abbreviation;
    this.model = model;
    this.goodsNo = goodsNo;
    this.material = material;
    this.unit = unit;
    this.numbers = numbers;
    this.retailPrice = retailPrice;
    this.discount = discount;
    this.unitPrice = unitPrice;
    this.totalAmount = totalAmount;
    this.taxIncluded = taxIncluded;
    this.precautionsForPreservation = precautionsForPreservation;
    this.remarks = remarks;
    this.supplierNumber = supplierNumber;
    this.supplierName = supplierName;
  }
}

// 搜索条件
const conditions = [
  <Form.Item
    name='purchaseTime'
    label='进货时间'
  >
    <RangePicker
      allowEmpty={[true, true]}
      format={DateFormat.dateFormat}
      allowClear
      style={{width: '100%', textAlign: 'center'}}
    />
  </Form.Item>,
  <Form.Item
    name='createTime'
    label='创建时间'
  >
    <RangePicker
      allowEmpty={[true, true]}
      format={DateFormat.dateFormat}
      allowClear
      style={{width: '100%', textAlign: 'center'}}
    />
  </Form.Item>,
  <Form.Item
    name='goodsNumber'
    label='商品编号'
  >
    <Input />
  </Form.Item>,
  <Form.Item
    name='abbreviation'
    label='品名'
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
    name='supplier'
    label='供应商'
  >
    <Input />
  </Form.Item>,
  <Form.Item
    label='数量'
  >
    <Input.Group compact>
      <InputNumber name={'minNumbers'} placeholder={'最小数量'} style={{width:'50%'}}/>
      <InputNumber name={'maxNumbers'} placeholder={'最大数量'} style={{width:'50%'}}/>
    </Input.Group>
  </Form.Item>,
  <Form.Item
    label='零售价'
  >
    <Input.Group compact>
      <InputNumber name={'minRetailPrice'} placeholder={'最低零售价'} style={{width:'50%'}}/>
      <InputNumber name={'maxRetailPrice'} placeholder={'最高零售价'} style={{width:'50%'}}/>
    </Input.Group>
  </Form.Item>,
  <Form.Item
    label='总金额'
  >
    <Input.Group compact>
      <InputNumber name={'minTotalAmount'} placeholder={'最低总金额'} style={{width:'50%'}}/>
      <InputNumber name={'maxRetailPrice'} placeholder={'最高总金额'} style={{width:'50%'}}/>
    </Input.Group>
  </Form.Item>,
  <Form.Item
    label='折扣'
  >
    <Input.Group compact>
      <InputNumber name={'minDiscount'} placeholder={'最低折扣'} style={{width:'50%'}}/>
      <InputNumber name={'maxDiscount'} placeholder={'最高折扣'} style={{width:'50%'}}/>
    </Input.Group>
  </Form.Item>
];


function PurchaseRecordsList() {
  let [data, setData] = useState<PurchaseRecordInfo[]>([]) ;  // dataSource数组
  let [loading, setLoading] = useState(true);
  let types: string[] = ['团购', '批发'];   // 所有商品种类

  let pageSize: number = 20;

  // 获取商品列表
  function getPurchaseRecordsList() {
    let temp:PurchaseRecordInfo[] = [
      new PurchaseRecordInfo('PR00000001', '2019/04', '2019/04/26',
        'xxxxxxxx', 'wilson', '网球拍', 'pro staff',
        'WRT74181U2', '碳纤维', '支', 24, 2480, 0.5,
        1240, 29760, '是', '防晒防潮',
        '', 'AMER001', 'amer')
    ];
    setData(temp);
    setLoading(false);
  }
  // 加载时获取一次商品列表
  useEffect(() => {
    getPurchaseRecordsList();
  }, []);

  // 处理表格变化
  function handleTableChange (pagination:any, filters:any, sorter:any) {

  }

  return(
    <div>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="进货记录列表"
        extra={[
          <Button key="addBtn" size={"large"} type="primary" href={"add"}>
            录入进货记录
          </Button>,
        ]}
      >
      </PageHeader>
      <div className={"ContentContainer"}>
        <div>
          <AdvancedSearchForm conditions={conditions}/>
        </div>
        <Table dataSource={data} rowKey={'id'} pagination={{ pageSize: pageSize }} loading={loading}
               onChange={handleTableChange}
               expandable={{
                 expandedRowRender: info =>
                   <Row>
                     <Col xs={24} sm={8}>
                       <Row gutter={18}>
                         <Col><b>商品编号:</b> </Col>
                         <Col>{info.goodsNumber}</Col>
                       </Row>
                     </Col>
                     <Col xs={24} sm={8}>
                       <Row gutter={18}>
                         <Col><b>品牌:</b> </Col>
                         <Col>{info.brand}</Col>
                       </Row>
                     </Col>
                     <Col xs={24} sm={8}>
                       <Row gutter={18}>
                         <Col><b>品名:</b> </Col>
                         <Col>{info.abbreviation}</Col>
                       </Row>
                     </Col>
                     <Col xs={24} sm={8}>
                       <Row gutter={18}>
                         <Col><b>型号:</b> </Col>
                         <Col>{info.model}</Col>
                       </Row>
                     </Col>
                     <Col xs={24} sm={8}>
                       <Row gutter={18}>
                         <Col><b>货号:</b> </Col>
                         <Col>{info.goodsNo}</Col>
                       </Row>
                     </Col>
                     <Col xs={24} sm={8}>
                       <Row gutter={18}>
                         <Col><b>材料:</b> </Col>
                         <Col>{info.material}</Col>
                       </Row>
                     </Col>
                     <Col xs={24} sm={24}>
                       <Row gutter={18}>
                         <Col><b>保存注意事项:</b> </Col>
                         <Col>{info.remarks === '' ? '无' : info.remarks}</Col>
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
          <Column title={"进货时间"} dataIndex={"purchaseTime"} sorter={true}/>
          <Column title={"商品编号"} dataIndex={"goodsNumber"} sorter={true}/>
          <Column title={"品牌"} dataIndex={"brand"} sorter={true}/>
          <Column title={"品名"} dataIndex={"abbreviation"} sorter={true}/>
          <Column title={"数量"} dataIndex={"numbers"} sorter={true}/>
          <Column title={"零售价"} dataIndex={"retailPrice"} sorter={true}/>
          <Column title={"折扣"} dataIndex={"discount"} sorter={true}/>
          <Column title={"单价"} dataIndex={"unitPrice"} sorter={true}/>
          <Column title={"金额"} dataIndex={"totalAmount"} sorter={true}/>
          <Column title={"是否含税"} dataIndex={"taxIncluded"} sorter={true}/>
          <Column title={"供应商"} dataIndex={"supplierName"} sorter={true}/>
          <Column title={"创建时间"} dataIndex={"createTime"} sorter={true}/>
          <Column title={""} fixed={'right'}
                  render={ (info) => <Link to={'/purchase-records/edit/'+info.id}><EditOutlined /></Link> }
          />
        </Table>
      </div>
    </div>
  );
}

export default PurchaseRecordsList;