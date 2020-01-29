import { BaseParam } from '../../util/config';

import SVG_ICONS from '../../components/SvgIcon/SvgIcon'

import React from 'react';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';

import './SideMenu.css'

const { SubMenu } = Menu;


function SideMenu(props: any) {
  // 根据URL判断选中的导航栏项
  let path: string[] = props.location.pathname.substring(BaseParam.BASE_URL.length).split('/');
  // console.log(path);
  // console.log(path[1] !== undefined);
  const selectedKey: string[] = (path[1] !== undefined && path[1] !== '') ? [path[0] + '_' + path[1]]
    : ((path[0] === 'home' || path[0] === '') ? ['home'] : ['']);
  const openKey: string[] = (path[0] !== undefined && path[0] !== 'home') ? ['orders'] : [path[0]];
  // console.log(selectedKey);
  // console.log(openKey);

  // const icon_orders = (props:any) => <SvgIcon svg={svg_orders} />;

  return (
    <div className="SideMenu">
      <Menu
        defaultSelectedKeys={selectedKey}
        defaultOpenKeys={openKey}
        mode="inline"
      >
        <Menu.Item key="home">
          <Link to="/">
            <Icon type="home" />
            <span>主页</span>
          </Link>
        </Menu.Item>
        <SubMenu
          key="orders"
          title={
            <span>
              <Icon component={SVG_ICONS['ordersManage']} />
              <span>订单管理</span>
            </span>
          }
        >
          <Menu.Item key="orders_list"><Link to="/orders/list">订单列表</Link></Menu.Item>
          <Menu.Item key="orders_add"><Link to="/orders/add">录入订单</Link></Menu.Item>
        </SubMenu>
        <SubMenu
          key="purchase"
          title={
            <span>
              <Icon component={SVG_ICONS['purchaseManage']} />
              <span>进货管理</span>
            </span>
          }
        >
          <Menu.Item key="purchase_list"><Link to="/purchase/list">进货记录列表</Link></Menu.Item>
          <Menu.Item key="purchase_add"><Link to="/purchase/add">录入进货记录</Link></Menu.Item>
          <Menu.Item key="111">查看进货统计</Menu.Item>
        </SubMenu>
        <SubMenu
          key="goods"
          title={
            <span>
              <Icon type="shopping" />
              <span>商品管理</span>
            </span>
          }
        >
          <Menu.Item key="goods_list"><Link to="/goods/list">商品列表</Link></Menu.Item>
          <Menu.Item key="goods_add"><Link to="/goods/add">录入商品</Link></Menu.Item>
        </SubMenu>
        <SubMenu
          key="customers"
          title={
            <span>
              <Icon component={SVG_ICONS['customersManage']} />
              <span>客户管理</span>
            </span>
          }
        >
          <Menu.Item key="customers_list"><Link to="/customers/list">客户列表</Link></Menu.Item>
          <Menu.Item key="customers_add"><Link to="/customers/add">录入客户</Link></Menu.Item>
        </SubMenu>
        <SubMenu
          key="suppliers"
          title={
            <span>
              <Icon component={SVG_ICONS['suppliersManage']} />
              <span>供应商管理</span>
            </span>
          }
        >
          <Menu.Item key="suppliers_list"><Link to="/suppliers/list">供应商列表</Link></Menu.Item>
          <Menu.Item key="suppliers_add"><Link to="/suppliers/add">录入供应商</Link></Menu.Item>
        </SubMenu>
        <SubMenu
          key="statistics"
          title={
            <span>
              <Icon type="pie-chart" />
              <span>数据分析</span>
            </span>
          }
        >
          <Menu.Item key="statistics_daily"><Link to="/statistics/daily">日报</Link></Menu.Item>
          <Menu.Item key="statistics_weekly"><Link to="/statistics/weekly">周报</Link></Menu.Item>
          <Menu.Item key="statistics_monthly"><Link to="/statistics/monthly">月报</Link></Menu.Item>
          <Menu.Item key="statistics_predicate"><Link to="/statistics/predicate">行情预测</Link></Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default withRouter(SideMenu);
