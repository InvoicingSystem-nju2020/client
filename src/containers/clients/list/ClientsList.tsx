import React, {useEffect, useState} from 'react';

import {Form, Row, Col, PageHeader, Input, Button, notification} from 'antd';
import { Table } from 'antd';
import { EditOutlined, AccountBookOutlined, PlusOutlined } from '@ant-design/icons';

import {AdvancedSearchForm} from "../../../components/advanced-search-form/AdvancedSearchForm";
import {Link} from "react-router-dom";
import {GetClientParams, getClients} from "../../../api/ClientApi";

// 表格列
const { Column } = Table;

// 商品信息
class ClientInfo {
  clientsNumber: string
  clientsName: string
  clientsType: string
  clientsContact: string
  clientsSex: string
  clientsPost:string
  contactInformation: string
  mail: string
  remarks: string
  other: string

  constructor(clientsNumber: string, clientsName: string, clientsType: string, clientsContact: string, clientsSex: string, clientsPost: string, contactInformation: string, mail: string, remarks: string, other: string) {
    this.clientsNumber = clientsNumber;
    this.clientsName = clientsName;
    this.clientsType = clientsType;
    this.clientsContact = clientsContact;
    this.clientsSex = clientsSex;
    this.clientsPost = clientsPost;
    this.contactInformation = contactInformation;
    this.mail = mail;
    this.remarks = remarks;
    this.other = other;
  }
}

// 搜索条件
const conditions = [
  <Form.Item
    name='clientsNumber'
    label='客户编号'
  >
    <Input />
  </Form.Item>,
  <Form.Item
    name='clientsName'
    label='客户名称'
  >
    <Input />
  </Form.Item>,
  <Form.Item
    name='clientsType'
    label='类型'
  >
    <Input />
  </Form.Item>,
  <Form.Item
    name='contact'
    label='联系人'
  >
    <Input />
  </Form.Item>,
  <Form.Item
    name='contactInformation'
    label='联系方式'
  >
    <Input />
  </Form.Item>,
  <Form.Item
    name='mail'
    label='邮箱'
  >
    <Input />
  </Form.Item>
];


function ClientsList() {
  let [data, setData] = useState<ClientInfo[]>([]) ;  // dataSource数组
  let [loading, setLoading] = useState(true);
  let types: string[] = ['团购', '批发'];   // 所有客户类型

  const [params, setParams] = useState<GetClientParams>({});  // 搜索筛选参数

  let pageSize: number = 20;

  // 获取商品列表
  function getClientsList() {
    let api = getClients(params);
    setLoading(true);
    api.then(response => {
      console.log(response);
      let list = response.data.clientsList;
      setData(list);
    }).catch(reason => {
      console.error(reason);
      notification.error({message: '发生了错误', description: reason.toString()});
    }).finally(() => {
      setLoading(false);
    });
    // let temp:ClientInfo[] = [
    //   new ClientInfo('TFS2010-001', '江苏省网球协会', '团购', '胡', '男', '网协主席', '18000000000', 'xxx@a.com', '已退休', '')
    // ];
    // setData(temp);
    // setLoading(false);
  }
  // 加载时获取一次商品列表
  useEffect(() => {
    getClientsList();
  }, []);

  // 处理表格变化
  function handleTableChange (pagination:any, filters:any, sorter:any) {
    console.log(filters);
    console.log(sorter);
    // 客户类型筛选
    if(filters.clientsType){
      if(filters.clientsType.length >= 1){
        params.clientsType = filters.clientsType;
      }else{  // 全部
        params.clientsType = undefined;
      }
    }
    // 性别筛选, 字段与接口不太吻合，调整
    if(filters.clientsSex){
      if(filters.clientsSex.length === 1){
        params.sex = filters.clientsSex[0] === '男' ? 1 : 2;
      }else{  // 男和女，即全部
        params.sex = 0;
      }
    }
    // 排序
    params.sorter = sorter.field;
    params.desc = sorter.order === 'descend' ? 1 : 0;
    console.log(params);
    // 获取列表
    getClientsList();
  }

  // 处理搜索栏
  function onSearchFormFinish(name: string, info: any) {
    console.log(info);
    // 组装数据
    // 类型转为数组，符合接口
    if(info.values.clientsType){
      info.values.clientsType = [info.values.clientsType];
    }
    Object.assign(params, info.values);
    console.log("params", params);
    // 获取列表
    getClientsList();
  };

  return(
    <div>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="客户列表"
        extra={[
          <Button key="addBtn" size={"large"} type="primary" href={"add"}>
            <PlusOutlined /> 录入客户
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
        <Table dataSource={data} rowKey={'clientsNumber'} pagination={{ pageSize: pageSize }} loading={loading}
               onChange={handleTableChange}
        >
          <Column title={"客户编号"} dataIndex={"clientsNumber"} sorter={true}/>
          <Column title={"客户名称"} dataIndex={"clientsName"} sorter={true}/>
          <Column title={"类型"} dataIndex={"clientsType"} sorter={true}
                  filters={ types.map(value => {return { text: value, value: value}} ) }
          />
          <Column title={"联系人"} dataIndex={"clientsContact"}/>
          <Column title={"性别"} dataIndex={"clientsSex"} sorter={true}
                  filters={ [{text: '男', value: '男'}, {text: '女', value: '女'}] }
          />
          <Column title={"职务"} dataIndex={"clientsPost"}/>
          <Column title={"联系方式"} dataIndex={"contactInformation"}/>
          <Column title={"邮箱"} dataIndex={"mail"}/>
          <Column title={"备注"} dataIndex={"remarks"}/>
          <Column title={"其他"} dataIndex={"other"}/>
          <Column title={"汇款信息"} fixed={'right'} align={'center'}
                  render={ (info) => <Link to={'/clients/balance-records/'+info.clientsNumber}><AccountBookOutlined /></Link> }
          />
          <Column title={""} fixed={'right'} align={'center'}
                  render={ (info) => <Link to={'/clients/edit/'+info.clientsNumber}><EditOutlined /></Link> }
          />
        </Table>
      </div>
    </div>
  );
}

export default ClientsList;