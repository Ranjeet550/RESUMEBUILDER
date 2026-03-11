import { Layout, Typography } from 'antd';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

export function Footer() {
  return (
    <AntFooter style={{ textAlign: 'center', background: '#001529', color: '#fff', padding: 'clamp(1.5rem, 3vw, 2rem)' }}>
      <Text style={{ color: '#fff', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>
        &copy; 2026 Resumify. All rights reserved.
      </Text>
    </AntFooter>
  );
}
