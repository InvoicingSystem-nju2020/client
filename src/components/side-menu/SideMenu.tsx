import { BaseParam } from '../../util/config';

// import SVG_ICONS from '../../components/svg-icon/svg-icon'
import { Icon_OrdersManage, Icon_PurchaseManage, Icon_ClientsManage, Icon_SuppliersManage } from '../svg-icon/SvgIcon'

import React, {useEffect, useState} from 'react';
import { Menu } from 'antd';
import Icon from '@ant-design/icons';
import { HomeOutlined, ShoppingOutlined, PieChartOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';

import './SideMenu.css'

const { SubMenu } = Menu;


function SideMenu(props: any) {
  // 根据URL判断选中的导航栏项
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  // 判断URL的Effect
  useEffect(() => {
    // 分割取出两段path
    let path: string[] = props.location.pathname.substring(BaseParam.BASE_URL.length).split('/');
    // 判断并选中菜单项
    if(path[1] !== undefined && path[1] !== '') {   // 由地址指定了具体菜单项
      setSelectedKey(path[0] + '_' + path[1]);
    }
    else {    // 地址未指定，则默认选中home
      setSelectedKey('home');
    }
    // 判断地址上需要打开的二级菜单
    if(openKeys.length === 0 && (path[1] === undefined || path[1] === '' || path[0] === '')) {    // 地址上未指定，则默认打开orders
      setOpenKeys(['orders']);
    }
    else {    // 地址上指定了二级菜单，判断是否已打开然后打开
      if(!openKeys.includes(path[0])){
        openKeys.push(path[0]);
        setOpenKeys(openKeys);
      }
    }
    // console.log("selectedKey: "+selectedKey);
    // console.log("openKey: ");
    // console.log(openKeys);
  }, [props.location.pathname, openKeys, selectedKey]);

  // 处理二级菜单项打开事件
  const handleOpenChange = (openKeys: string[]) => {
    // console.log(openKeys);
    setOpenKeys(openKeys);
  };


  return (
    <div className="SideMenu">
      <Menu
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        mode="inline"
      >
        <Menu.Item key="home">
          <Link to="/">
            <HomeOutlined />
            <span>主页</span>
          </Link>
        </Menu.Item>
        <SubMenu
          key="orders"
          title={
            <span>
              <Icon component={Icon_OrdersManage} />
              <span>订单管理</span>
            </span>
          }
        >
          <Menu.Item key="orders_list"><Link to="/orders/list">订单列表</Link></Menu.Item>
          <Menu.Item key="orders_add"><Link to="/orders/add">录入订单</Link></Menu.Item>
        </SubMenu>
        <SubMenu
          key="purchase-records"
          title={
            <span>
              <Icon component={Icon_PurchaseManage} />
              <span>进货管理</span>
            </span>
          }
        >
          <Menu.Item key="purchase-records_list"><Link to="/purchase-records/list">进货记录列表</Link></Menu.Item>
          <Menu.Item key="purchase-records_add"><Link to="/purchase-records/add">录入进货记录</Link></Menu.Item>
          <Menu.Item key="purchase-records_statistics"><Link to="/purchase-records/statistics">查看进货统计</Link></Menu.Item>
        </SubMenu>
        <SubMenu
          key="goods"
          title={
            <span>
              <ShoppingOutlined />
              <span>商品管理</span>
            </span>
          }
        >
          <Menu.Item key="goods_list"><Link to="/goods/list">商品列表</Link></Menu.Item>
          <Menu.Item key="goods_add"><Link to="/goods/add">录入商品</Link></Menu.Item>
        </SubMenu>
        <SubMenu
          key="clients"
          title={
            <span>
              <Icon component={Icon_ClientsManage} />
              <span>客户管理</span>
            </span>
          }
        >
          <Menu.Item key="clients_list"><Link to="/clients/list">客户列表</Link></Menu.Item>
          <Menu.Item key="clients_add"><Link to="/clients/add">录入客户</Link></Menu.Item>
        </SubMenu>
        <SubMenu
          key="suppliers"
          title={
            <span>
              <Icon component={Icon_SuppliersManage} />
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
              <PieChartOutlined />
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
