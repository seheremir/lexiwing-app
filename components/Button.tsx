import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  Platform
} from 'react-native';
import { colors } from '@/constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const getButtonStyle = () => {
    let buttonStyle: ViewStyle = {};
    
    // Variant styles
    switch (variant) {
      case 'primary':
        buttonStyle = {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        };
        break;
      case 'secondary':
        buttonStyle = {
          backgroundColor: colors.secondary,
          borderColor: colors.secondary,
        };
        break;
      case 'outline':
        buttonStyle = {
          backgroundColor: 'transparent',
          borderColor: colors.primary,
          borderWidth: 1,
        };
        break;
      case 'text':
        buttonStyle = {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        };
        break;
    }
    
    // Size styles
    switch (size) {
      case 'small':
        buttonStyle = {
          ...buttonStyle,
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 6,
        };
        break;
      case 'medium':
        buttonStyle = {
          ...buttonStyle,
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 8,
        };
        break;
      case 'large':
        buttonStyle = {
          ...buttonStyle,
          paddingVertical: 16,
          paddingHorizontal: 32,
          borderRadius: 10,
        };
        break;
    }
    
    // Disabled state
    if (disabled) {
      buttonStyle = {
        ...buttonStyle,
        opacity: 0.6,
      };
    }
    
    // Full width
    if (fullWidth) {
      buttonStyle = {
        ...buttonStyle,
        width: '100%',
        alignItems: 'center',
      };
    }
    
    return buttonStyle;
  };
  
  const getTextStyle = () => {
    let style: TextStyle = {
      fontWeight: '600',
      textAlign: 'center',
    };
    
    // Variant text styles
    switch (variant) {
      case 'primary':
      case 'secondary':
        style = {
          ...style,
          color: colors.white,
        };
        break;
      case 'outline':
        style = {
          ...style,
          color: colors.primary,
        };
        break;
      case 'text':
        style = {
          ...style,
          color: colors.primary,
        };
        break;
    }
    
    // Size text styles
    switch (size) {
      case 'small':
        style = {
          ...style,
          fontSize: 14,
        };
        break;
      case 'medium':
        style = {
          ...style,
          fontSize: 16,
        };
        break;
      case 'large':
        style = {
          ...style,
          fontSize: 18,
        };
        break;
    }
    
    return style;
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' || variant === 'text' ? colors.primary : colors.white} 
          size={size === 'small' ? 'small' : 'small'} 
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        // Add web-specific styles if needed
        cursor: 'pointer',
      },
    }),
  },
});