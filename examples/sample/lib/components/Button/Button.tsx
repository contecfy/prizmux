import { Colors } from '../../theme/colors';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type TextStyle,
  type ViewStyle
} from 'react-native';
import type { ButtonProps } from './Button.types';

// Button Configuration - All styles defined here for maintainability
const BUTTON_CONFIG = {
  colors: {
    primary: Colors.light.primary,
    primaryDisabled: '#9CA3AF',
    outlineBorder: Colors.light.primary,
    outlineBorderDisabled: '#9CA3AF',
    text: {
      filled: '#FFFFFF',
      outline: Colors.light.primary,
      outlineDisabled: '#9CA3AF',
    },
    shadow: Colors.light.primary,
  },
  sizes: {
    small: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      fontSize: 14,
      iconSize: 16,
      gap: 6,
    },
    medium: {
      paddingVertical: 14,
      paddingHorizontal: 20,
      fontSize: 16,
      iconSize: 20,
      gap: 8,
    },
    large: {
      paddingVertical: 16,
      paddingHorizontal: 24,
      fontSize: 18,
      iconSize: 22,
      gap: 10,
    },
  },
  borderRadius: 12,
  shadow: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
};

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'filled',
  size = 'medium',
  onPress,
  isLoading = false,
  disabled = false,
  style,
  textStyle,
  icon,
  iconPosition = 'left',
  fullWidth = false,
}) => {
  const isDisabled = disabled || isLoading;
  const sizeConfig = BUTTON_CONFIG.sizes[size];
  const isFilled = variant === 'filled';

  // Get base button style
  const getButtonStyle = () => {
    const baseStyle = isFilled ? styles.filledButton : styles.outlineButton;
    const sizeStyle = styles[`${size}Button` as keyof typeof styles] as ViewStyle;
    const disabledStyle = isDisabled 
      ? (isFilled ? styles.filledButtonDisabled : styles.outlineButtonDisabled)
      : undefined;
    
    return [
      baseStyle,
      sizeStyle,
      disabledStyle,
      fullWidth && styles.fullWidth,
      style,
    ].filter(Boolean) as ViewStyle[];
  };

  // Get text style
  const getTextStyle = () => {
    const baseTextStyle = isFilled ? styles.filledButtonText : styles.outlineButtonText;
    const sizeTextStyle = styles[`${size}ButtonText` as keyof typeof styles];
    const disabledTextStyle = isDisabled && !isFilled 
      ? styles.outlineButtonTextDisabled 
      : null;
    
    return [
      baseTextStyle,
      sizeTextStyle,
      disabledTextStyle,
      textStyle,
    ];
  };

  // Get loading indicator color
  const getLoadingColor = () => {
    if (isFilled) return BUTTON_CONFIG.colors.text.filled;
    return BUTTON_CONFIG.colors.text.outline;
  };

  return (
    <Pressable
      style={getButtonStyle()}
      onPress={onPress}
      disabled={isDisabled}
    >
      <View style={styles.buttonContent}>
        {isLoading ? (
          <ActivityIndicator size="small" color={getLoadingColor()} />
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <View style={[styles.iconContainer, { marginRight: sizeConfig.gap }]}>
                {icon}
              </View>
            )}
            {title && (
              <Text style={getTextStyle()}>
                {title}
              </Text>
            )}
            {icon && iconPosition === 'right' && (
              <View style={[styles.iconContainer, { marginLeft: sizeConfig.gap }]}>
                {icon}
              </View>
            )}
          </>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  // Base Button Styles
  filledButton: {
    backgroundColor: BUTTON_CONFIG.colors.primary,
    borderRadius: BUTTON_CONFIG.borderRadius,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: BUTTON_CONFIG.colors.shadow,
    ...BUTTON_CONFIG.shadow,
  },
  filledButtonDisabled: {
    backgroundColor: BUTTON_CONFIG.colors.primaryDisabled,
    shadowOpacity: 0.1,
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: BUTTON_CONFIG.colors.outlineBorder,
    borderRadius: BUTTON_CONFIG.borderRadius,
    backgroundColor: 'transparent',
    alignItems: "center",
    justifyContent: "center",
  },
  outlineButtonDisabled: {
    borderColor: BUTTON_CONFIG.colors.outlineBorderDisabled,
  },
  // Size Variants
  smallButton: {
    paddingVertical: BUTTON_CONFIG.sizes.small.paddingVertical,
    paddingHorizontal: BUTTON_CONFIG.sizes.small.paddingHorizontal,
  },
  mediumButton: {
    paddingVertical: BUTTON_CONFIG.sizes.medium.paddingVertical,
    paddingHorizontal: BUTTON_CONFIG.sizes.medium.paddingHorizontal,
  },
  largeButton: {
    paddingVertical: BUTTON_CONFIG.sizes.large.paddingVertical,
    paddingHorizontal: BUTTON_CONFIG.sizes.large.paddingHorizontal,
  },
  // Text Styles
  filledButtonText: {
    color: BUTTON_CONFIG.colors.text.filled,
    fontWeight: "600",
  },
  outlineButtonText: {
    color: BUTTON_CONFIG.colors.text.outline,
    fontWeight: "600",
  },
  outlineButtonTextDisabled: {
    color: BUTTON_CONFIG.colors.text.outlineDisabled,
  },
  smallButtonText: {
    fontSize: BUTTON_CONFIG.sizes.small.fontSize,
  },
  mediumButtonText: {
    fontSize: BUTTON_CONFIG.sizes.medium.fontSize,
  },
  largeButtonText: {
    fontSize: BUTTON_CONFIG.sizes.large.fontSize,
  },
  // Layout Styles
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
});

