import { WeatherIcon } from '@/constants';
import { currentWeather, day5Weather } from '@/services/weather/api';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { SelectLang as UmiSelectLang } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Badge, Dropdown } from 'antd';
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
export const Location = () => {
  return <span style={{ padding: '1rem', lineHeight: '100%' }}>深圳</span>;
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
export const Weather = () => {
  const [currentWeatherData, setCurrentWeatherData]: any = useState();
  const [day5WeatherData, setDay5WeatherData]: any = useState();
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
    currentWeather({ lat: '22.543096', lon: '114.057865' }).then((data) => {
      setCurrentWeatherData(data);
    });
    day5Weather({ lat: '22.543096', lon: '114.057865' }).then((data) => {
      setDay5WeatherData(data);
    });
  }, []);
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
            <p>05:58</p>
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
            <p>18:37</p>
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
