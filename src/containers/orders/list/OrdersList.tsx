import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import {Form, Row, Col, PageHeader, Input, Button, InputNumber, Popconfirm, Select, Popover, notification} from 'antd';
import { Table } from 'antd';
import { DatePicker } from 'antd';
import 'moment/locale/zh-cn';

import { EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import {AdvancedSearchForm} from "../../../components/advanced-search-form/AdvancedSearchForm";
import { DateFormat } from "../../../util/ComponentsUtil";
import {getPurchaseRecords, GetPurchaseRecordsParams} from "../../../api/PurchaseRecordApi";
import {getOrders, GetOrdersParams} from "../../../api/OrderApi";

// 表格列
const { Column } = Table;
// 日期区间选择
const { RangePicker } = DatePicker;

// 商品信息
class OrderInfo {
  orderNumber: string;  // 订单编号
  state: string;  // 订单状态
  createTime: string; // 创建时间
  dealTime: string; // 成交时间
  clientName: string; //客户名称
  salesPerson: string;  // 销售员
  writeAnInvoice: number; // 是否开票
  goodsNumber: string;  // 商品编号
  brand: string;  // 品牌
  goodsName: string;  // 商品名称
  goodsNo: string;  // 货号
  retailPrice: number; // 零售价
  discount: number; // 折扣
  finalPrice: number; // 成交价
  unit: string; // 单位
  numbers: number;  //数量
  totalAmount: number;  // 总金额
  typeOfPayment: string;  // 付款方式
  typeOfShipping: string; // 运输方式

  constructor(orderNumber: string, state: string, createTime: string, dealTime: string, clientName: string, salesPerson: string, writeAnInvoice: number, goodsNumber: string, brand: string, goodsName: string, goodsNo: string, retailPrice: number, discount: number, finalPrice: number, unit: string, numbers: number, totalAmount: number, typeOfPayment: string, typeOfShipping: string) {
    this.orderNumber = orderNumber;
    this.state = state;
    this.createTime = createTime;
    this.dealTime = dealTime;
    this.clientName = clientName;
    this.salesPerson = salesPerson;
    this.writeAnInvoice = writeAnInvoice;
    this.goodsNumber = goodsNumber;
    this.brand = brand;
    this.goodsName = goodsName;
    this.goodsNo = goodsNo;
    this.retailPrice = retailPrice;
    this.discount = discount;
    this.finalPrice = finalPrice;
    this.unit = unit;
    this.numbers = numbers;
    this.totalAmount = totalAmount;
    this.typeOfPayment = typeOfPayment;
    this.typeOfShipping = typeOfShipping;
  }
}

// 搜索条件
const conditions = [
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
    name='orderNumber'
    label='订单编号'
  >
    <Input />
  </Form.Item>,
  <Form.Item
    name='goodsNumber'
    label='商品编号'
  >
    <Input />
  </Form.Item>,
  <Form.Item
    name='goodsName'
    label='品名'
  >
    <Input />
  </Form.Item>,
  <Form.Item
    name='clientName'
    label='客户名称'
  >
    <Input />
  </Form.Item>,
  <Form.Item
    name='salesPerson'
    label='销售员'
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
    label='总金额'
  >
    <Input.Group compact>
      <Form.Item name={'minTotalAmount'} noStyle>
        <InputNumber placeholder={'最低总金额'} style={{width:'50%'}}/>
      </Form.Item>
      <Form.Item name={'maxTotalAmount'} noStyle>
        <InputNumber placeholder={'最高总金额'} style={{width:'50%'}}/>
      </Form.Item>
    </Input.Group>
  </Form.Item>
];


function OrdersList() {
  let [data, setData] = useState<OrderInfo[]>([]) ;  // dataSource数组
  let [loading, setLoading] = useState(true);
  let orderStates: string[] = ['已售', '赊账中', '已到账']; // 订单的状态
  // 获取list的筛选参数
  const [params, setParams] = useState<GetOrdersParams>({});

  let pageSize: number = 20;

  // 获取商品列表
  function getOrdersList() {
    let api = getOrders(params);
    setLoading(true);
    api.then(response => {
      console.log(response);
      let list = response.data.ordersList;
      setData(list);
    }).catch(reason => {
      console.error(reason);
      notification.error({message: '发生了错误', description: reason.toString()});
    }).finally(() => {
      setLoading(false);
    });
    // let temp:OrderInfo[] = [
    //   new OrderInfo('xx00000001', '已售', '2019/04/26',
    //     '12:07', '南京海关', '张三', 1,
    //     'YQP00001', 'LINING', '羽球拍', 'WRT74181U2', 2480, 0.5,
    //     1240, '支', 4, 4960, '预付', '自提')
    // ];
    // setData(temp);
    // setLoading(false);
  }
  // 加载时获取一次商品列表
  useEffect(() => {
    getOrdersList();
  }, []);

  // 处理表格变化
  function handleTableChange (pagination:any, filters:any, sorter:any) {
    console.log(filters);
    console.log(sorter);
    // 是否含税筛选
    if(filters.state){
      if(filters.state.length >= 1){
        params.state = filters.state;
      }else{  // 含税和不含税，即全部
        params.state = undefined;
      }
    }
    // 是否开发票筛选
    if(filters.writeAnInvoice){
      if(filters.writeAnInvoice.length === 1){
        params.writeAnInvoice = filters.writeAnInvoice[0];
      }else{  // 含税和不含税，即全部
        params.writeAnInvoice = undefined;
      }
    }
    // 排序
    params.sorter = sorter.field;
    params.desc = sorter.order === 'descend' ? 1 : 0;

    console.log(params);
    // 获取列表
    getOrdersList();
  }

  // 处理搜索栏
  function onSearchFormFinish(name: string, info: any) {
    console.log(info);
    // 组装数据
    // 处理日期区间
    let createTime: any[] = info.values.createTime;
    if(createTime){
      info.values.startTime = createTime[0] === null ? undefined : createTime[0].format(DateFormat.dateFormat);
      info.values.endTime = createTime[1] === null ? undefined : createTime[1].format(DateFormat.dateFormat);
      info.values.createTime = undefined;
    }

    Object.assign(params, info.values);
    console.log("params", params);
    // 获取列表
    getOrdersList();
  }

  return(
    <div>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="订单列表"
        extra={[
          <Button key="addBtn" size={"large"} type="primary" href={"add"}>
            录入订单
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
        <Table dataSource={data} rowKey={'orderNumber'} pagination={{ pageSize: pageSize }} loading={loading}
               onChange={handleTableChange}
               rowSelection={{
                 fixed: true,
                 type: 'checkbox'
               }}
               expandable={{
                 expandedRowRender: info =>
                   <Row>
                     <Col xs={24} sm={8}>
                       <Row gutter={18}>
                         <Col><b>货号:</b> </Col>
                         <Col>{info.goodsNo}</Col>
                       </Row>
                     </Col>
                     <Col xs={24} sm={8}>
                       <Row gutter={18}>
                         <Col><b>零售价:</b> </Col>
                         <Col>{info.retailPrice}</Col>
                       </Row>
                     </Col>
                     <Col xs={24} sm={8}>
                       <Row gutter={18}>
                         <Col><b>折扣:</b> </Col>
                         <Col>{info.discount}</Col>
                       </Row>
                     </Col>
                     <Col xs={24} sm={8}>
                       <Row gutter={18}>
                         <Col><b>成交价:</b> </Col>
                         <Col>{info.finalPrice}</Col>
                       </Row>
                     </Col>
                     <Col xs={24} sm={8}>
                       <Row gutter={18}>
                         <Col><b>单位:</b> </Col>
                         <Col>{info.unit}</Col>
                       </Row>
                     </Col>
                     <Col xs={24} sm={8}>
                       <Row gutter={18}>
                         <Col><b>数量:</b> </Col>
                         <Col>{info.numbers}</Col>
                       </Row>
                     </Col>
                     <Col xs={24} sm={8}>
                       <Row gutter={18}>
                         <Col><b>付款方式:</b> </Col>
                         <Col>{info.typeOfPayment}</Col>
                       </Row>
                     </Col>
                     <Col xs={24} sm={8}>
                       <Row gutter={18}>
                         <Col><b>运输方式:</b> </Col>
                         <Col>{info.typeOfShipping}</Col>
                       </Row>
                     </Col>
                   </Row>
               }}
        >
          <Column title={"订单编号"} dataIndex={"orderNumber"} sorter={true}/>
          <Column title={"状态"} dataIndex={"state"} sorter={true}
                  filters={ orderStates.map(value => {return({text: value, value: value})} ) }
          />
          <Column title={"创建时间"} dataIndex={"createTime"} sorter={true}/>
          <Column title={"成交时间"} dataIndex={"dealTime"} sorter={true}/>
          <Column title={"客户"} dataIndex={"clientName"} sorter={true}/>
          <Column title={"销售员"} dataIndex={"salesPerson"} sorter={true}/>
          <Column title={"商品编号"} dataIndex={"goodsNumber"} sorter={true}/>
          <Column title={"品牌"} dataIndex={"brand"} sorter={true}/>
          <Column title={"商品名称"} dataIndex={"goodsName"} sorter={true}/>
          {/*<Column title={"税"} dataIndex={"taxIncluded"} sorter={true}*/}
          {/*        filters={ [{text: '是', value: 1}, {text: '否', value: 0}] }*/}
          {/*/>*/}
          <Column title={"发票"} dataIndex={"writeAnInvoice"} sorter={true}
                  filters={ [{text: '是', value: 1}, {text: '否', value: 0}] }
                  render={value => value === 1 ? '是' : '否'}
          />
          <Column title={"总金额"} dataIndex={"totalAmount"} sorter={true}/>
          // 更新状态列
          <Column title={
                    <Popover placement="bottomRight"
                             title={
                               <span>
                                 <ExclamationCircleOutlined style={{color:'rgb(250,173,20)'}} />
                                 更新选中的订单的状态
                               </span>
                             }
                             trigger="click"
                             content={
                               <Form size={'small'}>
                                 <Form.Item name={'newState'} label={'更新为'}>
                                   <Select>
                                     <Select.Option value={'已售'}>已售</Select.Option>
                                     <Select.Option value={'赊账中'}>赊账中</Select.Option>
                                     <Select.Option value={'已到账'}>已到账</Select.Option>
                                   </Select>
                                 </Form.Item>
                                 <Form.Item noStyle>
                                   <div style={{textAlign: 'right'}}>
                                     <Button type="primary" htmlType="submit">
                                       确认
                                     </Button>
                                   </div>
                                 </Form.Item>
                               </Form>
                             }
                    >
                      <Button>批量更新</Button>
                    </Popover>
                  }
                  fixed={'right'}
                  align={'center'}
                  render={
                    (info) =>
                      <Popover placement="bottomRight"
                               title={
                                 <span>
                                 <ExclamationCircleOutlined style={{color:'rgb(250,173,20)'}} />
                                 更新该订单的状态
                               </span>
                               }
                               trigger="click"
                               content={
                                 <Form size={'small'}>
                                   <Form.Item name={'newState'} label={'更新为'}>
                                     <Select>
                                       <Select.Option value={'已售'}>已售</Select.Option>
                                       <Select.Option value={'赊账中'}>赊账中</Select.Option>
                                       <Select.Option value={'已到账'}>已到账</Select.Option>
                                     </Select>
                                   </Form.Item>
                                   <Form.Item noStyle>
                                     <div style={{textAlign: 'right'}}>
                                       <Button type="primary" htmlType="submit">
                                         确认
                                       </Button>
                                     </div>
                                   </Form.Item>
                                 </Form>
                               }
                      >
                        <Button type="link">更新状态</Button>
                      </Popover>
                  }
          />
          <Column title={""} fixed={'right'} align={'center'}
                  render={ (info) => <Link to={'/orders/edit/'+info.orderNumber}><EditOutlined /></Link> }
          />
        </Table>
      </div>
    </div>
  );
}

export default OrdersList;