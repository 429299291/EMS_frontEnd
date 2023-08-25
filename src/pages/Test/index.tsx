// import { Card } from 'antd';
import React from 'react';
import styles from './index.less';
/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const Test: React.FC = () => {
  // const { initialState } = useModel('@@initialState');
  return (
    <>
      <div className={styles.wrapper}>
        <svg height="500" width="500">
          <polyline
            className={styles.borderrect}
            points="0,0 250,0 250,250 0,250 0,0"
            style={{ fill: 'none', strokeWidth: '5' }}
          />
        </svg>
        <div className={styles.wrapper}>Check it!</div>
      </div>
    </>
  );
};

export default Test;
