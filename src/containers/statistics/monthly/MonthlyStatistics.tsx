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
import {getMonthlyStatistics} from "../../../api/StatisticsApi";

// echarts
const echarts = require('echarts');
// 图表里的字体大小
const fontSize = ChartConfig.fontSize;

// 某一月份的统计信息
interface MonthlyInfo {
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
function MonthlyStatistics(props: any) {
  // 加载状态
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // 某一天所需数据
  const [month, setMonth] = useState<string>(moment().format(DateFormat.monthFormat));
  const [monthlyInfo, setMonthlyInfo] = useState<MonthlyInfo>();

  // 设置该月各客户类型销售额的统计图
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
        text: month+' 各客户类型的销售金额',
      }],
      tooltip: {
        trigger: 'item',
        // formatter: '{b} : {c[1]} ({d}%)<br/>对比上个月({@increase}%)'
        formatter: (params:any, _:any, __:any) => {
          // console.log(params);
          let num = params.value[1];
          let increase = params.value[2];
          let increaseLabel = increase >= 0 ? '+' : '';
          return params.name + ' : ' + num + ' (' + params.percent + '%)<br/>'+
            '对比上个月' + increaseLabel + increase + '%';
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

  // 设置该月各品牌的销售额统计图
  function initPerBrandChart(data: {name: string, num: number, increase: number}[]) {
    let dom = document.getElementById("perBrandChart");
    let myChart = echarts.init(dom, ChartConfig.theme);
    let app = {};
    let option = null;

    // 处理数据
    let afterData = data.map(item => [item.name, item.num, item.increase]);
    option = {
      title: [{
        text: month+' 各品牌的销售金额',
      }],
      tooltip: {
        trigger: 'item',
        formatter: (params:any, _:any, __:any) => {
          // console.log(params);
          let num = params.value[1];
          let increase = params.value[2];
          let increaseLabel = increase >= 0 ? '+' : '';
          return params.name + ' : ' + num + ' (' + params.percent + '%)<br/>'+
            '对比上个月' + increaseLabel + increase + '%';
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

  // 设置该月的各类订单状态的统计
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
        text: month+' 各种订单状态统计',
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

  // 设置该月的是否开票订单的统计
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
        text: month+' 是否开票订单统计',
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

  // 设置该月各天的订单统计图
  function initPerDayChart(data: {date: string, num: number, sales: number, income: number}[]) {
    let dom = document.getElementById("perDayChart");
    let myChart = echarts.init(dom, ChartConfig.theme);
    let app = {};
    let option = null;

    // 处理数据
    let hourData = data.map(item => [item.date, item.num, item.sales, item.income]);
    let xAxisData = data.map(item => item.date); // x轴需要哪些日期

    option = {
      title: [{
        text: month + ' 月各天订单统计图',
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
      // 天数太多，不显示label
      // label: {
      //   show: true,
      //   position: 'top',
      //   fontSize: fontSize
      // },
      series: [
        {
          name: '销售额',
          type: 'bar',
          barGap: 0,
          data: hourData.map(item => [item[0], item[2]])
        },
        {
          name: '收入',
          type: 'bar',
          yAxisIndex: 1,
          data: hourData.map(item => [item[0], item[3]])
        },
        {
          name: '订单数量',
          type: 'bar',
          yAxisIndex: 2,
          data: hourData.map(item => [item[0], item[1]])
        }
      ]
    };
    if (option && typeof option === "object") {
      myChart.setOption(option, true);
    }
  };

  // 获取并设置某一月份的月报，首次加载和设置月份后触发
  useEffect(() => {
    setIsLoading(true);
    // 某一天的月报
    const api_getMonthlyStatistics = getMonthlyStatistics({month: month});
    api_getMonthlyStatistics.then(response => {
      let monthlyInfo: MonthlyInfo = response.data;
      setMonthlyInfo(monthlyInfo);
      initPerClientTypeChart(monthlyInfo.perClientType);
      initPerBrandChart(monthlyInfo.perBrand);
      initPerStateChart(monthlyInfo.perState);
      initWriteAnInvoiceChart(monthlyInfo.writeAnInvoice);
      initPerDayChart(monthlyInfo.perDay);
      // 设置加载完成状态
      setIsLoading(false);
    }).catch(reason => {
      notification.error({message: '发生了错误', description: reason.toString()});
    }).finally(() => {
    });
    // 假数据
    // let monthlyPerDay = [];
    // for(let i = 1; i <= 21; i++){
    //   let date = '2020/05/' + ((i < 10) ? '0' : '') + i;
    //   let num = Math.floor(Math.random()*30);
    //   let sales = Math.floor(Math.random()*4000);
    //   let income = Math.floor(Math.random()*600);
    //   monthlyPerDay.push({date: date, num: num, sales: sales, income: income});
    // }
    // console.log(monthlyPerDay)
    // let monthlyInfo: MonthlyInfo = {
    //   sales: {num: (Math.random()*70000), increase: Math.random()*15},
    //   income: {num: Math.random()*10000, increase: -Math.random()*5},
    //   perClientType: [
    //     {num: Math.floor(Math.random()*1100), increase: 6.3}, {num: Math.floor(Math.random()*1100), increase: 5.3}, {num: Math.floor(Math.random()*1100), increase: 6.1}
    //   ],
    //   perBrand: [
    //     {name: "LINING", num: Math.floor(Math.random()*1500), increase: 9.5},
    //     {name: "WILSON", num: Math.floor(Math.random()*1500), increase: 14.3},
    //     {name: "YONEX", num: Math.floor(Math.random()*1500), increase: -3.9}
    //   ],
    //   perState: [2, 1, 1, 30, 3, 60],
    //   writeAnInvoice: [Math.floor(Math.random()*150), Math.floor(Math.random()*50)],
    //   perDay: monthlyPerDay
    // };
    // setMonthlyInfo(monthlyInfo);
    // initPerClientTypeChart(monthlyInfo.perClientType);
    // initPerBrandChart(monthlyInfo.perBrand);
    // initPerStateChart(monthlyInfo.perState);
    // initWriteAnInvoiceChart(monthlyInfo.writeAnInvoice);
    // initPerDayChart(monthlyInfo.perDay);
    // // 设置加载完成状态
    // setIsLoading(false);
  }, [month]);

  // 处理参数表单的提交
  function onFinish(values:any) {
    console.log('Received values of form: ', values);
    // 处理数据并发起请求
    // 某一月期
    if(values.monthToShow){
      let tempMonth = values.monthToShow.format(DateFormat.monthFormat);
      if(tempMonth !== month){  // 与之前不同时才发起请求
        console.log("month", tempMonth);
        // 设置month触发获取数据和更新
        setMonth(tempMonth);
      }
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
            <Form.Item label={"月份"} name="monthToShow">
              <DatePicker
                placeholder="请选择一个月份"
                format={DateFormat.monthFormat}
                picker={'month'}
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
        {/*该月的统计信息*/}
        <Card>
          <Row gutter={[16, 32]}>
            {/*统计信息*/}
            <Col sm={8} xs={24}>
              <Skeleton loading={isLoading}>
                <Statistic title="月期" value={month} />
              </Skeleton>
            </Col>
            <Col sm={8} xs={24}>
              <Skeleton loading={isLoading}>
                <Statistic title="总销售额" value={monthlyInfo?.sales.num} precision={2}
                           suffix={
                             IncreaseOrDecreaseLabel(
                               (monthlyInfo?.sales.increase === undefined) ? 0 : monthlyInfo.sales.increase
                             )
                           }
                />
              </Skeleton>
            </Col>
            <Col sm={8} xs={24}>
              <Skeleton loading={isLoading}>
                <Statistic title="总收入" value={monthlyInfo?.income.num} precision={2}
                           suffix={
                             IncreaseOrDecreaseLabel(
                               (monthlyInfo?.income.increase === undefined) ? 0 : monthlyInfo.income.increase
                             )
                           }
                />
              </Skeleton>
            </Col>
            {/*图表*/}
            <Col sm={12} xs={24}>
              <Spin spinning={isLoading}>
                {/*该月各客户类型的销售额*/}
                <div id="perClientTypeChart" style={{height: 350}}/>
              </Spin>
            </Col>
            <Col sm={12} xs={24}>
              <Spin spinning={isLoading}>
                {/*该月各个品牌的销售额*/}
                <div id="perBrandChart" style={{height: 350}}/>
              </Spin>
            </Col>
            <Col sm={12} xs={24}>
              <Spin spinning={isLoading}>
                {/*该月各类状态订单的统计*/}
                <div id="perStateChart" style={{height: 350}}/>
              </Spin>
            </Col>
            <Col sm={12} xs={24}>
              <Spin spinning={isLoading}>
                {/*该月是否开票订单的统计*/}
                <div id="writeAnInvoiceChart" style={{height: 350}}/>
              </Spin>
            </Col>
            <Col sm={24} xs={24}>
              <Spin spinning={isLoading}>
                {/*该月份各天的订单统计*/}
                <div id="perDayChart" style={{height: 350}}/>
              </Spin>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default MonthlyStatistics;