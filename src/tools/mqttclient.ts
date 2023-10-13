import * as mqtt from 'mqtt';
export const getMQTT = async (terminalID: any, terminalslen: any[]) => {
  let client: any;
  if (!client) {
    client = await mqtt.connect('mqtt://47.106.120.119:8083', {
      username: 'ems',
      password: 'xuheng8888',
      protocolId: 'MQTT',
      clientId: 'EMS-12345',
    });
  }

  await client.on('connect', () => {
    for (let i = 0; i < terminalslen.length; i++) {
      client.unsubscribe(`EMS/client/${terminalslen[i].id}`, () => {});
    }
    client.subscribe(`EMS/client/${terminalID}`, (err) => {
      if (!err) {
      }
    });
  });

  client.on('message', (topic, message: any) => {
    // message is Buffer
    // console.log(JSON.parse(message.toString()));
    return JSON.parse(message.toString());
    // setInitialState({...initialState,liveView:JSON.parse(message.toString())})
    // setLiveViewData(JSON.parse(message.toString()));

    // client.unsubscribeAsync()
  });
};
