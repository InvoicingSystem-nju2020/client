import React, {useEffect, useState} from 'react';

import {Form, Row, Col, PageHeader, Input, Button, InputNumber, notification, Space} from 'antd';
import { Table } from 'antd';
import { DatePicker } from 'antd';
import 'moment/locale/zh-cn';

import {AdvancedSearchForm} from "../../../components/advanced-search-form/AdvancedSearchForm";
import { DateFormat } from "../../../util/ComponentsUtil";
import {getClientBalanceRecords, GetClientBalanceRecordsParams, getClientByNumber} from "../../../api/ClientApi";

// 表格列
const { Column } = Table;
// 日期区间选择
const { RangePicker } = DatePicker;

// 商品信息
class ClientBalanceRecordsInfo {
  month: string;
  lastMonthBalance: number;
  remittanceDate: string;
  remittanceAmount: number;
  purchaseAmount: number;

  constructor(month: string, lastMonthBalance: number, remittanceDate: string, remittanceAmount: number, purchaseAmount: number) {
    this.month = month;
    this.lastMonthBalance = lastMonthBalance;
    this.remittanceDate = remittanceDate;
    this.remittanceAmount = remittanceAmount;
    this.purchaseAmount = purchaseAmount;
  }
}

// 搜索条件
const conditions = [
  <Form.Item
    name='month'
    label='月份'
  >
    <RangePicker
      allowEmpty={[true, true]}
      format={DateFormat.monthFormat}
      allowClear
      picker={'month'}
      inputReadOnly
      style={{width: '100%', textAlign: 'center'}}
    />
  </Form.Item>,
  <Form.Item
    name='remittanceDate'
    label='汇款日期'
  >
    <RangePicker
      allowEmpty={[true, true]}
      format={DateFormat.dateFormat}
      allowClear
      inputReadOnly
      style={{width: '100%', textAlign: 'center'}}
    />
  </Form.Item>,
  <Form.Item
    label='汇款金额'
  >
    <Input.Group compact>
      <Form.Item name='minRemittanceAmount' noStyle>
        <InputNumber placeholder={'最小汇款金额'} style={{width:'50%'}}/>
      </Form.Item>
      <Form.Item name='maxRemittanceAmount' noStyle>
        <InputNumber placeholder={'最大汇款金额'} style={{width:'50%'}}/>
      </Form.Item>
    </Input.Group>
  </Form.Item>,
  <Form.Item
    label='采购金额'
  >
    <Input.Group compact>
      <Form.Item name='minPurchaseAmount' noStyle>
        <InputNumber placeholder={'最小采购金额'} style={{width:'50%'}}/>
      </Form.Item>
      <Form.Item name='maxPurchaseAmount' noStyle>
        <InputNumber placeholder={'最大采购金额'} style={{width:'50%'}}/>
      </Form.Item>
    </Input.Group>
  </Form.Item>
];


function ClientBalanceRecordsList(props: any) {
  let [data, setData] = useState<ClientBalanceRecordsInfo[]>([]) ;  // dataSource数组
  let [loading, setLoading] = useState(true);
  // 获取客户编号和客户名称
  const clientsNumber: string = props.match.params.clientsNumber;
  const [clientsName, setClientsName] = useState<String>('...');
  // list的筛选参数
  const [params, setParams] = useState<GetClientBalanceRecordsParams>({});

  let pageSize: number = 20;

  // 获取商品列表
  function getClientBalanceRecordsList() {
    params.num = 1000;  // 数据量较小，一次性取完
    let api = getClientBalanceRecords(clientsNumber, params);
    setLoading(true);
    api.then(response => {
      console.log(response);
      let list = response.data.clientBalanceRecordsList;
      setData(list);
    }).catch(reason => {
      console.error(reason);
      notification.error({message: '发生了错误', description: reason.toString()});
    }).finally(() => {
      setLoading(false);
    });
  };

  // 加载时获取一次商品列表
  useEffect(() => {
    // 获取客户名称
    const api_getClient = getClientByNumber(clientsNumber);
    api_getClient.then(response => {
      setClientsName(response.data.clientsName);
    }).catch(reason => {
      setClientsName('获取客户名称失败');
      notification.error({message: '发生了错误', description: reason.toString()});
    });
    getClientBalanceRecordsList();
  }, []);

  // 处理表格变化
  function handleTableChange (pagination:any, filters:any, sorter:any) {

  }

  // 处理搜索栏
  function onSearchFormFinish(name: string, info: any) {
    console.log(info);
    // 组装数据
    // 处理日期选择
    let month: any[] = info.values.month;
    if(month){
      info.values.startMonth = month[0] === null ? undefined : month[0].format(DateFormat.monthFormat);
      info.values.endMonth = month[1] === null ? undefined : month[1].format(DateFormat.monthFormat);
      info.values.month = undefined;
    }
    let remittanceDate: any[] = info.values.remittanceDate;
    if(remittanceDate){
      info.values.startRemittanceDate = remittanceDate[0] === null ? undefined : remittanceDate[0].format(DateFormat.dateFormat);
      info.values.endRemittanceDate = remittanceDate[1] === null ? undefined : remittanceDate[1].format(DateFormat.dateFormat);
      info.values.remittanceDate = undefined;
    }

    Object.assign(params, info.values);
    console.log("params", params);
    // 获取列表
    getClientBalanceRecordsList();
  }

  return(
    <div>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={
          <Space size={"large"}>
            客户汇款信息
            <small>客户编号: {clientsNumber}</small>
            <small>客户名称: {clientsName}</small>
          </Space>
        }
      >
      </PageHeader>
      <div className={"ContentContainer"}>
        <div>
          <Form.Provider onFormFinish={onSearchFormFinish}>
            <AdvancedSearchForm conditions={conditions}/>
          </Form.Provider>
        </div>
        <Table dataSource={data} pagination={{ pageSize: pageSize }} loading={loading}
               onChange={handleTableChange}
        >
          <Column title={"月份"} dataIndex={"month"}
                  sorter={(a: ClientBalanceRecordsInfo, b: ClientBalanceRecordsInfo) => a.month.localeCompare(b.month,'zh-CN')}
          />
          <Column title={"上月结存"} dataIndex={"lastMonthBalance"}
                  sorter={(a: ClientBalanceRecordsInfo, b: ClientBalanceRecordsInfo) => a.lastMonthBalance - b.lastMonthBalance}
          />
          <Column title={"汇款日期"} dataIndex={"remittanceDate"}
                  sorter={(a: ClientBalanceRecordsInfo, b: ClientBalanceRecordsInfo) => a.remittanceDate.localeCompare(b.remittanceDate,'zh-CN')}
          />
          <Column title={"汇款金额"} dataIndex={"remittanceAmount"}
                  sorter={(a: ClientBalanceRecordsInfo, b: ClientBalanceRecordsInfo) => a.remittanceAmount - b.remittanceAmount}
          />
          <Column title={"采购金额"} dataIndex={"purchaseAmount"}
                  sorter={(a: ClientBalanceRecordsInfo, b: ClientBalanceRecordsInfo) => a.purchaseAmount - b.purchaseAmount}
          />
        </Table>
      </div>
    </div>
  );
}

export default ClientBalanceRecordsList;