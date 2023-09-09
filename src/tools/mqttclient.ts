export const getMQTT = async (initialState, mqtt) => {
  const client = await mqtt.connect('mqtt://47.106.120.119:8083', {
    username: 'ems',
    password: 'xuheng8888',
    protocolId: 'MQTT',
    clientId: 'EMS-12345',
  });

  await client.on('connect', () => {
    client.subscribeAsync(
      `EMS/client/${
        initialState?.currentUser?.terminals[
          initialState.locationIndex ? initialState.locationIndex : 0
        ].id
      }`,
      (err) => {
        if (!err) {
        }
      },
    );
  });

  client.on('message', (topic, message) => {
    // message is Buffer
    console.log(JSON.parse(message.toString()));
    // setInitialState({...initialState,liveView:JSON.parse(message.toString())})
    // setLiveViewData(JSON.parse(message.toString()));
    // client.end()

    // client.unsubscribeAsync()
  });
};
