import React, {useEffect, useState} from 'react';

import { Form, Row, Col, PageHeader, Input, Button } from 'antd';
import { Table } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

import {AdvancedSearchForm} from "../../../components/advanced-search-form/AdvancedSearchForm";
import {Link} from "react-router-dom";

// 表格列
const { Column } = Table;

// 商品信息
class SupplierInfo {
  suppliersNumber: string
  suppliersName: string
  contactInformation: string
  remarks: string
  productionCategories: string
  purchasingCategories: string
  legalPerson: string
  contact: string
  sex: string
  post:string
  mail: string

  constructor(suppliersNumber: string, suppliersName: string, contactInformation: string, remarks: string, productionCategories: string, purchasingCategories: string, legalPerson: string, contact: string, sex: string, post: string, mail: string) {
    this.suppliersNumber = suppliersNumber;
    this.suppliersName = suppliersName;
    this.contactInformation = contactInformation;
    this.remarks = remarks;
    this.productionCategories = productionCategories;
    this.purchasingCategories = purchasingCategories;
    this.legalPerson = legalPerson;
    this.contact = contact;
    this.sex = sex;
    this.post = post;
    this.mail = mail;
  }
}

// 搜索条件
const conditions = [
  <Form.Item
    name='suppliersNumber'
    label='编号'
  >
    <Input />
  </Form.Item>,
  <Form.Item
    name='suppliersName'
    label='名称'
  >
    <Input />
  </Form.Item>,
  <Form.Item
    name='productionCategory'
    label='生产类别'
  >
    <Input />
  </Form.Item>,
  <Form.Item
    name='purchasingCategories'
    label='采购类别'
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


function SuppliersList() {
  let [data, setData] = useState<SupplierInfo[]>([]) ;  // dataSource数组
  let [loading, setLoading] = useState(true);

  let pageSize: number = 20;

  // 获取商品列表
  function getSuppliersList() {
    let temp:SupplierInfo[] = [
      new SupplierInfo('LINING', '李宁（北京）体育用品有限公司', '18000000000', '一般合作商', '运动鞋服、体育器材', '羽球系列', '李宁', '陈叶', '男', '区域经理', 'xxx@a.com')
    ];
    setData(temp);
    setLoading(false);
  }
  // 加载时获取一次商品列表
  useEffect(() => {
    getSuppliersList();
  }, []);

  // 处理表格变化
  function handleTableChange (pagination:any, filters:any, sorter:any) {

  }

  return(
    <div>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="供应商列表"
        extra={[
          <Button key="addBtn" size={"large"} type="primary" href={"add"}>
            <PlusOutlined /> 录入供应商
          </Button>,
        ]}
      >
      </PageHeader>
      <div className={"ContentContainer"}>
        <div>
          <AdvancedSearchForm conditions={conditions}/>
        </div>
        <Table dataSource={data} rowKey={'suppliersNumber'} pagination={{ pageSize: pageSize }} loading={loading}
               onChange={handleTableChange}
        >
          <Column title={"供应商编号"} dataIndex={"suppliersNumber"} sorter={true}/>
          <Column title={"名称"} dataIndex={"suppliersName"} sorter={true}/>
          <Column title={"生产类别"} dataIndex={"productionCategories"} sorter={true} />
          <Column title={"采购类别"} dataIndex={"purchasingCategories"}/>
          <Column title={"法人"} dataIndex={"legalPerson"}/>
          <Column title={"联系人"} dataIndex={"contact"}/>
          <Column title={"性别"} dataIndex={"sex"} sorter={true}
                  filters={ [{text: '男', value: '男'}, {text: '女', value: '女'}] }
          />
          <Column title={"职务"} dataIndex={"post"}/>
          <Column title={"联系方式"} dataIndex={"contactInformation"}/>
          <Column title={"邮箱"} dataIndex={"mail"}/>
          <Column title={"备注"} dataIndex={"remarks"}/>
          <Column title={""} fixed={'right'} align={'center'}
                  render={ (info) => <Link to={'/suppliers/edit/'+info.suppliersNumber}><EditOutlined /></Link> }
          />
        </Table>
      </div>
    </div>
  );
}

export default SuppliersList;