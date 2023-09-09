import { BATdata, EVdata, GRIDdata, HOMEdata, PVdata, WorkingModeStatusColor } from '@/constants';
import { getHomeElectricity } from '@/services/dashboard/dashboard';
import { useModel } from '@umijs/max';
import { Button, Card, Progress, Select } from 'antd';
import React, { useEffect, useState } from 'react';
// import { connect, useDispatch } from '@umijs/plugins/libs/dva';
import { command } from '@/services/ant-design-pro/device';
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  SettingTwoTone,
  SmileOutlined,
} from '@ant-design/icons';
import * as echarts from 'echarts';
import moment from 'moment';
import styles from './Welcome.less';

const Welcome: React.FC = () => {
  // const dispatch = useDispatch();
  const [
    randomNumber,
    // , setRandomNumber
  ] = useState(68);
  const [electricityChangeValue, setElectricityChangeValue] = useState(1);
  const [historyChangeValue, setHistoryChangeValue] = useState(1);
  const [seeElectricity, setSeeElectricity] = useState(false);
  const [workingModeData, setWorkingModeData] = useState(0);
  const { initialState } = useModel('@@initialState');
  // const { currentUser, locationIndex } = initialState;
  let ElectricityConsumptionChart: any;
  let GaugeChart: any;
  let DistributionElectricity: any;
  let weatherHandle: any;
  useEffect(() => {
    // ElectricityConsumptionChart();
    // GaugeChart();
    DistributionElectricity(electricityChangeValue);
  }, [electricityChangeValue, seeElectricity]);
  useEffect(() => {
    getHomeElectricity({
      id: initialState?.currentUser?.terminals[
        initialState.locationIndex ? initialState.locationIndex : 0
      ].id,
      startTime: parseInt(moment().startOf('day').format('X')),
      endTime: parseInt(moment().endOf('day').format('X')),
    });
  }, [initialState?.locationIndex]);
  useEffect(() => {
    ElectricityConsumptionChart();
    GaugeChart(initialState?.liveView?.PV[0].power);
    // DistributionElectricity(electricityChangeValue);
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
  GaugeChart = (val: number = 0) => {
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
              value: val,
            },
          ],
        },
      ],
    };
    // setInterval(function () {
    //   myChart.setOption({
    //     series: [
    //       {
    //         data: [
    //           {
    //             value: +(Math.random() * 10).toFixed(2),
    //           },
    //         ],
    //       },
    //     ],
    //   });
    // }, 4000);
    myChart.setOption(option);
  };
  DistributionElectricity = (index: number) => {
    const chartDom: any = document.getElementById('distributionElectricity');
    const myChart: any = echarts.init(chartDom);
    let option = {
      tooltip: {
        order: 'valueDesc',
        trigger: 'axis',
      },
      // legend: {
      //   data: ['06:00', '12:00', '18:00']
      // },
      // grid: {
      //   left: 0,
      //   right: '5%',
      //   bottom: 0,
      //   containLabel: true,
      // },
      xAxis: {
        type: 'category',
        nameLocation: 'middle',
        boundaryGap: ['80%', '0%'],
      },
      yAxis: {
        name: 'KW',
      },
      // grid: {
      //   right: 140
      // },
      series: [
        {
          name: 'Home',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 0,
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
          data: HOMEdata,
        },
        {
          name: 'BAT',
          type: 'line',
          smooth: true,
          stack: 'a',
          symbol: 'circle',
          symbolSize: 0,
          sampling: 'average',
          itemStyle: {
            color: '#0bab5c',
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(59,187,124,0.7)',
              },
              {
                offset: 1,
                color: 'rgba(59,187,124,0.2)',
              },
            ]),
          },
          data: BATdata,
        },
        {
          name: 'PV', //光伏
          type: 'line',
          smooth: true,
          stack: 'a',
          symbol: 'circle',
          symbolSize: 0,
          sampling: 'average',
          itemStyle: {
            color: '#fcbf01',
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(252,203,51,0.8)',
              },
              {
                offset: 1,
                color: 'rgba(252,203,51,0.3)',
              },
            ]),
          },
          data: PVdata,
        },
        {
          name: 'EV',
          type: 'line',
          smooth: true,
          stack: 'b',
          symbol: 'circle',
          symbolSize: 0,
          sampling: 'average',
          itemStyle: {
            color: '#f65554',
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(247,119,118,0.8)',
              },
              {
                offset: 1,
                color: 'rgba(247,119,118,0.3)',
              },
            ]),
          },
          data: EVdata,
        },
        {
          name: 'Grid',
          type: 'line',
          smooth: true,
          stack: 'a',
          symbol: 'circle',
          symbolSize: 0,
          sampling: 'average',
          itemStyle: {
            color: '#77797b',
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(95,96,98,0.8)',
              },
              {
                offset: 1,
                color: 'rgba(95,96,98,0.3)',
              },
            ]),
          },
          data: GRIDdata,
        },
      ],
    };
    let optiondata = option;
    if (!seeElectricity) {
      optiondata.series = [option.series[index - 1]];
      myChart.clear();
      myChart.setOption(optiondata);
    } else {
      myChart.clear();
      if (index === 1) {
        optiondata.series = [option.series[1], option.series[2], option.series[4]];
      } else if (index === 2) {
        optiondata.series = [option.series[1], option.series[2], option.series[4]];
      } else if (index === 3) {
        optiondata.series = [option.series[1], option.series[2], option.series[4]];
      } else if (index === 4) {
        optiondata.series = [option.series[1], option.series[2], option.series[4]];
      } else if (index === 5) {
        optiondata.series = [option.series[1], option.series[2], option.series[4]];
      }

      myChart.setOption(option);
    }
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
  const historyChange = (index: number) => {
    setHistoryChangeValue(index);
  };
  const modelHandleChange = (val: number) => {
    setWorkingModeData(val);
    command({
      WorkingMode: val,
      id: initialState.currentUser.terminals[
        initialState.locationIndex ? initialState.locationIndex : 0
      ].id,
    });
  };
  // console.log(initialState);
  console.log(moment().startOf('day').format('X'));

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
        <Card
          title="Self-sufficiency"
          style={{ gridArea: 'bb' }}
          extra={
            <>
              <SettingTwoTone spin twoToneColor={WorkingModeStatusColor[workingModeData]} />
              <Select
                defaultValue={
                  initialState?.currentUser.terminals[
                    initialState.locationIndex ? initialState.locationIndex : 0
                  ].WorkingMode
                }
                style={{ width: 100 }}
                value={
                  initialState?.currentUser.terminals[
                    initialState.locationIndex ? initialState.locationIndex : 0
                  ].WorkingMode
                }
                bordered={false}
                onChange={modelHandleChange}
                options={[
                  { value: 0, label: '自发自用' },
                  { value: 1, label: '经济' },
                  { value: 2, label: '应急' },
                ]}
              />
            </>
          }
        >
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
              {
                <Select
                  defaultValue={electricityChangeValue}
                  style={{ width: 85 }}
                  onChange={electricityChange}
                  bordered={false}
                  options={[
                    { value: 1, label: 'Home' },
                    { value: 2, label: 'BAT' },
                    { value: 3, label: 'PV' },
                    { value: 4, label: 'EV' },
                    { value: 5, label: 'Grid' },
                  ]}
                />
              }
              <Button
                type="text"
                size="small"
                shape="circle"
                style={{ marginRight: '2rem' }}
                disabled={electricityChangeValue !== 1}
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
              {
                <Select
                  defaultValue={historyChangeValue}
                  style={{ width: 85 }}
                  onChange={historyChange}
                  bordered={false}
                  options={[
                    { value: 1, label: 'Day' },
                    { value: 2, label: 'Month' },
                    { value: 3, label: 'Year' },
                  ]}
                />
              }
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
