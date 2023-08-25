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
        <svg height="275px">
          <path
            fill="transparent"
            stroke="#ccc"
            strokeLinecap="round"
            strokeWidth="10"
            d="M10 80 210 80, 210 280 "
            className={styles.path}
          ></path>
          <path
            fill="transparent"
            stroke="green"
            strokeLinecap="round"
            stopColor="#000"
            strokeWidth="10"
            d="M10 80 210 80, 210 280 "
            className={styles.line2}
          ></path>
          <path
            fill="transparent"
            stroke="#ccc"
            strokeLinecap="round"
            strokeWidth="10"
            d="M10 80 210 80, 210 280 "
            className={styles.line1}
          ></path>
        </svg>
      </div>
    </>
  );
};

export default Test;
