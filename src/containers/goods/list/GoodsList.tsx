import React from 'react';

import { PageHeader, Button } from 'antd';
import { Table } from 'antd';


// 表格列
const { Column } = Table;


function GoodsList() {
  let data: object[] = [];

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
        <Table dataSource={data}>
          <Column title={"商品编号"} dataIndex={"goodsNumber"} sorter={true}/>
        </Table>
      </div>
    </div>
  );
}

export default GoodsList;