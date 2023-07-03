import { WeatherIcon } from '@/constants';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { SelectLang as UmiSelectLang } from '@umijs/max';
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
  return (
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
      <WeatherIcon type="icon-richu" style={{ fontSize: 30, padding: '0 1rem' }} />
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
      <WeatherIcon style={{ fontSize: 40, padding: '0 1rem' }} type="icon-xiaoyu" />
    </div>
  );
};
