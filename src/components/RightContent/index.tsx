import { WeatherIcon } from '@/constants';
import { currentWeather, day5Weather } from '@/services/weather/api';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { SelectLang as UmiSelectLang, useModel } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Badge, Dropdown, Select } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
export type SiderTheme = 'light' | 'dark';
export const SelectLang = () => {
  return (
    <UmiSelectLang
      style={{
        padding: 4,
      }}
    />
  );
};
let locationData: [] = [];
export const Location = (currentUser: any) => {
  // const [locationData, setLocationData]: any = useState([]);
  const { initialState, setInitialState } = useModel('@@initialState');
  if (!currentUser.currentUser) {
    return false;
  }
  let options: any[] = [];
  locationData = [];
  currentUser.currentUser.terminals.map((data: any, index: number) => {
    // setLocationData([...locationData,{lat:data.location.lat,lng:data.location.lng}])
    locationData.push({ lat: data.location.lat, lon: data.location.lng });
    return options.push({
      // value: `lat:${data.location.lat},lon:${data.location.lng}`,
      value: index,
      label: data.location.location,
    });
  });
  const locationHandleChange = (val: number) => {
    setInitialState({
      ...initialState,
      locationIndex: val,
    });
    // currentGeo(data).then((item) => {
    //   console.log(item);
    // });
  };
  return (
    <Select
      // defaultValue={`lat:${currentUser.currentUser.devices[0].location.lat},lng:${currentUser.currentUser.devices[0].location.lng}`}
      defaultValue={0}
      style={{ width: 120 }}
      // bordered={false}
      onChange={locationHandleChange}
      options={options}
      // options={[
      //   { value: 0, label: '深圳' },
      //   { value: 1, label: '北京' },
      //   { value: 2, label: '台湾' },
      //   { value: 3, label: 'New York' },
      // ]}
    />
  );
  // return <span style={{ padding: '1rem', lineHeight: '100%' }}>{currentUser.currentUser.location.location}</span>;
};

export const Question = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        window.open('https://pro.ant.design/docs/getting-started');
      }}
    >
      <QuestionCircleOutlined />
    </div>
  );
};
export const Weather = (props) => {
  const [currentWeatherData, setCurrentWeatherData]: any = useState();
  const [day5WeatherData, setDay5WeatherData]: any = useState();
  const { initialState } = useModel('@@initialState');
  const items: MenuProps['items'] = day5WeatherData?.list.map((data: any, index: number) => {
    if (!((index - 2) % 8)) {
      return {
        key: index,
        label: (
          <p style={{ display: 'flex', justifyContent: 'space-between', margin: 'auto' }}>
            <span>{moment(data.dt_txt).format('YYYY-MM-DD')}</span>
            <Badge count={100 - data.clouds.all} color="rgba(36, 208, 129, 0.7)"></Badge>
            <span>{data.weather[0].description.toUpperCase()}</span>
          </p>
        ),
        icon: (
          <img
            className="img-fluid"
            style={{ transform: 'scale(0.8)' }}
            src={`http://openweathermap.org/img/w/${data?.weather[0]?.icon}.png`}
          />
        ),
      };
    } else {
      return false;
    }
  });
  useEffect(() => {
    currentWeather(
      locationData[initialState?.locationIndex ? initialState?.locationIndex : 0],
    ).then((data) => {
      setCurrentWeatherData(data);
    });
    if (locationData.length) {
      day5Weather(locationData[initialState?.locationIndex ? initialState.locationIndex : 0]).then(
        (data) => {
          setDay5WeatherData(data);
        },
      );
    }
  }, [initialState?.locationIndex]);

  return (
    <>
      <Dropdown menu={{ items }}>
        <div
          style={{
            display: 'flex',
            height: '100%',
            fontSize: 14,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridAutoFlow: 'column',
              alignItems: 'center',
              gridTemplateRows: '45% 55%',
              height: 'inherit',
              gridRowGap: '5px',
              paddingTop: '10px',
            }}
          >
            <p>
              {props.terminals?.length > 0
                ? props.terminals[initialState?.locationIndex ? initialState?.locationIndex : 0]
                    .location.sunrise
                : ''}
            </p>
            <p>Sunrise</p>
          </div>
          <WeatherIcon type="icon-richu" style={{ fontSize: 40, padding: '0 2rem' }} />
          <div
            style={{
              display: 'grid',
              gridAutoFlow: 'column',
              alignItems: 'center',
              gridTemplateRows: '45% 55%',
              height: 'inherit',
              gridRowGap: '5px',
              paddingTop: '10px',
            }}
          >
            <p>
              {props.terminals.length > 0
                ? props.terminals[initialState?.locationIndex ? initialState.locationIndex : 0]
                    .location.sunset
                : ''}
            </p>
            <p>Sunset</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', margin: '0 0 0 3rem' }}>
            {/* <WeatherIcon style={{ fontSize: 36 }} type={`icon-${currentData.main}`} /> */}
            <img
              className="img-fluid"
              style={{ transform: 'scale(0.8)' }}
              src={`http://openweathermap.org/img/w/${currentWeatherData?.weather[0]?.icon}.png`}
            />
            <span style={{ fontSize: '1rem', marginLeft: '0.5rem' }}>
              {currentWeatherData?.weather[0]?.main}
            </span>
          </div>
        </div>
      </Dropdown>
    </>
  );
};
