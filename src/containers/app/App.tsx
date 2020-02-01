import React from 'react';

import {
  BrowserRouter,
  Route,
  Switch as RouterSwitch,
  Redirect
} from 'react-router-dom'

import { Layout } from 'antd';

// 自定义组件
import SideMenu from '../../components/SideMenu/SideMenu';

// 容器
import GoodsContainer from "../goods/GoodsContainer";


// CSS
import './App.css';


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
              }}
            >
              <RouterSwitch>
                <Route path="/orders">orders</Route>
                <Route path="/purchase">purchase</Route>
                <Route path="/goods" component={GoodsContainer}/>
                <Route path="/customers">customers</Route>
                <Route path="/suppliers">suppliers</Route>
                <Route path="/statistics">statistics</Route>
                <Route path="/">home</Route>
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
