import { WorkingModeStatus } from '@/constants';
import { DollarTwoTone } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Card, message, Popover } from 'antd';
import moment from 'moment';
import * as mqtt from 'mqtt';
import React, { useEffect, useState } from 'react';
import styles from './index.less';

interface mqttDto {
  name: string;
  id: string;
  timeStamp: number;
  WorkingMode: number;
  PV: [
    {
      id: string;
      power: number;
      volt: number;
    },
  ];
  BAT: [
    {
      id: string;
      power: number;
      SOC: number;
      SOH: number;
      maxTemp: number;
      minTemp: number;
      volt: number;
    },
  ];
  EV: [
    {
      id: string;
      power: number;
      volt: number;
      electricCurrent: number;
      status: number;
    },
  ];
  HOME: {
    home: {
      power: number;
      volt: number;
    };
    critical: {
      power: number;
      volt: number;
    };
  };
  GRID: {
    power: number;
    volt: number;
  };
  INV: [
    {
      id: string;
      power: number;
      volt: number;
    },
  ];
}
const LiveView: React.FC = () => {
  //   const { token } = theme.useToken();
  const [liveViewData, setLiveViewData] = useState<mqttDto>();
  const { initialState, setInitialState } = useModel('@@initialState');
  const currentTopic: any =
    initialState?.currentUser?.terminals[
      initialState.locationIndex ? initialState.locationIndex : 0
    ].id;
  const terminalslen: any = initialState?.currentUser?.terminals;
  let client: any;
  useEffect(() => {
    // 在组件加载后执行的代码
    return () => {
      //销毁执行代码
      message.destroy();
    };
  }, []);
  useEffect(() => {
    // 在组件加载后执行的代码
    if (!client) {
      client = mqtt.connect('mqtt://47.106.120.119:8083', {
        username: 'ems',
        password: 'xuheng8888',
        protocolId: 'MQTT',
        clientId: 'EMS-yun',
      });
    }
    client.on('connect', () => {
      for (let i = 0; i < terminalslen.length; i++) {
        client.unsubscribe(`EMS/client/${terminalslen[i].id}`, () => {});
      }

      client.subscribe(`EMS/client/${currentTopic}`, () => {
        console.log('订阅' + currentTopic);
      });
    });
    client.on('message', (topic: any, message: any) => {
      setInitialState({ ...initialState, liveView: JSON.parse(message.toString()) });
      setLiveViewData(JSON.parse(message.toString()));
    });
    return () => {
      //销毁执行代码
      client.end();
    };
  }, [currentTopic]);

  const contentPV = (liveViewData: mqttDto) => {
    return (
      <div>
        <p>设备ID:{liveViewData.PV[0].id}</p>
        <p>功率:{liveViewData.PV[0].power}kw</p>
        <p>电压:{liveViewData.PV[0].volt + 'v'}</p>
      </div>
    );
  };
  const contentBAT = (liveViewData: mqttDto) => {
    return (
      <div>
        <p>设备ID:{liveViewData.BAT[0].id}</p>
        <p>功率:{liveViewData.BAT[0].power}kw</p>
        <p>电压:{liveViewData.BAT[0].volt + 'v'}</p>
        <p>电量:{liveViewData.BAT[0].SOC}%</p>
        <p>健康度:{liveViewData.BAT[0].SOH}%</p>
        <p>最高温度:{liveViewData.BAT[0].maxTemp}°C</p>
        <p>最低温度:{liveViewData.BAT[0].minTemp}°C</p>
      </div>
    );
  };
  const contentEV = (liveViewData: mqttDto) => {
    return (
      <div>
        <p>设备ID:{liveViewData.EV[0].id}</p>
        <p>功率:{liveViewData.EV[0].power}kw</p>
        <p>电压:{liveViewData.EV[0].volt + 'v'}</p>
        <p>状态:{liveViewData.EV[0].status}</p>
        <p>电流:{liveViewData.EV[0].electricCurrent}</p>
      </div>
    );
  };
  const contentMaster = (liveViewData: mqttDto) => {
    const WorkingModeState: number =
      initialState?.currentUser?.terminals[
        initialState.locationIndex ? initialState.locationIndex : 0
      ].WorkingMode;
    return (
      <div>
        <p>
          终端ID:
          {
            initialState?.currentUser?.terminals[
              initialState.locationIndex ? initialState.locationIndex : 0
            ].id
          }
        </p>
        <p>主机名:{liveViewData.name}</p>
        <p>
          模式:
          {WorkingModeStatus[WorkingModeState]}
        </p>
        <p>
          电价:
          {
            initialState?.currentUser?.terminals[
              initialState.locationIndex ? initialState.locationIndex : 0
            ].location.electrovalency
          }
          <DollarTwoTone style={{ marginLeft: '3px' }} />
        </p>
        <p>
          供应商:
          {
            initialState?.currentUser?.terminals[
              initialState.locationIndex ? initialState.locationIndex : 0
            ].supplier
          }
        </p>
        <p>时间:{moment(liveViewData.timeStamp * 1000).format('YYYY-MM-DD HH:mm:ss')}</p>
      </div>
    );
  };
  const contentHOME = (liveViewData: mqttDto) => {
    return (
      <div>
        <p>Critical功率:{liveViewData.HOME.critical.power}kw</p>
        <p>Critical电压:{liveViewData.HOME.critical.volt + 'v'}</p>
        <p>家庭功率:{liveViewData.HOME.home.power}kw</p>
        <p>家庭电压:{liveViewData.HOME.home.volt + 'v'}</p>
      </div>
    );
  };
  const contentGRID = (liveViewData: mqttDto) => {
    return (
      <div>
        <p>功率:{liveViewData.GRID.power}kw</p>
        <p>电压:{liveViewData.GRID.volt + 'v'}</p>
      </div>
    );
  };
  if (!liveViewData) {
    message.destroy();
    message.loading(
      `${
        initialState?.currentUser?.terminals[
          initialState.locationIndex ? initialState.locationIndex : 0
        ].location.location
      }  数据加载中...`,
      0,
    );
  } else {
    message.destroy();
  }
  return (
    <>
      <Card
        className={styles.box}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <Popover content={liveViewData ? contentPV(liveViewData) : null} title="Solar">
          <div className={styles.solar}>
            <p>Solar</p>
            <span>{liveViewData ? liveViewData.PV[0].power + 'kw' : null}</span>
          </div>
        </Popover>
        <Popover content={liveViewData ? contentBAT(liveViewData) : null} title="Battery">
          <div
            className={styles.battery}
            style={{
              width: '6rem',
              background:
                "url('https://ems-public.oss-cn-beijing.aliyuncs.com/battery.png') no-repeat center/60%",
            }}
          >
            <p>Battery</p>
            <span>{liveViewData ? liveViewData.BAT[0].power + 'kw' : null}</span>
          </div>
        </Popover>
        <Popover content={liveViewData?.EV ? contentEV(liveViewData) : null} title="EV">
          <div className={styles.ev} style={{ opacity: liveViewData?.EV ? '1' : '0.3' }}>
            <p>EV</p>
            <span>{liveViewData?.EV && liveViewData.EV[0].power + 'kw'}</span>
          </div>
        </Popover>
        <Popover content={liveViewData ? contentMaster(liveViewData) : null} title="Terminal">
          <div className={styles.home}>
            {/* <p>HOME</p>
            <span>{liveViewData ? WorkingModeStatus[liveViewData.WorkingMode] : null}</span> */}
          </div>
        </Popover>
        <Popover content={liveViewData ? contentGRID(liveViewData) : null} title="Grid">
          <div className={styles.grid}>
            <p>Grid</p>
            <span>{liveViewData ? liveViewData.GRID.power + 'kw' : null}</span>
          </div>
        </Popover>
        <Popover content={liveViewData ? contentHOME(liveViewData) : null} title="House">
          <div className={styles.house}>
            <p>House</p>
            <span>
              {liveViewData && liveViewData.HOME
                ? (liveViewData.HOME.home.power + liveViewData.HOME.critical.power).toFixed(3) +
                  'kw'
                : null}
            </span>
          </div>
        </Popover>
        <svg className={liveViewData?.PV ? styles.solarlive : styles.solarlivenone}>
          <path
            fill="transparent"
            stroke="#ddd"
            strokeLinecap="round"
            name="光伏"
            strokeWidth="10"
            d="M0 80 350 80, 350 190 "
            className={styles.path}
          ></path>
          <path
            fill="transparent"
            stroke="#24d081"
            strokeLinecap="round"
            stopColor="#000"
            strokeWidth="10"
            d="M0 80 350 80, 350 190 "
            className={
              liveViewData && liveViewData.PV && liveViewData.PV[0].power ? styles.line2 : null
            }
          ></path>
          <path
            fill="transparent"
            stroke="#ddd"
            strokeLinecap="round"
            strokeWidth="10"
            d="M0 80 350 80, 350 190 "
            className={
              liveViewData && liveViewData.PV && liveViewData.PV[0].power ? styles.line1 : null
            }
          ></path>
        </svg>
        <svg className={liveViewData?.BAT ? styles.batterylive : styles.batterylivenone}>
          <path
            fill="transparent"
            stroke="#ddd"
            name="左中"
            strokeLinecap="round"
            strokeWidth="10"
            d={liveViewData && liveViewData.BAT[0].power > 0 ? 'M0 80 259 80 ' : 'M259 80 0 80'}
            className={styles.path}
          ></path>
          <path
            fill="transparent"
            stroke="#24d081"
            strokeLinecap="round"
            stopColor="#000"
            strokeWidth="10"
            d={liveViewData && liveViewData.BAT[0].power > 0 ? 'M0 80 259 80 ' : 'M259 80 0 80'}
            className={
              liveViewData && liveViewData.BAT && liveViewData.BAT[0].power ? styles.line2 : null
            }
          ></path>
          <path
            fill="transparent"
            stroke="#ddd"
            strokeLinecap="round"
            strokeWidth="10"
            d={liveViewData && liveViewData.BAT[0].power > 0 ? 'M0 80 259 80 ' : 'M259 80 0 80'}
            className={
              liveViewData && liveViewData.BAT && liveViewData.BAT[0].power ? styles.line1 : null
            }
          ></path>
        </svg>
        <svg className={liveViewData?.EV ? styles.evlive : styles.evlivenone}>
          <path
            fill="transparent"
            stroke="#ddd"
            name="左下角"
            strokeLinecap="round"
            strokeWidth="10"
            d={
              liveViewData?.EV && liveViewData?.EV[0]?.power > 0
                ? 'M0 180 350 180,350 60 '
                : 'M350 60 350 180,0 180 '
            }
            className={styles.path}
          ></path>
          <path
            fill="transparent"
            stroke="#24d081"
            strokeLinecap="round"
            stopColor="#000"
            strokeWidth="10"
            d={
              liveViewData?.EV && liveViewData?.EV[0]?.power > 0
                ? 'M0 180 350 180,350 60'
                : 'M350 60 350 180,0 180'
            }
            className={
              liveViewData && liveViewData.EV && liveViewData.EV[0].power ? styles.line2 : null
            }
          ></path>
          <path
            fill="transparent"
            stroke="#ddd"
            strokeLinecap="round"
            strokeWidth="10"
            d={
              liveViewData?.EV && liveViewData?.EV[0]?.power > 0
                ? 'M0 180 350 180,350 60'
                : 'M350 60 350 180,0 180'
            }
            className={
              liveViewData && liveViewData.EV && liveViewData.EV[0].power ? styles.line1 : null
            }
          ></path>
        </svg>
        <svg className={liveViewData?.GRID ? styles.gridlive : styles.gridlivenone}>
          <path
            fill="transparent"
            stroke="#ddd"
            name="右上角"
            strokeLinecap="round"
            strokeWidth="10"
            d={
              liveViewData && liveViewData?.GRID?.power > 0
                ? 'M450 80 10 80,10 190 '
                : 'M10 190 10 80,450 80 '
            }
            className={styles.path}
          ></path>
          <path
            fill="transparent"
            stroke="#24d081"
            strokeLinecap="round"
            stopColor="#000"
            strokeWidth="10"
            d={
              liveViewData && liveViewData?.GRID.power > 0
                ? 'M450 80 10 80,10 190'
                : 'M10 190 10 80,450 80'
            }
            // d={liveViewData?.GRID?.power>0?"M450 80 10 80,10 190":"M10 190 10 80,450 80"}
            className={liveViewData && liveViewData.GRID.power ? styles.line2 : null}
          ></path>
          <path
            fill="transparent"
            stroke="#ddd"
            strokeLinecap="round"
            strokeWidth="10"
            d={
              liveViewData && liveViewData?.GRID?.power > 0
                ? 'M450 80 10 80,10 190'
                : 'M10 190 10 80,450 80'
            }
            className={liveViewData && liveViewData.GRID.power ? styles.line1 : null}
          ></path>
        </svg>
        <svg className={liveViewData?.HOME ? styles.houselive : styles.houselivenone}>
          <path
            fill="transparent"
            stroke="#ddd"
            strokeLinecap="round"
            name="右下角"
            strokeWidth="10"
            d="M10 60 10 180,450 180 "
            className={styles.path}
          ></path>
          <path
            fill="transparent"
            stroke="#24d081"
            strokeLinecap="round"
            stopColor="#000"
            strokeWidth="10"
            d="M10 60 10 180,450 180"
            className={
              liveViewData && (liveViewData.HOME.critical.power || liveViewData.HOME.home.power)
                ? styles.line2
                : null
            }
          ></path>
          <path
            fill="transparent"
            stroke="#ddd"
            strokeLinecap="round"
            strokeWidth="10"
            d="M10 60 10 180,450 180"
            className={
              liveViewData && (liveViewData.HOME.critical.power || liveViewData.HOME.home.power)
                ? styles.line1
                : null
            }
          ></path>
        </svg>
      </Card>
    </>
  );
};

export default LiveView;
