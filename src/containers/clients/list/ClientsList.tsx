import React, {useEffect, useState} from 'react';

import { Form, Row, Col, PageHeader, Input, Button } from 'antd';
import { Table } from 'antd';
import { EditOutlined, AccountBookOutlined } from '@ant-design/icons';

import {AdvancedSearchForm, Condition} from "../../../components/AdvancedSearchForm/AdvancedSearchForm";
import {Link} from "react-router-dom";

// 表格列
const { Column } = Table;

// 商品信息
class ClientsInfo {
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
const conditions:Condition[] = [
  {label:'客户编号', name:'clientsNumber'}, {label:'客户名称', name: 'clientsName'}, {label:'类型', name: 'clientsType'},
  {label:'联系人', name:'clientsContact'}, {label:'联系方式', name: 'contactInformation'}, {label:'邮箱', name: 'mail'},
];
const priceConditions:Condition[] = [];


function ClientsList() {
  let [data, setData] = useState<ClientsInfo[]>([]) ;  // dataSource数组
  let [loading, setLoading] = useState(true);
  let brands: string[] = ['李宁', 'victor'];   // 所有品牌
  let types: string[] = ['球拍', '球类'];   // 所有商品种类
  let placesOfProduction: string[] = ['中国', '日本'];   // 所有商品种类

  let pageSize: number = 20;

  // 获取商品列表
  function getClientsList() {
    let temp:ClientsInfo[] = [
      new ClientsInfo('TFS2010-001', '江苏省网球协会', '团购', '胡', '男', '网协主席', '18000000000', 'xxx@a.com', '已退休', '')
    ];
    setData(temp);
    setLoading(false);
  }
  // 加载时获取一次商品列表
  useEffect(() => {
    getClientsList();
  }, []);

  // 处理表格变化
  function handleTableChange (pagination:any, filters:any, sorter:any) {

  }

  return(
    <div>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="客户列表"
        extra={[
          <Button key="addBtn" size={"large"} type="primary" href={"add"}>
            录入客户
          </Button>,
        ]}
      >
      </PageHeader>
      <div className={"ContentContainer"}>
        <div>
          <AdvancedSearchForm conditions={conditions} priceConditions={priceConditions}/>
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
                  render={ (info) => <Link to={'/clients/remittance/'+info.clientsNumber}><AccountBookOutlined /></Link> }
          />
          <Column title={""} fixed={'right'}
                  render={ (info) => <Link to={'/clients/edit/'+info.clientsNumber}><EditOutlined /></Link> }
          />
        </Table>
      </div>
    </div>
  );
}

export default ClientsList;