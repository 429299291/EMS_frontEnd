import { WeatherIcon } from '@/constants';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { SelectLang as UmiSelectLang } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
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
const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <p style={{ display: 'flex', justifyContent: 'space-between', margin: 'auto' }}>
        <span>7月5日 Sunny</span>
        <span>Solar Irradiance:87</span>
      </p>
    ),
    icon: <WeatherIcon type="icon-sun" style={{ fontSize: 40 }} />,
  },
  {
    key: '2',
    label: (
      <p style={{ display: 'flex', justifyContent: 'space-between', margin: 'auto' }}>
        <span>7月6日 Overcast</span>
        <span>Solar Irradiance:42</span>
      </p>
    ),
    icon: <WeatherIcon type="icon-yin" style={{ fontSize: 40 }} />,
  },
  {
    key: '3',
    label: (
      <p style={{ display: 'flex', justifyContent: 'space-between', margin: 'auto' }}>
        <span>7月7日 Rainy</span>
        <span>Solar Irradiance:22</span>
      </p>
    ),
    icon: <WeatherIcon type="icon-xiaoyu" style={{ fontSize: 40 }} />,
  },
  {
    key: '4',
    label: (
      <p style={{ display: 'flex', justifyContent: 'space-between', margin: 'auto' }}>
        <span>7月8日 Snow</span>
        <span>Solar Irradiance:13</span>
      </p>
    ),
    icon: <WeatherIcon type="icon-eizhenyu" style={{ fontSize: 40 }} />,
  },
  {
    key: '5',
    label: (
      <p style={{ display: 'flex', justifyContent: 'space-between', margin: 'auto' }}>
        <span>7月9日 Cloudy</span>
        <span>Solar Irradiance:58</span>
      </p>
    ),
    icon: <WeatherIcon type="icon-duoyun" style={{ fontSize: 40 }} />,
  },
  // {
  //   key: '5',
  //   danger: true,
  //   label: 'a danger item',
  // },
];
export const Weather = () => {
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
            <WeatherIcon style={{ fontSize: 36 }} type="icon-xiaoyu" />
            <span style={{ fontSize: '1rem', marginLeft: '0.5rem' }}>Light Rain</span>
          </div>
        </div>
      </Dropdown>
    </>
  );
};
