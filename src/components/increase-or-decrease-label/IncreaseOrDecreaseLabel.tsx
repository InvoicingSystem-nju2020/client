import {Tooltip} from "antd";
import React from "react";
import { ArrowUpOutlined, ArrowDownOutlined, MinusOutlined } from '@ant-design/icons';

// 显示增长和减少的组件
export default function IncreaseOrDecreaseLabel(num: number) {
  // 格式化显示字符串
  const numStr = Math.abs(num).toFixed(1);
  // 增长
  if(num > 0){
    return (
      <Tooltip title={"对比上一个月增长了"+numStr+"%"} placement="bottom">
        <span style={{color: '#3f8600'}}>
          <ArrowUpOutlined/>
          {numStr}%
        </span>
      </Tooltip>
    )
  }
  else if(num < 0) {  // 减少
    return (
      <Tooltip title={"对比上一个月减少了"+numStr+"%"} placement="bottom">
        <span style={{ color: '#cf1322' }}>
          <ArrowDownOutlined/>
          {numStr}%
        </span>
      </Tooltip>
    )
  }
  else {  // 0持平
    return (
      <Tooltip title={"与上个月持平"} placement="bottom">
        <span style={{color: 'rgb(29,161,242)'}}>
          <MinusOutlined/>
          0%
        </span>
      </Tooltip>
    )
  }
};