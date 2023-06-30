import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card } from 'antd';
import React from 'react';
import styles from './index.less';
/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
// const InfoCard: React.FC<{
//   title: string;
//   index: number;
//   desc: string;
//   href: string;
// }> = ({ title, href, index, desc }) => {
//   const { useToken } = theme;

//   const { token } = useToken();

//   return (
//     <div
//       style={{
//         backgroundColor: token.colorBgContainer,
//         boxShadow: token.boxShadow,
//         borderRadius: '8px',
//         fontSize: '14px',
//         color: token.colorTextSecondary,
//         lineHeight: '22px',
//         padding: '16px 19px',
//         minWidth: '220px',
//         flex: 1,
//       }}
//     >
//       <div
//         style={{
//           display: 'flex',
//           gap: '4px',
//           alignItems: 'center',
//         }}
//       >
//         <div
//           style={{
//             width: 48,
//             height: 48,
//             lineHeight: '22px',
//             backgroundSize: '100%',
//             textAlign: 'center',
//             padding: '8px 16px 16px 12px',
//             color: '#FFF',
//             fontWeight: 'bold',
//             backgroundImage:
//               "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
//           }}
//         >
//           {index}
//         </div>
//         <div
//           style={{
//             fontSize: '16px',
//             color: token.colorText,
//             paddingBottom: 8,
//           }}
//         >
//           {title}
//         </div>
//       </div>
//       <div
//         style={{
//           fontSize: '14px',
//           color: token.colorTextSecondary,
//           textAlign: 'justify',
//           lineHeight: '22px',
//           marginBottom: 8,
//         }}
//       >
//         {desc}
//       </div>
//       <a href={href} target="_blank" rel="noreferrer">
//         了解更多 {'>'}
//       </a>
//     </div>
//   );
// };

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
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div className={styles.max}>
          <div className={styles.line}></div>
        </div>
        <div className={styles.max}>
          <div className={styles.line2}></div>
        </div>
        <img
          src="https://ems-public.oss-cn-beijing.aliyuncs.com/jast.png"
          style={{ width: 80 }}
          alt=""
        />
        <div>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
            <polyline points="200,0 200,30 930,30 930,97" fill="none" stroke="#007084" />
            <polyline points="svgData[currentIndex][0]" fill="none" stroke="#00e9f9" />
          </svg>
        </div>
      </Card>
    </PageContainer>
  );
};

export default LiveView;
