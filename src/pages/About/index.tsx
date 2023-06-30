import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, theme } from 'antd';
import React from 'react';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const { useToken } = theme;

  const { token } = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={href} target="_blank" rel="noreferrer">
        了解更多 {'>'}
      </a>
    </div>
  );
};

const About: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer>
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
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            欢迎使用 EMS
          </div>
          {/* <p
            style={{
              fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            EMS 是一个整合了
          </p> */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <InfoCard
              index={1}
              href="https://www.zhudd.vip"
              title="了解 EMS"
              desc="旭衡电子（深圳）有限公司的产品设计团队在不间断电源，光伏，充电桩领域拥有20年以上的技术沉淀。拥有成熟，稳定的产品开发平台."
            />
            <InfoCard
              index={2}
              title="了解 EMS"
              href="https://www.zhudd.vip"
              desc="我们的产品支持GB/CCS1/CCS2/CHAdeMO多种充电协议，全球销售。Always control 会为您提供完整，多场景全面产品解决方案，适用于家庭/社区、企业/园区，运营商，新能 源车紧急道路救援等，并且配套自主开发能量管理系统（EMS）以及云平台，进行微网间能量智能调度，实时监控与维护，远程运行策略更新，实现用户效益最大化，使用智能与便捷化"
            />
            <InfoCard
              index={3}
              title="了解 EMS"
              href="https://www.zhudd.vip"
              desc="我们遵循“奋进”“创新”“务实”“客户至上”的原则，坚持“以人为本”。旭衡拥有大量的专业人才，提倡以诚待人，义利兼顾的商业道德。旭衡的使命是推动清洁能源在国内的普及，用技术压缩成本让电能惠及千家万户。旭衡期待与所有客户的相遇，用专业为客户带来产品价值，在我们的共同努力下，共赢未来战略机遇"
            />
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default About;
