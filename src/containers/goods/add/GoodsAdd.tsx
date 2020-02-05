import React from "react";

import {Button, PageHeader, Form, Input} from "antd";

//自定义组件
import GoodsAddForm from "./GoodsAddForm/GoodsAddForm";


function GoodsAdd() {
  return (
    <div>
      <PageHeader
        title={"录入商品"}
        ghost={false}
        onBack={() => window.history.back()}
        extra={[
          <Button key="cancelBtn" size={"large"}>
            取消
          </Button>,
          <Button key="okBtn" size={"large"} type="primary">
            确认提交
          </Button>,
        ]}
      >
      </PageHeader>
      <div className={"ContentContainer"}
           style={{
             padding: 24
           }}
      >
        <GoodsAddForm/>
        {/*<GoodsAddForm*/}
        {/*  goodsName={""}*/}
        {/*  abbreviation={""}*/}
        {/*  brand={""}*/}
        {/*  model={""}*/}
        {/*  goodsNo={""}*/}
        {/*  material={""}*/}
        {/*  colour={""}*/}
        {/*  type={""}*/}
        {/*  specifications={""}*/}
        {/*  unit={""}*/}
        {/*  weight={""}*/}
        {/*  retailPrice={0}*/}
        {/*  placeOfProduction={""}*/}
        {/*  qualityGuaranteePeriod={0}*/}
        {/*  remarks={""}*/}
        {/*/>*/}
      </div>
    </div>
  );
}

export default GoodsAdd;