import React, {useEffect, useState} from 'react';

import { Form, Row, Col, PageHeader, Input, Button } from 'antd';
import { Table } from 'antd';
import { EditOutlined, AccountBookOutlined } from '@ant-design/icons';

import {AdvancedSearchForm, Condition} from "../../../components/AdvancedSearchForm/AdvancedSearchForm";
import {Link} from "react-router-dom";

// 表格列
const { Column } = Table;

// 商品信息
class SuppliersInfo {
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
const conditions:Condition[] = [
  {label:'编号', name:'suppliersNumber'}, {label:'名称', name: 'suppliersName'},
  {label:'生产类别', name: 'productionCategory'}, {label:'采购类别', name:'purchasingCategories'}
];
const priceConditions:Condition[] = [];


function SuppliersList() {
  let [data, setData] = useState<SuppliersInfo[]>([]) ;  // dataSource数组
  let [loading, setLoading] = useState(true);

  let pageSize: number = 20;

  // 获取商品列表
  function getSuppliersList() {
    let temp:SuppliersInfo[] = [
      new SuppliersInfo('LINING', '李宁（北京）体育用品有限公司', '18000000000', '一般合作商', '运动鞋服、体育器材', '羽球系列', '李宁', '陈叶', '男', '区域经理', 'xxx@a.com')
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
            录入供应商
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
               // expandable={{
               //   expandedRowRender: info =>
               //     <Row>
               //       <Col xs={24} sm={8}>
               //         <Row gutter={18}>
               //           <Col><b>材料:</b> </Col>
               //           <Col>{info.material}</Col>
               //         </Row>
               //       </Col>
               //       <Col xs={24} sm={8}>
               //         <Row gutter={18}>
               //           <Col><b>规格:</b> </Col>
               //           <Col>{info.specifications}</Col>
               //         </Row>
               //       </Col>
               //       <Col xs={24} sm={8}>
               //         <Row gutter={18}>
               //           <Col><b>单位:</b> </Col>
               //           <Col>{info.unit}</Col>
               //         </Row>
               //       </Col>
               //       <Col xs={24} sm={24}>
               //         <Row gutter={18}>
               //           <Col><b>备注:</b> </Col>
               //           <Col>{info.remarks === '' ? '无' : info.remarks}</Col>
               //         </Row>
               //       </Col>
               //     </Row>
               // }}
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
          <Column title={""} fixed={'right'}
                  render={ (info) => <Link to={'/suppliers/edit/'+info.suppliersNumber}><EditOutlined /></Link> }
          />
        </Table>
      </div>
    </div>
  );
}

export default SuppliersList;