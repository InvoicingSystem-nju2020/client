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
import SideMenu from '../../components/SideMenu/SideMenu';

// 容器
// import GoodsContainer from "../goods/GoodsContainer";
import GoodsList from "../goods/list/GoodsList";
import GoodsAdd from "../goods/add/GoodsAdd";


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
                <Route path="/orders">orders</Route>
                <Route path="/purchase">purchase</Route>
                {/*<Route path="/goods" component={GoodsContainer}>*/}
                <Route path="/goods">
                  <RouterSwitch>
                    <Route path="/goods/list" component={GoodsList}/>
                    <Route path="/goods/add" component={GoodsAdd}/>
                    <Redirect to="/goods/list"/>
                  </RouterSwitch>
                </Route>
                <Route path="/customers">customers</Route>
                <Route path="/suppliers">suppliers</Route>
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
