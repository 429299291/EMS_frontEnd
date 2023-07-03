// import { useModel,FormattedMessage } from '@umijs/max';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Progress, Row } from 'antd';
import React, { useEffect, useState } from 'react';
// import { connect, useDispatch } from '@umijs/plugins/libs/dva';
import { SunnyWeather } from '@/constants';
import { SmileOutlined } from '@ant-design/icons';
import * as echarts from 'echarts';
import styles from './Welcome.less';
const Welcome: React.FC = () => {
  // const dispatch = useDispatch();
  const [
    randomNumber,
    // , setRandomNumber
  ] = useState(68);
  let ElectricityConsumptionChart: any;
  let GaugeChart: any;
  let DistributionElectricity: any;
  let weatherHandle: any;
  useEffect(() => {
    ElectricityConsumptionChart();
    GaugeChart();
    DistributionElectricity();
    // getDashboard({});
    weatherHandle();
    // addDashboard({
    //   id:1,
    //   body:{
    //     page:1,
    //     pageSize:10
    //   }
    // })
  }, []);
  // const learnInterval: any = setInterval(function () {
  //   clearInterval(learnInterval);
  //   setRandomNumber(Math.ceil(Math.random() * 10) + 80);
  // }, 5000);
  ElectricityConsumptionChart = () => {
    const chartDom: any = document.getElementById('ElectricityConsumption');
    const myChart = echarts.init(chartDom);
    let option: any = {};
    option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '0',
        left: 'center',
      },
      series: [
        {
          name: "Today's details",
          type: 'pie',
          radius: ['40%', '60%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 5,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: 'Grid' },
            { value: 735, name: 'Battery' },
            { value: 580, name: 'Solar' },
            { value: 580, name: 'Solar2' },
            { value: 580, name: 'Solar3' },
            { value: 580, name: 'Solar4' },
          ],
        },
      ],
    };
    myChart.setOption(option);
  };
  GaugeChart = () => {
    const chartDom: any = document.getElementById('Gauge');
    const myChart = echarts.init(chartDom);
    let option = {
      series: [
        {
          type: 'gauge',
          center: ['50%', '70%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 10,
          splitNumber: 10,
          itemStyle: {
            color: '#FFAB91',
          },
          progress: {
            show: true,
            width: 30,
          },
          pointer: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              width: 30,
            },
          },
          axisTick: {
            distance: -45,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          splitLine: {
            distance: -52,
            length: 14,
            lineStyle: {
              width: 3,
              color: '#333',
            },
          },
          axisLabel: {
            distance: -0,
            color: '#ff6666',
            fontSize: 10,
          },
          anchor: {
            show: false,
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            width: '30%',
            lineHeight: 40,
            borderRadius: 8,
            offsetCenter: [0, '-5%'],
            fontSize: 13,
            fontWeight: 'bolder',
            formatter: '{value} kw',
            color: '#ff3333',
          },
          data: [
            {
              value: 20,
            },
          ],
        },
        {
          type: 'gauge',
          center: ['50%', '70%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 10,
          itemStyle: {
            color: '#FD7347',
          },
          progress: {
            show: true,
            width: 8,
          },
          pointer: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          detail: {
            show: false,
          },
          data: [
            {
              value: 20,
            },
          ],
        },
      ],
    };
    setInterval(function () {
      const random = +(Math.random() * 5 + 3).toFixed(2);
      myChart.setOption({
        series: [
          {
            data: [
              {
                value: random,
              },
            ],
          },
          {
            data: [
              {
                value: random,
              },
            ],
          },
        ],
      });
    }, 3000);
    myChart.setOption(option);
  };
  DistributionElectricity = () => {
    const chartDom: any = document.getElementById('distributionElectricity');
    const myChart: any = echarts.init(chartDom);
    let option = {
      title: {
        text: 'Distribution of Electricity',
        subtext: 'Data',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      // toolbox: {
      //   show: true,
      //   feature: {
      //     saveAsImage: {}
      //   }
      // },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        // prettier-ignore
        data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45'],
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} W',
        },
        axisPointer: {
          snap: true,
        },
      },
      visualMap: {
        show: false,
        dimension: 0,
        pieces: [
          {
            lte: 6,
            color: 'green',
          },
          {
            gt: 6,
            lte: 8,
            color: 'red',
          },
          {
            gt: 8,
            lte: 14,
            color: 'green',
          },
          {
            gt: 14,
            lte: 17,
            color: 'red',
          },
          {
            gt: 17,
            color: 'green',
          },
        ],
      },
      series: [
        {
          name: 'Electricity',
          type: 'line',
          smooth: true,
          // prettier-ignore
          data: [300, 280, 250, 260, 270, 300, 450, 600, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
          markArea: {
            itemStyle: {
              color: 'rgba(255, 173, 177, 0.4)',
            },
            data: [
              [
                {
                  name: 'Morning Peak',
                  xAxis: '07:30',
                },
                {
                  xAxis: '10:00',
                },
              ],
              [
                {
                  name: 'Evening Peak',
                  xAxis: '17:30',
                },
                {
                  xAxis: '21:15',
                },
              ],
            ],
          },
        },
      ],
    };
    myChart.setOption(option);
  };
  weatherHandle = () => {
    // getCurrentWeather({
    //   lat:"22.605824",
    //   lon:"113.839096",
    //   api:weatherAPI
    // })
  };
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        {/* <Guide name={trim(name)} /> */}
        <Row
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 50px)',
            columnGap: '0px',
          }}
        >
          <span>Sunny</span>
          <SunnyWeather type="icon-sun" style={{ fontSize: 18 }} />
          <span style={{ marginLeft: '1rem' }}>26°C</span>
        </Row>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridColumnGap: '1rem' }}>
          <Card title="Electricity consumption" extra={<a href="#">More</a>}>
            <div
              id="ElectricityConsumption"
              style={{ width: 'auto', height: '14rem', alignItems: 'center' }}
            ></div>
          </Card>
          <Card title="Self-sufficiency" extra={<a href="#">More</a>}>
            <p>In your system everything is working fine</p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '1rem',
              }}
            >
              <Progress
                type="circle"
                percent={randomNumber}
                strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
              />
              <p style={{ marginTop: '2rem' }}>
                you can be stronger <SmileOutlined style={{ color: '#13c2c2' }} />
              </p>
            </div>
          </Card>
          <Card title="Inverter Power" extra={<a href="#">More</a>}>
            {/* <p>Approx. Price optimization savings for the day</p> */}
            <div id="Gauge" style={{ width: '100%', height: '12rem', alignItems: 'center' }}></div>
          </Card>
        </div>
        <br></br>
        <div
          id="distributionElectricity"
          style={{ width: 'auto', height: '25rem', alignItems: 'center' }}
        ></div>
        {/* <img src={home}></img>
      <img src={grid}></img> */}
      </div>
    </PageContainer>
  );
};

export default Welcome;
