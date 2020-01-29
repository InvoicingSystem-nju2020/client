import React from 'react';

import {
  BrowserRouter,
  Route,
  Switch as RouterSwitch
} from 'react-router-dom'

import { Layout } from 'antd';

// 自定义组件
import SideMenu from '../../components/SideMenu/SideMenu';


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
            <SideMenu></SideMenu>
          </Sider>
          <Content className="Content">
            <RouterSwitch>
              <Route path="/orders">orders</Route>
              <Route path="/purchase">purchase</Route>
              <Route path="/goods">goods</Route>
              <Route path="/customers">customers</Route>
              <Route path="/suppliers">suppliers</Route>
              <Route path="/statistics">statistics</Route>
              <Route path="/">home</Route>
            </RouterSwitch>
          </Content>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
