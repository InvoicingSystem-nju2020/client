import React from 'react';

import {
  BrowserRouter,
  Route,
  Switch as RouterSwitch,
  Redirect
} from 'react-router-dom'

import { Layout } from 'antd';

// CSS
import './App.css';

// 自定义公共组件
import SideMenu from '../../components/side-menu/SideMenu';

// 容器
// import GoodsContainer from "../goods/GoodsContainer";
import GoodsList from "../goods/list/GoodsList";
import GoodsAddAndEdit from "../goods/add-and-edit/GoodsAddAndEdit";
import ClientsList from "../clients/list/ClientsList";
import ClientsAddAndEdit from "../clients/add-and-edit/ClientsAddAndEdit";
import SuppliersList from "../suppliers/list/SuppliersList";
import SuppliersAddAndEdit from "../suppliers/add-and-edit/SuppliersAddAndEdit";
import PurchaseRecordsList from "../purchase-records/list/PurchaseRecordsList";
import PurchaseRecordsAdd from "../purchase-records/add/PurchaseRecordsAdd";
import OrdersAdd from "../orders/add/OrdersAdd";
import OrdersList from "../orders/list/OrdersList";


const { Content, Sider } = Layout;


const App: React.FC = () => {
  const supportsHistory = 'pushState' in window.history;
  return (
    <BrowserRouter forceRefresh={!supportsHistory}>
      <div className="App">
        <Layout>
          <Sider className="Sider">
            <SideMenu/>
          </Sider>
          <Content className="Content">
            <div
              style={{
                backgroundColor: '#F5F5F5',
                padding: 24,
                height: '100vh'
              }}
            >
              <RouterSwitch>
                <Route path="/orders">
                  <RouterSwitch>
                    <Route path="/orders/list" component={OrdersList}/>
                    <Route path="/orders/add" component={OrdersAdd}/>
                    <Redirect to="/orders/list"/>
                  </RouterSwitch>
                </Route>
                <Route path="/purchase-records">
                  <RouterSwitch>
                    <Route path="/purchase-records/list" component={PurchaseRecordsList}/>
                    <Route path="/purchase-records/add" component={PurchaseRecordsAdd}/>
                    <Redirect to="/purchase-records/list"/>
                  </RouterSwitch>
                </Route>
                <Route path="/goods">
                  <RouterSwitch>
                    <Route path="/goods/list" component={GoodsList}/>
                    <Route path="/goods/add" component={GoodsAddAndEdit}/>
                    <Route path="/goods/edit/:goodsNumber" component={GoodsAddAndEdit}/>
                    <Redirect to="/goods/list"/>
                  </RouterSwitch>
                </Route>
                <Route path="/clients">
                  <RouterSwitch>
                    <Route path="/clients/list" component={ClientsList}/>
                    <Route path="/clients/add" component={ClientsAddAndEdit}/>
                    <Route path="/clients/edit/:clientsNumber" component={ClientsAddAndEdit}/>
                    <Redirect to="/clients/list"/>
                  </RouterSwitch>
                </Route>
                <Route path="/suppliers">
                  <RouterSwitch>
                    <Route path="/suppliers/list" component={SuppliersList}/>
                    <Route path="/suppliers/add" component={SuppliersAddAndEdit}/>
                    <Route path="/suppliers/edit/:supplierNumber" component={SuppliersAddAndEdit}/>
                    <Redirect to="/suppliers/list"/>
                  </RouterSwitch>
                </Route>
                <Route path="/statistics">statistics</Route>
                <Route path="/" exact>home</Route>
                <Redirect to="/"/>
              </RouterSwitch>
            </div>
          </Content>
        </Layout>
      </div>
    </BrowserRouter>
  );
};

export default App;
