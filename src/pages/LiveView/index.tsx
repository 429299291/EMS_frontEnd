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
    client.subscribe(`HEMS`, function (err) {
      console.log(err);

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
  const contentHOME = (liveViewData: mqttDto) => {
    return (
      <div>
        <p>主机名:{liveViewData.name}kw</p>
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
  const contentINV = (liveViewData: mqttDto) => {
    return (
      <div>
        <p>ID:{liveViewData.id}</p>
        <p>Name:{liveViewData.name}</p>
        {/* <p>ID:{liveViewData.INV[0].id}</p>
    <p>功率:{liveViewData.INV[0].power}kw</p>
    <p>电压:{liveViewData.INV[0].volt+"v"}</p> */}
        <p>时间:{moment(liveViewData.timeStamp * 1000).format('YYYY-MM-DD hh:mm:ss')}</p>
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
        {liveViewData && liveViewData.PV && (
          <Popover content={contentPV(liveViewData)} title="Solar">
            <div className={styles.solar}>
              <p>Solar</p>
              <span>{liveViewData.PV[0].power}kw</span>
            </div>
          </Popover>
        )}
        {liveViewData && liveViewData.BAT && (
          <Popover content={contentBAT(liveViewData)} title="Battery">
            <div className={styles.battery}>
              <p>Battery</p>
              <span>{liveViewData.BAT[0].power}kw</span>
            </div>
          </Popover>
        )}
        {liveViewData && liveViewData.EV && (
          <Popover content={contentEV(liveViewData)} title="EV">
            <div className={styles.ev}>
              <p>EV</p>
              <span>{liveViewData.EV[0].power}kw</span>
            </div>
          </Popover>
        )}
        {liveViewData && liveViewData.HOME && (
          <Popover content={contentINV(liveViewData)} title="Home">
            <div className={styles.home}>
              <p>INV</p>
              <span>{liveViewData.INV[0].power}kw</span>
            </div>
          </Popover>
        )}
        {liveViewData && liveViewData.GRID && (
          <Popover content={contentGRID(liveViewData)} title="Grid">
            <div className={styles.grid}>
              <p>Grid</p>
              <span>{liveViewData.GRID[0].power}kw</span>
            </div>
          </Popover>
        )}
        {liveViewData && liveViewData.HOME && (
          <Popover content={contentHOME(liveViewData)} title="House">
            <div className={styles.house}>
              <p>House</p>
              <span>{liveViewData.HOME[0].power}kw</span>
            </div>
          </Popover>
        )}
        {/* <div className={styles.battery}>
          <p>Battery</p>
          <span>10kw</span>
        </div> */}
        {/* left line flow */}
        <div className={styles.one}>
          <div className={styles.ball}></div>
        </div>
        <div className={styles.two}>
          <div className={styles.ball}></div>
        </div>
        <div className={styles.three}>
          <div className={styles.ball}></div>
        </div>
        <div className={styles.four}>
          <div className={styles.ball}></div>
        </div>
        <div className={styles.five}>
          <div className={styles.ball}></div>
        </div>
        {/* right line flow */}
        <div className={styles.six}>
          <div className={styles.ball}></div>
        </div>
        <div className={styles.seven}>
          <div className={styles.ball}></div>
        </div>
        <div className={styles.eight}>
          <div className={styles.ball}></div>
        </div>
        <div className={styles.nine}>
          <div className={styles.ball}></div>
        </div>
        <div className={styles.ten}>
          <div className={styles.ball}></div>
        </div>
      </Card>
    </>
  );
};

export default LiveView;
