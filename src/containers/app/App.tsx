import React, {useEffect, useState} from 'react';

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
import PurchaseRecordsAddAndEdit from "../purchase-records/add-and-edit/PurchaseRecordsAddAndEdit";
import OrdersAddAndEdit from "../orders/add-and-edit/OrdersAddAndEdit";
import OrdersList from "../orders/list/OrdersList";

// 数据
import {getAssistData} from "../../api/AssistApi";
import {AssistData} from "../../api/data";
import ClientBalanceRecordsList from "../clients/balance-records/ClientBalanceRecords";
import PurchaseRecordsStatistics from "../purchase-records/statistics/PurchaseRecordsStatistics";
import DailyStatistics from "../statistics/daily/DailyStatistics";

const { Content, Sider } = Layout;


const App: React.FC = () => {
  const supportsHistory = 'pushState' in window.history;

  // 获取辅助接口
  const [assistData, setAssistData] = useState<AssistData>({
    goodsTypes: ['球拍', '球类'],
    brands: ['LINING', 'WILSON'],
    places: ['中国', '日本'],
    clientTypes: ["零售", "团购", "批发"],
    orderStates: ["待付款", "赊账中", "已到账", "已售", "已取消", "已完成"],
    typesOfPayment: ['现金', '预支付', '赊账'],
    typesOfShipping: ['自提', '邮寄']
  });
  // 网站首次加载时，获取一次。缺点：如果首次直接进入列表、编辑等页面时，会导致调用2次后端接口(在setAssistData后组件重绘会再调用一次)
  useEffect(() => {
    // 全局, 方便各页面使用（X）会污染全局window变量, 暂行的解决办法
    const api_assist = getAssistData();
    api_assist.then(response => {
      const assistData: AssistData = response.data;
      setAssistData(assistData);
    }).catch(reason => {
    });
  }, []);

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
                    <Route path="/orders/list" component={() => <OrdersList assistData={assistData}/>}/>
                    <Route path="/orders/add" component={OrdersAddAndEdit}/>
                    <Route path="/orders/edit/:orderNumber" component={OrdersAddAndEdit}/>
                    <Redirect to="/orders/list"/>
                  </RouterSwitch>
                </Route>
                <Route path="/purchase-records">
                  <RouterSwitch>
                    <Route path="/purchase-records/list" component={() => <PurchaseRecordsList assistData={assistData}/>}/>
                    <Route path="/purchase-records/add" component={PurchaseRecordsAddAndEdit}/>
                    <Route path="/purchase-records/edit/:id" component={PurchaseRecordsAddAndEdit}/>
                    <Route path="/purchase-records/statistics" component={() => <PurchaseRecordsStatistics assistData={assistData}/>}/>
                    <Redirect to="/purchase-records/list"/>
                  </RouterSwitch>
                </Route>
                <Route path="/goods">
                  <RouterSwitch>
                    <Route path="/goods/list" component={() => <GoodsList assistData={assistData}/>}/>
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
                    <Route path="/clients/balance-records/:clientsNumber" component={ClientBalanceRecordsList}/>
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
                <Route path="/statistics">
                  <RouterSwitch>
                    <Route path="/statistics/daily" component={DailyStatistics}/>
                    {/*<Route path="/statistics/weekly" component={}/>*/}
                    {/*<Route path="/statistics/monthly" component={}/>*/}
                    <Redirect to="/suppliers/daily"/>
                  </RouterSwitch>
                </Route>
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
