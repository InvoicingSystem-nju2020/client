import React, {useEffect, useState} from 'react';

import {
  Statistic,
  Row,
  Col,
  PageHeader,
  Button,
  DatePicker,
  Form,
  Card,
  Tooltip,
  Spin,
  Skeleton,
  Select,
  AutoComplete, Input, notification
} from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, MinusOutlined } from '@ant-design/icons';

import 'moment/locale/zh-cn';
import moment from 'moment';

import {DateFormat, ChartConfig, FormInputSize} from "../../../util/ComponentsUtil";
import {getBrandTimeRangeStatistics, getMonthStatistics, getTimeRangeStatistics} from "../../../api/PurchaseRecordApi";

// 日期区间选择
const { RangePicker } = DatePicker;
// echarts
const echarts = require('echarts');
// 图表里的字体大小
const fontSize = ChartConfig.fontSize;

// 某一月份的统计信息
interface MonthInfo {
  numTotal: number;
  numIncrease: number;
  amountTotal: number;
  amountIncrease: number;
  perBrandTotal: any[];
  perSupplierTotal: any[];
}

// 显示增长和减少的组件
function increaseOrDecrease(num: number) {
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
}


/**
 * 进货统计
 * @constructor
 */
function PurchaseRecordsStatistics(props: any) {
  // 加载状态
  const [monthIsLoading, setMonthIsLoading] = useState<boolean>(true);
  const [timeRangeIsLoading, setTimeRangeIsLoading] = useState<boolean>(true);
  const [brandTimeRangeIsLoading, setBrandTimeRangeIsLoading] = useState<boolean>(true);
  // 获取辅助数据数组
  const assistData = props.assistData;
  let brands: string[] = assistData.brands; // 所有品牌
  // 某一月份所需数据
  const [month, setMonth] = useState<string>(moment().format(DateFormat.monthFormat));
  const [monthInfo, setMonthInfo] = useState<MonthInfo>();
  // 某一时间区间所需数据
  const [timeRange, setTimeRange] = useState<string | undefined[]>([undefined, undefined]);
  const [perMonthTotal, setPerMonthTotal] = useState<{month: string, value: number}[]>();
  const [brand, setBrand] = useState<string>('');
  const [brandPerMonthTotal, setBrandPerMonthTotal] = useState<{month: string, value: number}[]>();

  // 设置某一月份的各品牌统计图
  function initPerBrandTotalChart(data: {name: string, value: number}[]) {
    let dom = document.getElementById("perBrandTotalChart");
    let myChart = echarts.init(dom, ChartConfig.theme);
    let app = {};
    let option = null;

    option = {
      title: [{
        text: month+' 各品牌总进货金额',
      }],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        left: 10,
        top: 30,
        bottom: 20,
        data: data.map(value => value.name),
      },
      series: [{
        name: '品牌',
        type: 'pie',
        center: ['50%', '50%'],
        data: data,
        label: {
          position: 'outer',
          alignTo: 'labelLine',
          formatter: '{b}\n{c}',
          fontSize: fontSize
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
    ;
    if (option && typeof option === "object") {
      myChart.setOption(option, true);
    }
  };

  // 设置某一月份的各进货商统计图
  function initPerSupplierTotalChart(data: {name: string, value: number}[]) {
    let dom = document.getElementById("perSupplierTotalChart");
    let myChart = echarts.init(dom, ChartConfig.theme);
    let app = {};
    let option = null;

    option = {
      title: [{
        text: month+' 各进货商总进货金额',
      }],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        left: 10,
        top: 30,
        bottom: 20,
        data: data.map(value => value.name),
      },
      series: [{
        name: '品牌',
        type: 'pie',
        center: ['50%', '50%'],
        data: data,
        label: {
          position: 'outer',
          alignTo: 'labelLine',
          formatter: '{b}\n{c}',
          fontSize: fontSize
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
    ;
    if (option && typeof option === "object") {
      myChart.setOption(option, true);
    }
  };

  // 设置某一时间区间内各月的进货金额图
  function initPerMonthTotalChart(data: {month: string, value: number}[]) {
    let dom = document.getElementById("perMonthTotalChart");
    let myChart = echarts.init(dom, ChartConfig.theme);
    let app = {};
    let option = null;

    // 先按日期排序
    data.sort((a, b) => a.month.localeCompare(b.month,'zh-CN'));
    let afterData = data.map(item => [item.month, item.value]);
    option = {
      title: [{
        text: afterData[0][0]+' ~ '+afterData[afterData.length-1][0]+' 各月总进货金额',
      }],
      tooltip: {
        trigger: 'axis'
      },
      xAxis: [
        {
          type: 'category',
          data: afterData.map(item => item[0]),
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [{
        name: '总进货金额',
        type: 'bar',
        barWidth: '60%',
        data: data,
        label: {
          show: true,
          position: 'top',
          fontSize: fontSize
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
    ;
    if (option && typeof option === "object") {
      myChart.setOption(option, true);
    }
  };

  // 设置某一时间区间内各月的进货金额图
  function initBrandPerMonthTotalChart(data: {month: string, value: number}[]) {
    let dom = document.getElementById("brandPerMonthTotalChart");
    let myChart = echarts.init(dom, ChartConfig.theme);
    let app = {};
    let option = null;

    // 先按日期排序
    data.sort((a, b) => a.month.localeCompare(b.month,'zh-CN'));
    let afterData = data.map(item => [item.month, item.value]);
    option = {
      title: [{
        text: brand + ' : ' + afterData[0][0]+' ~ '+afterData[afterData.length-1][0]+' 各月总进货金额',
      }],
      tooltip: {
        trigger: 'axis'
      },
      xAxis: [
        {
          type: 'category',
          data: afterData.map(item => item[0]),
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [{
        name: '总进货金额',
        type: 'bar',
        barWidth: '60%',
        data: data,
        label: {
          show: true,
          position: 'top',
          fontSize: fontSize
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
    ;
    if (option && typeof option === "object") {
      myChart.setOption(option, true);
    }
  };

  // 获取并设置某一月份的数据和图表，首次加载和设置月份后触发
  useEffect(() => {
    setMonthIsLoading(true);
    // 某一月份的信息和图表
    const api_getMonthStatistics = getMonthStatistics({month: month});
    api_getMonthStatistics.then(response => {
      let monthInfo = response.data;
      setMonthInfo(monthInfo);
      initPerBrandTotalChart(monthInfo.perBrandTotal);
      initPerSupplierTotalChart(monthInfo.perSupplierTotal);
      // 设置加载完成状态
      setMonthIsLoading(false);
    }).catch(reason => {
      notification.error({message: '发生了错误', description: reason.toString()});
    }).finally(() => {
    });
    // let monthInfo = {
    //   numTotal: 7, numIncrease: 11.3, amountTotal: 2143, amountIncrease: -3.6,
    //   perBrandTotal: [{name: "LINING", value: 1352}, {name: "WILSON", value: 335}, {name: "YONEX", value: 456}],
    //   perSupplierTotal: [{name: "李宁", value: 1352}, {name: "WILSON", value: 335}, {name: "YONEX", value: 456}]
    // };
    // setMonthInfo(monthInfo);
    // initPerBrandTotalChart(monthInfo.perBrandTotal);
    // initPerSupplierTotalChart(monthInfo?.perSupplierTotal);
    // setMonthIsLoading(false);
  }, [month]);

  // 获取并设置某一时间区间的图表，首次加载和设置时间区间后触发
  useEffect(() => {
    setMonthIsLoading(true);
    // 某一时间区间的图表
    const api_getTimeRangeStatistics = getTimeRangeStatistics({startTime: timeRange[0], endTime: timeRange[1]});
    api_getTimeRangeStatistics.then(response => {
      let perMonthTotal = response.data;
      setPerMonthTotal(perMonthTotal);
      initPerMonthTotalChart(perMonthTotal);
      // 设置加载完成状态
      setTimeRangeIsLoading(false);
    }).catch(reason => {
      notification.error({message: '发生了错误', description: reason.toString()});
    }).finally(() => {
    });
    // let perMonthTotal = [
    //   {month: "2019/12", value: 1464}, {month: "2020/01", value: 1215}, {month: "2020/02", value: 2264},
    //   {month: "2020/03", value: 2314}, {month: "2020/04", value: 1245}, {month: "2020/05", value: 1432}
    // ];
    // setPerMonthTotal(perMonthTotal);
    // initPerMonthTotalChart(perMonthTotal);
    // setTimeRangeIsLoading(false);
  }, [timeRange]);

  // 选择某一个品牌后触发，获取数据并绘制某一时间区间内该品牌的各月进货金额
  useEffect(() => {
    if(!brand || brand === ''){ // 首次加载或为空时不执行
      return;
    }
    // 获取数据
    const api_getBrandTimeRangeStatistics = getBrandTimeRangeStatistics(
      {startTime: timeRange[0], endTime: timeRange[1], brand: brand}
      );
    api_getBrandTimeRangeStatistics.then(response => {
      let brandPerMonthTotal = response.data;
      setBrandPerMonthTotal(brandPerMonthTotal);
      // 绘制图表
      initBrandPerMonthTotalChart(brandPerMonthTotal);
      // 设置加载完成状态
      setTimeRangeIsLoading(false);
    }).catch(reason => {
      notification.error({message: '发生了错误', description: reason.toString()});
    }).finally(() => {
    });
    // let brandPerMonthTotal = [
    //   {month: "2019/12", value: 564}, {month: "2020/01", value: 154}, {month: "2020/02", value: 723},
    //   {month: "2020/03", value: 452}, {month: "2020/04", value: 342}, {month: "2020/05", value: 264}
    // ];
    // setBrandPerMonthTotal(brandPerMonthTotal);
    // // 绘制图表
    // initBrandPerMonthTotalChart(brandPerMonthTotal);
    // setTimeRangeIsLoading(false);
  }, [brand]);

  // 处理参数表单的提交
  function onFinish(values:any) {
    console.log('Received values of form: ', values);
    // 处理数据并发起请求
    // 某一月份
    if(values.month){
      let tempMonth = values.month.format(DateFormat.monthFormat);
      if(tempMonth !== month){  // 与之前不同时才发起请求
        console.log("month", tempMonth);
        // 设置month触发获取数据和更新
        setMonth(tempMonth);
      }
    }
    // 某一时间区间
    if(values.time && (values.time[0] || values.time[1])){
      let tempTime = values.time.map((value:any) => value?.format(DateFormat.dateFormat));
      // 判断是否是同一个时间区间
      console.log("tempTime", tempTime);
      if(tempTime[0] !== timeRange[0] || tempTime[1] !== timeRange[1]){ // 与之前不同时才发起请求
        // 设置timeRange触发获取数据和更新
        setTimeRange(tempTime);
      }
    }
    // 选择了品牌，且是与之前不同的、正确的品牌
    if(values.brand && brands.includes(values.brand) && values.brand !== brand){
      console.log("brand", values.brand);
      // 设置brand触发获取数据和更新
      setBrand(values.brand);
    }
  };

  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="进货统计"
        extra={
          <Form key="1" initialValues={{month: moment()}} layout="inline" onFinish={onFinish}>
            <Form.Item label={"月份"} name="month">
              <DatePicker
                placeholder="请选择一个月份"
                format={DateFormat.monthFormat}
                picker={'month'}
                allowClear
                inputReadOnly
              />
            </Form.Item>
            <Form.Item label={"时间区间"} name="time">
              <RangePicker
                allowEmpty={[true, true]}
                format={DateFormat.dateFormat}
                allowClear
                inputReadOnly
              />
            </Form.Item>
            <Form.Item label={"品牌"} name={"brand"}>
              <AutoComplete
                options={brands.map(item => {return {value: item, label: item}})}
                filterOption={(inputValue, option) => option?.value.toLowerCase().includes(inputValue.toLowerCase())}
                backfill
              >
                <Input placeholder="输入品牌名搜索"/>
              </AutoComplete>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">确认</Button>
            </Form.Item>
          </Form>
        }
      >
      </PageHeader>
      <div className={"ContentContainer"}>
        {/*这一月份的总体统计信息*/}
        <Card>
          <Row gutter={16}>
            {/*统计信息*/}
            <Col sm={8} xs={24}>
              <Skeleton loading={monthIsLoading}>
                <Statistic title="月份" value={month} />
              </Skeleton>
            </Col>
            <Col sm={8} xs={24}>
              <Skeleton loading={monthIsLoading}>
                <Statistic title="总进货记录数" value={monthInfo?.numTotal}
                           suffix={
                             increaseOrDecrease((monthInfo?.numIncrease === undefined) ? 0 : monthInfo.numIncrease)
                           }
                />
              </Skeleton>
            </Col>
            <Col sm={8} xs={24}>
              <Skeleton loading={monthIsLoading}>
                <Statistic title="总进货金额" value={monthInfo?.amountTotal} precision={2}
                           suffix={
                             increaseOrDecrease(
                               (monthInfo?.amountIncrease === undefined) ? 0 : monthInfo.amountIncrease
                             )
                           }
                />
              </Skeleton>
            </Col>
            {/*图表*/}
            <Col sm={12} xs={24}>
              <Spin spinning={monthIsLoading}>
                {/*该月份各个品牌的进货金额*/}
                <div id="perBrandTotalChart" style={{height: 350}}/>
              </Spin>
            </Col>
            <Col sm={12} xs={24}>
              <Spin spinning={monthIsLoading}>
                {/*该月份各个供应商的进货金额*/}
                <div id="perSupplierTotalChart" style={{height: 350}}/>
              </Spin>
            </Col>
          </Row>
        </Card>
        {/*某一个时间区间内的*/}
        <Card>
          <Row gutter={16}>
            <Col sm={12} xs={24}>
              <Spin spinning={timeRangeIsLoading}>
                {/*某一时间区间内各月的总进货金额*/}
                <div id="perMonthTotalChart" style={{height: 500}}/>
              </Spin>
            </Col>
            <Col sm={12} xs={24}>
              <Spin spinning={brandTimeRangeIsLoading}
                    style={{
                      visibility: brand !== undefined && brand !== null && brand !== '' ? 'visible' : 'hidden'
                    }}
              >
                {/*某一时间区间内某品牌各月的总进货金额*/}
                <div id="brandPerMonthTotalChart"
                     style={{
                       height: 500,
                     }}
                />
              </Spin>
              {/*未选择品牌时显示提示*/}
              { brand !== undefined && brand !== null && brand !== '' ? ''
                :
                <div style={{textAlign: "center", fontSize: '1.3rem', width: '100%', position: "absolute", top: 0}}>
                  请选择一个品牌以查看各月的总进货金额
                </div>
              }
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default PurchaseRecordsStatistics;