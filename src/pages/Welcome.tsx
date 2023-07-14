// import { useModel,FormattedMessage } from '@umijs/max';
import { Card, Progress } from 'antd';
import React, { useEffect, useState } from 'react';
// import { connect, useDispatch } from '@umijs/plugins/libs/dva';
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
  DistributionElectricity = () => {
    const chartDom: any = document.getElementById('distributionElectricity');
    const myChart: any = echarts.init(chartDom);
    let option = {
      title: {
        // text: 'All consumption details of the day',
        subtext: 'All consumption details of the day',
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
      grid: {
        // left:'5%',
        right: 0,
      },
      xAxis: {
        type: 'category',
        offset: 0,
        boundaryGap: false,
        // prettier-ignore
        // data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45'],
        data:['00:00','00:05','00:10','00:15','00:20','00:25','00:30','00:35','00:40','00:45','00:50','00:55','01:00','01:05','01:10','01:15','01:20','01:25','01:30','01:35','01:40','01:45','01:50','01:55','02:00','02:05','02:10','02:15','02:20','02:25','02:30','02:35','02:40','02:45','02:50','02:55','03:00','03:05','03:10','03:15','03:20','03:25','03:30','03:35','03:40','03:45','03:50','03:55','04:00','04:05','04:10','04:15','04:20','04:25','04:30','04:35','04:40','04:45','04:50','04:55','05:00','05:05','05:10','05:15','05:20','05:25','05:30','05:35','05:40','05:45','05:50','05:55','06:00','06:05','06:10','06:15','06:20','06:25','06:30','06:35','06:40','06:45','06:50','06:55','07:00','07:05','07:10','07:15','07:20','07:25','07:30','07:35','07:40','07:45','07:50','07:55','08:00','08:05','08:10','08:15','08:20','08:25','08:30','08:35','08:40','08:45','08:50','08:55','09:00','09:05','09:10','09:15','09:20','09:25','09:30','09:35','09:40','09:45','09:50','09:55','10:00','10:05','10:10','10:15','10:20','10:25','10:30','10:35','10:40','10:45','10:50','10:55','11:00','11:05','11:10','11:15','11:20','11:25','11:30','11:35','11:40','11:45','11:50','11:55','12:00','12:05','12:10','12:15','12:20','12:25','12:30','12:35','12:40','12:45','12:50','12:55','13:00','13:05','13:10','13:15','13:20','13:25','13:30','13:35','13:40','13:45','13:50','13:55','14:00','14:05','14:10','14:15','14:20','14:25','14:30','14:35','14:40','14:45','14:50','14:55','15:00','15:05','15:10','15:15','15:20','15:25','15:30','15:35','15:40','15:45','15:50','15:55','16:00','16:05','16:10','16:15','16:20','16:25','16:30','16:35','16:40','16:45','16:50','16:55','17:00','17:05','17:10','17:15','17:20','17:25','17:30','17:35','17:40','17:45','17:50','17:55','18:00','18:05','18:10','18:15','18:20','18:25','18:30','18:35','18:40','18:45','18:50','18:55','19:00','19:05','19:10','19:15','19:20','19:25','19:30','19:35','19:40','19:45','19:50','19:55','20:00','20:05','20:10','20:15','20:20','20:25','20:30','20:35','20:40','20:45','20:50','20:55','21:00','21:05','21:10','21:15','21:20','21:25','21:30','21:35','21:40','21:45','21:50','21:55','22:00','22:05','22:10','22:15','22:20','22:25','22:30','22:35','22:40','22:45','22:50','22:55','23:00','23:05','23:10','23:15','23:20','23:25','23:30','23:35','23:40','23:45','23:50','23:55'],
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} kw',
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
            lte: 90,
            color: 'green',
          },
          {
            gt: 90,
            lte: 120,
            color: 'red',
          },
          {
            gt: 120,
            lte: 210,
            color: 'green',
          },
          {
            gt: 210,
            lte: 255,
            color: 'red',
          },
          {
            gt: 255,
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
          // data: [300, 280, 250, 260, 270, 300, 450, 600, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
          data:['1.78','1.79','1.78','1.79','1.79','1.79','1.80','1.79','1.79','1.80','1.78','1.78','1.78','1.79','1.78','1.79','1.79','1.79','1.80','1.79','1.79','1.80','1.78','1.78','1.78','1.79','1.78','1.79','1.79','1.79','1.80','1.79','1.79','1.80','1.78','1.78','1.78','1.79','1.78','1.79','1.79','1.79','1.80','1.79','1.79','1.80','1.78','1.78','1.78','1.79','1.78','1.79','1.79','1.79','1.80','1.79','1.79','1.80','1.78','1.78','1.78','1.79','1.78','1.79','1.79','1.79','1.80','1.79','1.79','1.80','1.78','1.78','1.78','1.79','1.78','1.79','1.79','1.79','1.80','1.79','1.79','1.80','1.78','1.78','2.44','3.54','3.58','2.65','3.01','3.45','3.46','3.45','3.48','4.55','4.41','4.42','4.65','4.28','4.16','4.05','4.12','4.20','4.25','4.15','3.68','3.54','3.54','3.55','3.20','3.15','2.89','2.88','2.88','2.85','2.88','2.89','2.88','2.88','2.85','2.88','2.89','2.88','2.88','2.85','2.88','2.89','2.88','2.88','2.85','2.88','2.89','2.95','2.96','2.95','3.00','3.04','4.21','4.53','4.58','4.54','4.86','4.75','4.79','4.85','4.86','4.85','4.75','4.82','4.83','4.82','4.75','4.65','4.23','4.26','4.25','4.24','4.25','4.25','4.26','4.24','4.25','4.26','4.25','4.31','4.27','4.10','3.42','3.45','3.41','3.15','3.12','2.54','2.57','2.86','2.84','2.85','2.59','2.58','2.54','2.54','2.47','2.49','2.57','2.48','2.58','2.58','2.57','2.58','2.59','2.61','2.55','3.85','3.84','2.86','2.87','2.57','2.47','2.41','2.06','2.07','2.06','2.06','2.06','2.07','2.06','2.06','2.06','2.07','2.06','2.06','2.06','2.07','2.06','2.06','2.06','2.07','2.06','2.06','5.85','5.76','5.78','5.96','6.15','6.45','6.37','6.12','6.75','6.12','6.15','7.48','7.15','7.26','7.09','7.15','6.54','6.48','6.57','6.48','6.47','6.47','6.47','7.15','6.88','6.99','7.05','6.24','6.26','6.36','6.47','5.21','5.48','5.45','5.44','5.48','5.47','5.47','5.89','5.78','4.55','4.78','4.26','4.15','4.14','4.13','4.15','4.10','4.11','3.85','4.01','3.86','3.89','3.78','3.77','3.48','3.45','3.00','3.05','3.47','2.76','2.85','2.86','2.85','2.77','1.99','2.05','2.02','1.79','1.83'],
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
  weatherHandle = async () => {
    // getCurrentWeather({
    //   lat:"22.605824",
    //   lon:"113.839096",
    //   api:weatherAPI
    // })
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
          <p>In your system everything is working fine</p>
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
          extra={<a href="#">More</a>}
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
