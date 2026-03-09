// Theme color palettes with visual metadata
export const themes = {
  blue: {
    name: 'Professional Blue',
    description: 'Classic corporate look',
    icon: 'BgColorsOutlined',
    colors: ['#1890ff', '#e6f7ff'],
    token: {
      colorPrimary: '#1890ff',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#f5222d',
      colorInfo: '#1890ff',
      colorTextBase: '#000000',
      colorBgBase: '#ffffff',
    },
  },
  purple: {
    name: 'Purple Elegance',
    description: 'Modern and sophisticated',
    icon: 'CrownOutlined',
    colors: ['#722ed1', '#f9f0ff'],
    token: {
      colorPrimary: '#722ed1',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#f5222d',
      colorInfo: '#722ed1',
      colorTextBase: '#000000',
      colorBgBase: '#ffffff',
    },
  },
  green: {
    name: 'Green Growth',
    description: 'Fresh and positive',
    icon: 'BulbOutlined',
    colors: ['#13c2c2', '#e6fffb'],
    token: {
      colorPrimary: '#13c2c2',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#f5222d',
      colorInfo: '#13c2c2',
      colorTextBase: '#000000',
      colorBgBase: '#ffffff',
    },
  },
  red: {
    name: 'Red Energy',
    description: 'Bold and dynamic',
    icon: 'HeartOutlined',
    colors: ['#eb2f96', '#fff0f6'],
    token: {
      colorPrimary: '#eb2f96',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#f5222d',
      colorInfo: '#eb2f96',
      colorTextBase: '#000000',
      colorBgBase: '#ffffff',
    },
  },
  orange: {
    name: 'Orange Warmth',
    description: 'Friendly and approachable',
    icon: 'FireOutlined',
    colors: ['#fa8c16', '#fff7e6'],
    token: {
      colorPrimary: '#fa8c16',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#f5222d',
      colorInfo: '#fa8c16',
      colorTextBase: '#000000',
      colorBgBase: '#ffffff',
    },
  },
  cyan: {
    name: 'Cyan Sky',
    description: 'Fresh and modern',
    icon: 'BulbOutlined',
    colors: ['#00b96b', '#f6ffed'],
    token: {
      colorPrimary: '#00b96b',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#f5222d',
      colorInfo: '#00b96b',
      colorTextBase: '#000000',
      colorBgBase: '#ffffff',
    },
  },
  gold: {
    name: 'Gold Premium',
    description: 'Luxury and prestige',
    icon: 'CrownOutlined',
    colors: ['#d4af37', '#fffbe6'],
    token: {
      colorPrimary: '#d4af37',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#f5222d',
      colorInfo: '#d4af37',
      colorTextBase: '#000000',
      colorBgBase: '#ffffff',
    },
  },
  indigo: {
    name: 'Indigo Deep',
    description: 'Professional and trustworthy',
    icon: 'SmileOutlined',
    colors: ['#4c6ef5', '#eef0ff'],
    token: {
      colorPrimary: '#4c6ef5',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#f5222d',
      colorInfo: '#4c6ef5',
      colorTextBase: '#000000',
      colorBgBase: '#ffffff',
    },
  },
  teal: {
    name: 'Teal Harmony',
    description: 'Balanced and calm',
    icon: 'BulbOutlined',
    colors: ['#20c997', '#e3f2fd'],
    token: {
      colorPrimary: '#20c997',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#f5222d',
      colorInfo: '#20c997',
      colorTextBase: '#000000',
      colorBgBase: '#ffffff',
    },
  },
  rose: {
    name: 'Rose Blush',
    description: 'Elegant and refined',
    icon: 'HeartOutlined',
    colors: ['#f43f5e', '#ffe4e6'],
    token: {
      colorPrimary: '#f43f5e',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#f5222d',
      colorInfo: '#f43f5e',
      colorTextBase: '#000000',
      colorBgBase: '#ffffff',
    },
  },
  slate: {
    name: 'Slate Gray',
    description: 'Minimalist and clean',
    icon: 'PlusOutlined',
    colors: ['#64748b', '#f1f5f9'],
    token: {
      colorPrimary: '#64748b',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#f5222d',
      colorInfo: '#64748b',
      colorTextBase: '#000000',
      colorBgBase: '#ffffff',
    },
  },
  dark: {
    name: 'Dark Professional',
    description: 'Modern dark mode',
    icon: 'MoonOutlined',
    colors: ['#177ddc', '#111111'],
    token: {
      colorPrimary: '#177ddc',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#f5222d',
      colorInfo: '#177ddc',
      colorTextBase: '#ffffff',
      colorBgBase: '#1f1f1f',
    },
  },
};

// Base theme configuration
const baseTheme = {
  token: {
    borderRadius: 8,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,
    lineHeight: 1.5714285714285714,
    lineHeightHeading1: 1.2,
    lineHeightHeading2: 1.35,
  },
  components: {
    Button: {
      controlHeight: 40,
      borderRadius: 8,
      fontWeight: 500,
    },
    Input: {
      controlHeight: 40,
      borderRadius: 8,
      fontSize: 14,
    },
    InputNumber: {
      controlHeight: 40,
      borderRadius: 8,
    },
    Select: {
      controlHeight: 40,
      borderRadius: 8,
    },
    Card: {
      borderRadiusLG: 8,
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
      boxShadowSecondary: '0 1px 2px rgba(0, 0, 0, 0.03)',
    },
    Layout: {
      bodyBg: '#f5f5f5',
      headerBg: '#fff',
      headerHeight: 64,
      headerPadding: '0 24px',
      headerColor: 'rgba(0, 0, 0, 0.85)',
      footerBg: '#f5f5f5',
      footerPadding: '24px 50px',
    },
    Table: {
      borderRadius: 8,
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
    },
    Form: {
      labelColor: 'rgba(0, 0, 0, 0.85)',
      labelFontSize: 14,
    },
    Modal: {
      borderRadiusLG: 8,
      boxShadow: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08)',
    },
    Checkbox: {
      controlHeight: 16,
    },
    Radio: {
      controlHeight: 16,
    },
    Tabs: {
      controlHeight: 40,
      borderRadius: 8,
    },
  },
};

// Get theme by name
export const getTheme = (themeName = 'blue') => {
  const selectedTheme = themes[themeName] || themes.blue;
  return {
    token: {
      ...baseTheme.token,
      ...selectedTheme.token,
    },
    components: baseTheme.components,
  };
};

// Default theme
export const theme = getTheme('blue');
