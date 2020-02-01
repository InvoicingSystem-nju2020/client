import React from 'react';

import {
  BrowserRouter,
  Route,
  Switch as RouterSwitch,
  Redirect
} from 'react-router-dom'


// 容器
import GoodsList from "./list/GoodsList";


function GoodsContainer(props: any) {
  return (
    <BrowserRouter basename="/goods">
      <RouterSwitch>
        <Route path="/list" component={GoodsList} />
        <Route path="/add"/>
        <Redirect to="/list"/>
      </RouterSwitch>
    </BrowserRouter>
  );
}

export default GoodsContainer;