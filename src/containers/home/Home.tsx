import React from "react";
import Title from "antd/es/typography/Title";
import {Button, Card, Col, Row} from "antd";
import Meta from "antd/es/card/Meta";
import {
  Icon_ClientsManage,
  Icon_GoodsManage,
  Icon_OrdersManage,
  Icon_PurchaseManage, Icon_Statistics, Icon_SuppliersManage
} from "../../components/svg-icon/SvgIcon";
import Text from "antd/es/typography/Text";
import {Link} from "react-router-dom";

// CSS
import './Home.css';

const XS = 12, SM = 4;  // span

function Home() {
  return (
    <div style={{textAlign: "center"}}>
      <div>
        <Title>欢迎使用进销存管理系统</Title>
      </div>
      <div className={"ContentContainer ContentPadding"}>
        <Row justify={'center'} gutter={24} style={{alignContent: "center", lineHeight: "100%", height: "100%"}}>
          <Link to="/orders/list">
            <Card
              hoverable
              className="Card"
              cover={<div className="IconContainer"><Icon_OrdersManage width={'100%'} height={'100%'}/></div>}
            >
              <Meta title={<Text style={{fontSize: '2rem'}}>订单管理</Text>}/>
            </Card>
          </Link>
          <Link to="/purchase-records/list">
            <Card
              hoverable
              className="Card"
              cover={<div className="IconContainer"><Icon_PurchaseManage width={'100%'} height={'100%'}/></div>}
            >
              <Meta title={<Text style={{fontSize: '2rem'}}>进货管理</Text>}/>
            </Card>
          </Link>
          <Link to="/goods/list">
            <Card
              hoverable
              className="Card"
              cover={<div className="IconContainer"><Icon_GoodsManage width={'100%'} height={'100%'}/></div>}
            >
              <Meta title={<Text style={{fontSize: '2rem'}}>商品管理</Text>}/>
            </Card>
          </Link>
          <Link to="/clients/list">
            <Card
              hoverable
              className="Card"
              cover={<div className="IconContainer"><Icon_ClientsManage width={'100%'} height={'100%'}/></div>}
            >
              <Meta title={<Text style={{fontSize: '2rem'}}>客户管理</Text>}/>
            </Card>
          </Link>
          <Link to="/suppliers/list">
            <Card
              hoverable
              className="Card"
              cover={<div className="IconContainer"><Icon_SuppliersManage width={'100%'} height={'100%'}/></div>}
            >
              <Meta title={<Text style={{fontSize: '2rem'}}>供应商管理</Text>}/>
            </Card>
          </Link>
          <Link to="/statistics/daily">
            <Card
              hoverable
              className="Card"
              cover={<div className="IconContainer"><Icon_Statistics width={'100%'} height={'100%'}/></div>}
            >
              <Meta title={<Text style={{fontSize: '2rem'}}>数据分析</Text>}/>
            </Card>
          </Link>
        </Row>
      </div>
    </div>
  );
}

export default Home;