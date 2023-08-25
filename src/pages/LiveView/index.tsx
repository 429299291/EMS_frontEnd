import { WorkingModeStatus } from '@/constants';
import { useModel } from '@umijs/max';
import { Card, Popover } from 'antd';
import moment from 'moment';
import * as mqtt from 'mqtt';
import React, { useState } from 'react';
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
  HOME: [
    {
      id: string;
      power: number;
      volt: number;
    },
  ];
  GRID: [
    {
      power: number;
      volt: number;
    },
  ];
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
  const { initialState } = useModel('@@initialState');

  const client = mqtt.connect('mqtt://47.106.120.119:8083', {
    username: 'ems',
    password: 'xuheng8888',
    protocolId: 'MQTT',
    clientId: 'EMS-12345',
  });
  client.on('connect', function () {
    client.subscribe(`EMS/client`, function () {
      // if (!err) {
      //     client.publish(`HEMS/${(Math.random()*100000).toFixed(0)}`,JSON.stringify({
      //       name:`EMS-23`,
      //       userId:'1b68ccbb-f276-4a98-9523-156fc412ab51',  //终端所有权ID
      //       id:(Math.random()*100000).toFixed(0),//终端识别ID
      //       timeStamp:Math.floor(new Date().getTime()/1000),
      //       location:"深圳",
      //       supplier:'voltronicpower',
      //       WorkingMode:Math.ceil(Math.random()*4-1),
      //     }),{qos:1,retain:true})
      // }
    });
  });
  client.on('message', (topic, message) => {
    // message is Buffer
    // console.log(message);
    console.log(JSON.parse(message.toString()));

    setLiveViewData(JSON.parse(message.toString()));
    // client.end()
  });
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
    return (
      <div>
        <p>ID:{liveViewData.id}</p>
        <p>主机名:{liveViewData.name}</p>
        <p>时间:{moment(liveViewData.timeStamp * 1000).format('YYYY-MM-DD hh:mm:ss')}</p>
      </div>
    );
  };
  const contentHOME = (liveViewData: mqttDto) => {
    return (
      <div>
        <p>功率:{liveViewData.HOME[0].power}kw</p>
        <p>电压:{liveViewData.HOME[0].volt + 'v'}</p>
      </div>
    );
  };
  const contentGRID = (liveViewData: mqttDto) => {
    return (
      <div>
        <p>功率:{liveViewData.GRID[0].power}kw</p>
        <p>电压:{liveViewData.GRID[0].volt + 'v'}</p>
      </div>
    );
  };
  console.log(liveViewData);

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
            <span>{liveViewData ? liveViewData.PV[0].power : null}kw</span>
          </div>
        </Popover>
        <Popover content={liveViewData ? contentBAT(liveViewData) : null} title="Battery">
          <div className={styles.battery}>
            <p>Battery</p>
            <span>{liveViewData ? liveViewData.BAT[0].power : null}kw</span>
          </div>
        </Popover>
        {liveViewData && liveViewData.EV && (
          <Popover content={contentEV(liveViewData)} title="EV">
            <div className={styles.ev}>
              <p>EV</p>
              <span>{liveViewData.EV[0].power}kw</span>
            </div>
          </Popover>
        )}
        <Popover content={liveViewData ? contentMaster(liveViewData) : null} title="Home">
          <div className={styles.home}>
            <p>HOME</p>
            <span>{liveViewData ? WorkingModeStatus[liveViewData.WorkingMode] : null}</span>
          </div>
        </Popover>
        <Popover content={liveViewData ? contentGRID(liveViewData) : null} title="Grid">
          <div className={styles.grid}>
            <p>Grid</p>
            <span>{liveViewData ? liveViewData.GRID[0].power : null}kw</span>
          </div>
        </Popover>
        <Popover content={liveViewData ? contentHOME(liveViewData) : null} title="House">
          <div className={styles.house}>
            <p>House</p>
            <span>{liveViewData ? liveViewData.HOME[0].power : null}kw</span>
          </div>
        </Popover>
        {/* <div className={styles.battery}>
          <p>Battery</p>
          <span>10kw</span>
        </div> */}
        {/* left line flow */}
        {liveViewData && liveViewData.PV && (
          <svg className={styles.solarlive}>
            <path
              fill="transparent"
              stroke="#ddd"
              strokeLinecap="round"
              strokeWidth="10"
              d="M0 80 350 80, 350 280 "
              className={styles.path}
            ></path>
            <path
              fill="transparent"
              stroke="#24d081"
              strokeLinecap="round"
              stopColor="#000"
              strokeWidth="10"
              d="M0 80 350 80, 350 280 "
              className={styles.line2}
            ></path>
            <path
              fill="transparent"
              stroke="#ddd"
              strokeLinecap="round"
              strokeWidth="10"
              d="M0 80 350 80, 350 280 "
              className={styles.line1}
            ></path>
          </svg>
        )}
        {/* {liveViewData && liveViewData.BAT&&<svg className={styles.solarlive}>
          <path fill="transparent" stroke="#ddd" strokeLinecap='round' strokeWidth="10" d="M0 80 220 80 " className={styles.path}></path>
          <path fill="transparent" stroke="#24d081" strokeLinecap='round' stopColor='#000' strokeWidth="10" d="M0 80 220 80" className={styles.line4}></path>
          <path fill="transparent" stroke="#ddd" strokeLinecap='round' strokeWidth="10" d="M0 80 220 80 " className={styles.line3}></path>
        </svg>} */}
      </Card>
    </>
  );
};

export default LiveView;
