import React, { useState } from 'react';

import { Form, Row, Col, PageHeader, Input, Button } from 'antd';
import { Table } from 'antd';

import AdvancedSearchForm from "../../../components/AdvancedSearchForm/AdvancedSearchForm";


// 表格列
const { Column } = Table;

// 搜索条件
const conditions = [
  {label:'商品编号', name:'goodsNumber'}, {label:'名称', name: 'name'}, {label:'简称', name: 'abbreviation'},
  {label:'品牌', name:'brand'}, {label:'型号', name: 'model'}, {label:'货号', name: 'goodsNo'},
  {label:'材料', name:'material'}, {label:'颜色', name: 'color'}, {label:'种类', name: 'type'},
  {label:'产地', name:'placeOfProduction'}
];
const priceConditions = [
  {label:'售价', name:'price'}
]


function GoodsList() {
  let data: object[] = [];  // dataSource数组
  let brands: string[] = ['李宁', 'victor'];   // 所有品牌
  let types: string[] = ['球拍', '球类'];   // 所有商品种类
  let placesOfProduction: string[] = ['中国', '日本'];   // 所有商品种类

  let pageSize: number = 20;

  return(
    <div>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="商品列表"
        extra={[
          <Button key="addBtn" size={"large"} type="primary" href={"add"}>
            录入商品
          </Button>,
        ]}
      >
      </PageHeader>
      <div className={"ContentContainer"}>
        <div>
          <AdvancedSearchForm conditions={conditions} priceConditions={priceConditions}/>
        </div>
        <Table dataSource={data} pagination={{ pageSize: pageSize }}>
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
          <Column title={"规格"} dataIndex={"specifications"}/>
          <Column title={"单位"} dataIndex={"unit"}/>
          <Column title={"重量"} dataIndex={"weight"}/>
          <Column title={"库存"} dataIndex={"stock"}/>
          <Column title={"进货价"} dataIndex={"buyingPrice"}/>
          <Column title={"零售价"} dataIndex={"retailPrice"}/>
          <Column title={"产地"} dataIndex={"placeOfProduction"} sorter={true}
                  filters={ placesOfProduction.map(value => {return { text: value, value: value}} ) }
          />
          <Column title={"保质期/月"} dataIndex={"qualityGuaranteePeriod"} sorter={true}/>
          <Column title={"备注"} dataIndex={"remarks"}/>
        </Table>
      </div>
    </div>
  );
}

export default GoodsList;