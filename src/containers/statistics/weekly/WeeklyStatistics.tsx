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

import 'moment/locale/zh-cn';
import moment from 'moment';

import {DateFormat, ChartConfig, FormInputSize} from "../../../util/ComponentsUtil";
import IncreaseOrDecreaseLabel from "../../../components/increase-or-decrease-label/IncreaseOrDecreaseLabel";
import {getWeeklyStatistics} from "../../../api/StatisticsApi";

// echarts
const echarts = require('echarts');
// 图表里的字体大小
const fontSize = ChartConfig.fontSize;

// 某一月份的统计信息
interface WeeklyInfo {
  sales: {num: number, increase: number};
  income: {num: number, increase: number};
  perClientType: {num: number, increase: number}[]; // 按[零售, 团购, 批发]顺序
  perBrand: {name: string, num: number, increase: number}[];
  perState: number[]; // 按[待付款, 赊账中, 已到账, 已售, 已取消, 已完成]
  writeAnInvoice: number[]; //顺序按[是，否]
  perDay: {date: string, num: number, sales: number, income: number}[];
}


/**
 * 进货统计
 * @constructor
 */
function WeeklyStatistics(props: any) {
  // 加载状态
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // 某一周所需数据
  const [date, setDate] = useState<string>(moment().format(DateFormat.dateFormat));
  const [weeklyInfo, setWeeklyInfo] = useState<WeeklyInfo>();

  // 设置该周各客户类型销售额的统计图
  function initPerClientTypeChart(data: {num: number, increase: number}[]) {
    let dom = document.getElementById("perClientTypeChart");
    let myChart = echarts.init(dom, ChartConfig.theme);
    let app = {};
    let option = null;

    // 处理数据
    let afterData = data.map(item => ['', item.num, item.increase]);
    afterData[0][0] = '零售'; afterData[1][0] = '团购'; afterData[2][0] = '批发';

    option = {
      title: [{
        text: '该周各客户类型的销售金额',
      }],
      tooltip: {
        trigger: 'item',
        // formatter: '{b} : {c[1]} ({d}%)<br/>对比上一周({@increase}%)'
        formatter: (params:any, _:any, __:any) => {
          // console.log(params);
          let num = params.value[1];
          let increase = params.value[2];
          let increaseLabel = increase >= 0 ? '+' : '';
          return params.name + ' : ' + num + ' (' + params.percent + '%)<br/>'+
            '对比上一周' + increaseLabel + increase + '%';
        }
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        left: 10,
        top: 30,
        bottom: 20,
        data: afterData.map(value => value[0]),
      },
      series: [{
        name: '销售额',
        type: 'pie',
        // dimensions: ['name', 'num', 'increase'],
        data: afterData,
        encode: {
          itemName: 0,
          value: 1
        },
        center: ['50%', '50%'],
        label: {
          position: 'outer',
          alignTo: 'labelLine',
          formatter: '{b}\n{@[1]}',
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

    if (option && typeof option === "object") {
      myChart.setOption(option, true);
    }
  };

  // 设置该周各品牌的销售额统计图
  function initPerBrandChart(data: {name: string, num: number, increase: number}[]) {
    let dom = document.getElementById("perBrandChart");
    let myChart = echarts.init(dom, ChartConfig.theme);
    let app = {};
    let option = null;

    // 处理数据
    let afterData = data.map(item => [item.name, item.num, item.increase]);
    option = {
      title: [{
        text: '该周各品牌的销售金额',
      }],
      tooltip: {
        trigger: 'item',
        formatter: (params:any, _:any, __:any) => {
          // console.log(params);
          let num = params.value[1];
          let increase = params.value[2];
          let increaseLabel = increase >= 0 ? '+' : '';
          return params.name + ' : ' + num + ' (' + params.percent + '%)<br/>'+
            '对比上一周' + increaseLabel + increase + '%';
        }
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        left: 10,
        top: 30,
        bottom: 20,
        data: afterData.map(value => value[0]),
      },
      series: [{
        name: '销售额',
        type: 'pie',
        center: ['50%', '50%'],
        data: afterData,
        encode: {
          itemName: 0,
          value: 1
        },
        label: {
          position: 'outer',
          alignTo: 'labelLine',
          formatter: '{b}\n{@[1]}',
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
    if (option && typeof option === "object") {
      myChart.setOption(option, true);
    }
  };

  // 设置该周的各类订单状态的统计
  function initPerStateChart(data: number[]) {
    let dom = document.getElementById("perStateChart");
    let myChart = echarts.init(dom, ChartConfig.theme);
    let app = {};
    let option = null;

    // 处理数据
    const states: string[] = ['待付款', '赊账中', '已到账', '已售', '已取消', '已完成'];
    let afterData = data.map((value, index) => {return {name: states[index], value: value}});

    option = {
      title: [{
        text: '该周各种订单状态统计',
      }],
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        left: 10,
        top: 30,
        bottom: 20,
        data: states,
      },
      series: [{
        name: '订单数',
        type: 'pie',
        center: ['50%', '50%'],
        data: afterData,
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
    if (option && typeof option === "object") {
      myChart.setOption(option, true);
    }
  };

  // 设置该周的是否开票订单的统计
  function initWriteAnInvoiceChart(data: number[]) {
    let dom = document.getElementById("writeAnInvoiceChart");
    let myChart = echarts.init(dom, ChartConfig.theme);
    let app = {};
    let option = null;

    // 处理数据
    const types: string[] = ['开票', '未开票'];
    let afterData = data.map((value, index) => {return {name: types[index], value: value}});

    option = {
      title: [{
        text: '该周是否开票订单统计',
      }],
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        left: 10,
        top: 30,
        bottom: 20,
        data: types,
      },
      series: [{
        name: '订单数',
        type: 'pie',
        center: ['50%', '50%'],
        data: afterData,
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
    if (option && typeof option === "object") {
      myChart.setOption(option, true);
    }
  };

  // 设置该周各天订单统计图
  function initPerDayChart(data: {date: string, num: number, sales: number, income: number}[]) {
    let dom = document.getElementById("perDayChart");
    let myChart = echarts.init(dom, ChartConfig.theme);
    let app = {};
    let option = null;

    // 处理数据
    let dayData = data.map(item => [item.date, item.num, item.sales, item.income]);
    let xAxisData = data.map(item => item.date); // x轴需要哪些日期

    option = {
      title: [{
        text: '该周各天订单统计图',
      }],
      grid: {
        left: '5%',
        right: '15%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['销售额', '收入', '订单数量']
      },
      xAxis: [
        {
          type: 'category',
          data: xAxisData,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          name: '销售额',
          type: 'value',
          position: 'left',
          splitLine: {
            show: false
          }
        },
        {
          name: '收入',
          type: 'value',
          position: 'left',
          offset: 80,
          splitLine: {
            show: false
          }
        },
        {
          name: '订单数量',
          type: 'value',
          position: 'right',
          splitLine: {
            show: false
          }
        }
      ],
      label: {
        show: true,
        position: 'top',
        fontSize: fontSize
      },
      series: [
        {
          name: '销售额',
          type: 'bar',
          barGap: 0,
          data: dayData.map(item => [item[0], item[2]])
        },
        {
          name: '收入',
          type: 'bar',
          yAxisIndex: 1,
          data: dayData.map(item => [item[0], item[3]])
        },
        {
          name: '订单数量',
          type: 'bar',
          yAxisIndex: 2,
          data: dayData.map(item => [item[0], item[1]])
        }
      ]
    };
    if (option && typeof option === "object") {
      myChart.setOption(option, true);
    }
  };

  // 获取并设置某一周的周报，首次加载和设置日期后触发
  useEffect(() => {
    setIsLoading(true);
    // 某一周的周报
    const api_getDailyStatistics = getWeeklyStatistics({date: date});
    api_getDailyStatistics.then(response => {
      let weeklyInfo: WeeklyInfo = response.data;
      setWeeklyInfo(weeklyInfo);
      initPerClientTypeChart(weeklyInfo.perClientType);
      initPerBrandChart(weeklyInfo.perBrand);
      initPerStateChart(weeklyInfo.perState);
      initWriteAnInvoiceChart(weeklyInfo.writeAnInvoice);
      initPerDayChart(weeklyInfo.perDay);
      // 设置加载完成状态
      setIsLoading(false);
    }).catch(reason => {
      notification.error({message: '发生了错误', description: reason.toString()});
    }).finally(() => {
    });
    // // 假数据
    // let weeklyInfo: WeeklyInfo = {
    //   sales: {num: 21342.3, increase: 6.7},
    //   income: {num: 5635.1, increase: -0.3},
    //   perClientType: [
    //     {num: 8342, increase: 10.4}, {num: 6431.3, increase: 3.4}, {num: 7569, increase: 4.2}
    //   ],
    //   perBrand: [
    //     {name: "LINING", num: 11242, increase: 9.5},
    //     {name: "WILSON", num: 6350, increase: 4.3},
    //     {name: "YONEX", num: 3650.3, increase: -3.1}
    //   ],
    //   perState: [23, 12, 9, 80, 2, 10],
    //   writeAnInvoice: [95, 39],
    //   perDay: [
    //     {"date": "2020/05/11", "num": 10, "sales": 2000, "income": 400},
    //     {"date": "2020/05/12", "num": 7, "sales": 1400, "income": 300},
    //     {"date": "2020/05/13", "num": 2, "sales": 500, "income": 40},
    //     {"date": "2020/05/14", "num": 8, "sales": 1800, "income": 500},
    //     {"date": "2020/05/15", "num": 10, "sales": 2000, "income": 400},
    //     {"date": "2020/05/16", "num": 10, "sales": 2000, "income": 400},
    //     {"date": "2020/05/17", "num": 0, "sales": 0, "income": 0}
    //   ]
    // };
    // setWeeklyInfo(weeklyInfo);
    // initPerClientTypeChart(weeklyInfo.perClientType);
    // initPerBrandChart(weeklyInfo.perBrand);
    // initPerStateChart(weeklyInfo.perState);
    // initWriteAnInvoiceChart(weeklyInfo.writeAnInvoice);
    // initPerDayChart(weeklyInfo.perDay);
    // // 设置加载完成状态
    // setIsLoading(false);
  }, [date]);

  // 处理参数表单的提交
  function onFinish(values:any) {
    console.log('Received values of form: ', values);
    // 处理数据并发起请求
    // 某一周期
    if(values.dateToShow){
      let tempDate = values.dateToShow.format(DateFormat.dateFormat);
      if(tempDate !== date){  // 与之前不同时才发起请求
        console.log("date", tempDate);
        // 设置month触发获取数据和更新
        setDate(tempDate);
      }
    }
  };

  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="周报"
        extra={
          <Form key="1" initialValues={{month: moment()}} layout="inline" onFinish={onFinish}>
            <Form.Item label={"日期"} name="dateToShow">
              <DatePicker
                placeholder="请选择一个日期"
                format={DateFormat.dateFormat}
                allowClear
                inputReadOnly
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">确认</Button>
            </Form.Item>
          </Form>
        }
      >
      </PageHeader>
      <div className={"ContentContainer"}>
        {/*该周的统计信息*/}
        <Card>
          <Row gutter={[16, 32]}>
            {/*统计信息*/}
            <Col sm={8} xs={24}>
              <Skeleton loading={isLoading}>
                <Statistic title="日期" value={date} />
              </Skeleton>
            </Col>
            <Col sm={8} xs={24}>
              <Skeleton loading={isLoading}>
                <Statistic title="总销售额" value={weeklyInfo?.sales.num} precision={2}
                           suffix={
                             IncreaseOrDecreaseLabel(
                               (weeklyInfo?.sales.increase === undefined) ? 0 : weeklyInfo.sales.increase
                             )
                           }
                />
              </Skeleton>
            </Col>
            <Col sm={8} xs={24}>
              <Skeleton loading={isLoading}>
                <Statistic title="总收入" value={weeklyInfo?.income.num} precision={2}
                           suffix={
                             IncreaseOrDecreaseLabel(
                               (weeklyInfo?.income.increase === undefined) ? 0 : weeklyInfo.income.increase
                             )
                           }
                />
              </Skeleton>
            </Col>
            {/*图表*/}
            <Col sm={12} xs={24}>
              <Spin spinning={isLoading}>
                {/*该周各客户类型的销售额*/}
                <div id="perClientTypeChart" style={{height: 350}}/>
              </Spin>
            </Col>
            <Col sm={12} xs={24}>
              <Spin spinning={isLoading}>
                {/*该周各个品牌的销售额*/}
                <div id="perBrandChart" style={{height: 350}}/>
              </Spin>
            </Col>
            <Col sm={12} xs={24}>
              <Spin spinning={isLoading}>
                {/*该周各类状态订单的统计*/}
                <div id="perStateChart" style={{height: 350}}/>
              </Spin>
            </Col>
            <Col sm={12} xs={24}>
              <Spin spinning={isLoading}>
                {/*该周是否开票订单的统计*/}
                <div id="writeAnInvoiceChart" style={{height: 350}}/>
              </Spin>
            </Col>
            <Col sm={24} xs={24}>
              <Spin spinning={isLoading}>
                {/*该周各天订单统计*/}
                <div id="perDayChart" style={{height: 350}}/>
              </Spin>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default WeeklyStatistics;