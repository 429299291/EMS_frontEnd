import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card } from 'antd';
import React from 'react';
import styles from './index.less';

const LiveView: React.FC = () => {
  //   const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer
      content=""
      header={{
        title: 'Live view',
        breadcrumb: {},
      }}
    >
      <Card
        className={styles.box}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div className={styles.solar}>
          <p>Solar</p>
          <span>6.8kw</span>
        </div>
        <div className={styles.battery}>
          <p>Battery</p>
          <span>1.9kw</span>
        </div>
        <div className={styles.ev}>
          <p>EV</p>
          <span>3.7kw</span>
        </div>
        <div className={styles.home}>
          <span>Home</span>
          <span></span>
        </div>
        <div className={styles.grid}>
          <p>Grid</p>
          <span>1.2kw</span>
        </div>
        <div className={styles.house}>
          <p>House</p>
          <span>2.5kw</span>
        </div>
        {/* <div className={styles.line}> */}
        <div className={styles.one}>
          <div className={styles.ball}></div>
        </div>
        <div className={styles.two}>
          <div className={styles.ball}></div>
        </div>
        <div className={styles.three}>
          <div className={styles.ball}></div>
        </div>
        <div className={styles.four}></div>
        <div className={styles.five}></div>
        <div className={styles.six}></div>
        <div className={styles.seven}></div>
        {/* </div> */}
      </Card>
    </PageContainer>
  );
};

export default LiveView;
