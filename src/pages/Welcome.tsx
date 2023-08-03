// import { useModel,FormattedMessage } from '@umijs/max';
import { Button, Card, Progress, Select } from 'antd';
import React, { useEffect, useState } from 'react';
// import { connect, useDispatch } from '@umijs/plugins/libs/dva';
import { EyeInvisibleOutlined, EyeOutlined, SmileOutlined } from '@ant-design/icons';
import * as echarts from 'echarts';
import styles from './Welcome.less';
const Welcome: React.FC = () => {
  // const dispatch = useDispatch();
  const [
    randomNumber,
    // , setRandomNumber
  ] = useState(68);
  const [electricityChangeValue, setElectricityChangeValue] = useState(4);
  const [seeElectricity, setSeeElectricity] = useState(false);
  let ElectricityConsumptionChart: any;
  let GaugeChart: any;
  let DistributionElectricity: any;
  let weatherHandle: any;
  useEffect(() => {
    ElectricityConsumptionChart();
    GaugeChart();
    DistributionElectricity(electricityChangeValue);
    // getDashboard({});
    weatherHandle();
    // addDashboard({
    //   id:1,
    //   body:{
    //     page:1,
    //     pageSize:10
    //   }
    // })
  }, [electricityChangeValue]);
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
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
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
          max: 10,
          Progress: {
            show: true,
          },
          axisLine: {
            lineStyle: {
              width: 20,
              color: [
                [0.2, '#67e0e3'],
                [0.8, '#37a2da'],
                [1, '#fd666d'],
              ],
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 5,
            },
          },
          pointer: {
            itemStyle: {
              color: 'auto',
            },
          },
          axisTick: {
            distance: -20,
            length: 10,
            lineStyle: {
              color: '#eee',
              width: 2,
            },
          },
          splitLine: {
            distance: -25,
            length: 22,
            lineStyle: {
              color: '#ccc',
              width: 4,
            },
          },
          axisLabel: {
            color: 'inherit',
            distance: 28,
            fontSize: 10,
          },
          detail: {
            valueAnimation: true,
            formatter: '{value} kw',
            color: 'inherit',
            fontSize: 17,
            offsetCenter: [0, '30%'],
          },
          data: [
            {
              value: 9.99,
            },
          ],
        },
      ],
    };
    setInterval(function () {
      myChart.setOption({
        series: [
          {
            data: [
              {
                value: +(Math.random() * 10).toFixed(2),
              },
            ],
          },
        ],
      });
    }, 4000);
    myChart.setOption(option);
  };
  DistributionElectricity = (index: number) => {
    const chartDom: any = document.getElementById('distributionElectricity');
    const myChart: any = echarts.init(chartDom);
    let data: any = [
      ['06:11', 0],
      ['06:12', 33],
      ['06:13', 26],
      ['06:14', 29],
      ['06:15', 24],
      ['06:16', 0],
      ['06:17', 0],
      ['06:18', 0],
      ['06:19', 0],
    ];
    let option = {
      tooltip: {
        order: 'valueDesc',
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        nameLocation: 'middle',
      },
      yAxis: {
        name: 'KW',
      },
      legend: {},
      // grid: {
      //   right: 140
      // },
      series: [
        {
          name: 'Home',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          sampling: 'average',
          itemStyle: {
            color: '#3e6be2',
          },
          stack: 'a',
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(58,77,233,0.8)',
              },
              {
                offset: 1,
                color: 'rgba(58,77,233,0.3)',
              },
            ]),
          },
          // data: [['06:11',0],['06:12',0],['06:13',27],['06:14',20],['06:15',0],['06:16',0],['06:17',26],['06:18',22],['06:19',31]]
          data: data,
        },
        {
          name: 'PV',
          type: 'line',
          smooth: true,
          stack: 'c',
          symbol: 'circle',
          symbolSize: 5,
          sampling: 'average',
          itemStyle: {
            color: '#fcbf01',
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(213,72,120,0.8)',
              },
              {
                offset: 1,
                color: 'rgba(213,72,120,0.3)',
              },
            ]),
          },
          data: [
            ['06:11', 0],
            ['06:12', 0],
            ['06:13', 0],
            ['06:14', 23],
            ['06:15', 22],
            ['06:16', 24],
            ['06:17', 0],
            ['06:18', 22],
            ['06:19', 24],
          ],
        },
        {
          name: 'EV',
          type: 'line',
          smooth: true,
          stack: 'b',
          symbol: 'circle',
          symbolSize: 5,
          sampling: 'average',
          itemStyle: {
            color: '#f65554',
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(213,72,120,0.8)',
              },
              {
                offset: 1,
                color: 'rgba(213,72,120,0.3)',
              },
            ]),
          },
          data: [
            ['06:11', 0],
            ['06:12', 0],
            ['06:13', 0],
            ['06:14', 0],
            ['06:15', 14],
            ['06:16', 13],
            ['06:17', 16],
            ['06:18', 0],
            ['06:19', 0],
          ],
        },
        {
          name: 'BAT',
          type: 'line',
          smooth: true,
          stack: 'd',
          symbol: 'circle',
          symbolSize: 5,
          sampling: 'average',
          itemStyle: {
            color: '#0bab5c',
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(213,72,120,0.8)',
              },
              {
                offset: 1,
                color: 'rgba(213,72,120,0.3)',
              },
            ]),
          },
          // data: [['06:11',0],['06:12',33],['06:13',26],['06:14',29],['06:15',24],['06:16',0],['06:17',0],['06:18',0],['06:19',0]]
          data: data,
        },
        {
          name: 'Grid',
          type: 'line',
          smooth: true,
          stack: 'e',
          symbol: 'circle',
          symbolSize: 5,
          sampling: 'average',
          itemStyle: {
            color: '#77797b',
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(213,72,120,0.8)',
              },
              {
                offset: 1,
                color: 'rgba(213,72,120,0.3)',
              },
            ]),
          },
          data: [
            ['06:11', 22],
            ['06:12', 21],
            ['06:13', 24],
            ['06:14', 0],
            ['06:15', 0],
            ['06:16', 0],
            ['06:17', 24],
            ['06:18', 0],
            ['06:19', 0],
          ],
        },
      ],
    };

    if (index) {
      option.series = [option.series[index - 1]];
    } else {
      myChart.setOption(option);
    }
    myChart.setOption(option);
  };
  weatherHandle = async () => {
    // getCurrentWeather({
    //   lat:"22.605824",
    //   lon:"113.839096",
    //   api:weatherAPI
    // })
  };
  const electricityChange = (index: number) => {
    setElectricityChangeValue(index);
  };
  return (
    // <PageContainer ghost>
    <div className={styles.container}>
      {/* <Guide name={trim(name)} /> */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
          gridTemplateAreas: `"aa aa aa bb bb bb cc cc cc"
        "dd dd dd dd dd dd ee ee ee"`,
          gridGap: '1rem',
        }}
      >
        <Card
          title="Electricity consumption"
          style={{ gridArea: 'aa' }}
          extra={<a href="#">More</a>}
        >
          <div
            id="ElectricityConsumption"
            style={{ width: 'auto', height: '14rem', alignItems: 'center' }}
          ></div>
        </Card>
        <Card title="Self-sufficiency" style={{ gridArea: 'bb' }} extra={<a href="#">More</a>}>
          <p>Everything is working fine in your system</p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Progress
              type="circle"
              strokeWidth={15}
              percent={randomNumber}
              strokeColor={{ '0%': '#ccc', '100%': '#24d081' }}
            />
            <p style={{ marginTop: '2rem' }}>
              you can be stronger <SmileOutlined style={{ color: '#13c2c2' }} />
            </p>
          </div>
        </Card>
        <Card title="Inverter Power" style={{ gridArea: 'cc' }} extra={<a href="#">More</a>}>
          <div id="Gauge" style={{ width: '100%', height: '13rem', alignItems: 'center' }}></div>
        </Card>
        <Card
          title="Distribution of Electricity"
          style={{ gridArea: 'dd' }}
          extra={
            <>
              {seeElectricity && (
                <Select
                  defaultValue={electricityChangeValue}
                  style={{ width: 100 }}
                  onChange={electricityChange}
                  bordered={false}
                  options={[
                    { value: 1, label: 'Home' },
                    { value: 2, label: 'PV' },
                    { value: 3, label: 'EV' },
                    { value: 4, label: 'BAT' },
                    { value: 5, label: 'Grid' },
                  ]}
                />
              )}
              <Button
                type="text"
                size="small"
                shape="circle"
                onClick={() => {
                  setSeeElectricity(!seeElectricity);
                }}
                icon={
                  seeElectricity ? (
                    <EyeOutlined style={{ fontSize: 18, color: '#1677ff' }} />
                  ) : (
                    <EyeInvisibleOutlined style={{ fontSize: 18, opacity: 0.3 }} />
                  )
                }
              />
            </>
          }
        >
          <div
            id="distributionElectricity"
            style={{ width: 'auto', height: '25rem', alignItems: 'center' }}
          ></div>
        </Card>
        <Card
          title="CO2 savings of the system"
          style={{
            backgroundImage:
              "url('https://ems-public.oss-cn-beijing.aliyuncs.com/%E6%A0%91%E5%8F%B6')",
            backgroundPosition: '-20% 50%',
            backgroundSize: '60%',
            backgroundRepeat: 'no-repeat',
            gridArea: 'ee',
          }}
          extra={<a href="#">More</a>}
        >
          <div className={styles.co2}>
            <div className={styles.co2div}>
              <p className={styles.title}>2.7 kg CO2</p>
              <p className={styles.p}>Corresponds to 32 Car km</p>
              <p className={styles.des}>Savings today</p>
            </div>
            <div className={styles.co2div}>
              <p className={styles.title}>1.1 t CO2</p>
              <p className={styles.p}>Corresponds to 9.616 Car km</p>
              <p className={styles.des}>EMS since installation</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
    // </PageContainer>
  );
};

export default Welcome;
