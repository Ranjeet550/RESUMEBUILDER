import { Select, Space } from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';
import { themes } from '../config/theme';

export default function ThemeSwitcher({ currentTheme, onThemeChange }) {
  const themeOptions = Object.entries(themes).map(([key, value]) => ({
    label: value.name,
    value: key,
  }));

  return (
    <Space>
      <BgColorsOutlined style={{ fontSize: 16 }} />
      <Select
        value={currentTheme}
        onChange={onThemeChange}
        options={themeOptions}
        style={{ width: 180 }}
        size="small"
      />
    </Space>
  );
}
