// Color palette for the app
export const colors = {
    primary: '#4A90E2',
    primaryDark: '#3A7BC8',
    secondary: '#9B59B6',
    secondaryDark: '#8E44AD',
    background: '#FFFFFF',
    card: '#F8F9FA',
    text: '#333333',
    textSecondary: '#6C757D',
    border: '#E1E4E8',
    error: '#E74C3C',
    success: '#2ECC71',
    warning: '#F39C12',
    info: '#3498DB',
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      100: '#F8F9FA',
      200: '#E9ECEF',
      300: '#DEE2E6',
      400: '#CED4DA',
      500: '#ADB5BD',
      600: '#6C757D',
      700: '#495057',
      800: '#343A40',
      900: '#212529',
    }
  };
  
  export default {
    light: {
      text: colors.text,
      background: colors.background,
      tint: colors.primary,
      tabIconDefault: colors.gray[400],
      tabIconSelected: colors.primary,
      card: colors.card,
      border: colors.border,
    },
  };