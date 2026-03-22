import React, { useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import type { ButtonProps } from './Button.types';

const BUTTON_CONFIG = {
  colors: {
    primary: '#6366F1',
    primaryDisabled: '#9CA3AF',
    outlineBorder: '#6366F1',
    outlineBorderDisabled: '#9CA3AF',
    text: {
      filled: '#FFFFFF',
      outline: '#6366F1',
      outlineDisabled: '#9CA3AF',
    },
    shadow: '#6366F1',
  },
  sizes: {
    small: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      fontSize: 14,
      gap: 6,
    },
    medium: {
      paddingVertical: 14,
      paddingHorizontal: 20,
      fontSize: 16,
      gap: 8,
    },
    large: {
      paddingVertical: 16,
      paddingHorizontal: 24,
      fontSize: 18,
      gap: 10,
    },
  },
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
  onLongPress,
  isLoading = false,
  disabled = false,
  style,
  contentStyle,
  textStyle,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  borderRadius = 8,
  hitSlop,
  accessibilityLabel,
  // New color overrides
  backgroundColor,
  textColor,
  borderColor,
  disabledBackgroundColor,
  disabledTextColor,
  disabledBorderColor,
  loadingColor: customLoadingColor,
  showShadow = true,
  shadowColor: customShadowColor,
  pressedBackgroundColor,
}) => {
  const isDisabled = disabled || isLoading;
  const sizeConfig = BUTTON_CONFIG.sizes[size];
  const isFilled = variant === 'filled';

  // ----- Scale animation for touch feedback (from remote) -----
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };
  // ----------------------------------------------------

  const getButtonStyle = () => {
    const baseStyle = isFilled ? styles.filledButton : styles.outlineButton;
    const sizeStyle = styles[`${size}Button` as keyof typeof styles] as ViewStyle;
    const disabledStyle: ViewStyle | undefined = isDisabled
      ? isFilled
        ? { backgroundColor: disabledBackgroundColor ?? BUTTON_CONFIG.colors.primaryDisabled }
        : { borderColor: disabledBorderColor ?? BUTTON_CONFIG.colors.outlineBorderDisabled }
      : undefined;

    const customOverrides: ViewStyle = {};
    if (backgroundColor) customOverrides.backgroundColor = backgroundColor;
    if (borderColor) customOverrides.borderColor = borderColor;
    if (borderRadius !== undefined) customOverrides.borderRadius = borderRadius;

    if (showShadow) {
      customOverrides.shadowColor = customShadowColor ?? backgroundColor ?? BUTTON_CONFIG.colors.primary;
    } else {
      customOverrides.shadowOpacity = 0;
      customOverrides.elevation = 0;
    }

    return [
      baseStyle,
      sizeStyle,
      disabledStyle,
      fullWidth && styles.fullWidth,
      customOverrides,
      style,
    ].filter(Boolean) as ViewStyle[];
  };

  const getTextStyle = () => {
    const baseTextStyle = isFilled
      ? styles.filledButtonText
      : styles.outlineButtonText;
    const sizeTextStyle = styles[
      `${size}ButtonText` as keyof typeof styles
    ] as TextStyle;
    
    const customTextOverrides: TextStyle = {};
    if (textColor) customTextOverrides.color = textColor;

    const disabledTextStyle =
      isDisabled && !isFilled ? { color: disabledTextColor ?? BUTTON_CONFIG.colors.text.outlineDisabled } : null;
    
    if (isDisabled && isFilled && disabledTextColor) {
      customTextOverrides.color = disabledTextColor;
    }

    return [
      baseTextStyle,
      sizeTextStyle,
      disabledTextStyle,
      customTextOverrides,
      textStyle,
    ];
  };

  const getLoadingColor = () => {
    if (customLoadingColor) return customLoadingColor;
    if (textColor) return textColor;
    if (isFilled) return BUTTON_CONFIG.colors.text.filled;
    return isDisabled
      ? BUTTON_CONFIG.colors.text.outlineDisabled
      : BUTTON_CONFIG.colors.text.outline;
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], width: fullWidth ? '100%' : undefined }}>
      <Pressable
        style={({ pressed }) => [
          ...getButtonStyle(),
          pressed && pressedBackgroundColor ? { backgroundColor: pressedBackgroundColor } : undefined,
        ]}
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        hitSlop={hitSlop}
        accessibilityLabel={accessibilityLabel ?? title}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: isLoading }}
      >
        <View style={[styles.buttonContent, contentStyle]}>
          {isLoading ? (
            <ActivityIndicator size="small" color={getLoadingColor()} />
          ) : (
            <>
              {icon && iconPosition === 'left' && (
                <View
                  style={[
                    styles.iconContainer,
                    title ? { marginRight: sizeConfig.gap } : undefined,
                  ]}
                >
                  {icon}
                </View>
              )}
              {title && (
                <Text style={getTextStyle()}>
                  {title}
                </Text>
              )}
              {icon && iconPosition === 'right' && (
                <View
                  style={[
                    styles.iconContainer,
                    title ? { marginLeft: sizeConfig.gap } : undefined,
                  ]}
                >
                  {icon}
                </View>
              )}
              </>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  filledButton: {
    backgroundColor: BUTTON_CONFIG.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButtonDisabled: {
    borderColor: BUTTON_CONFIG.colors.outlineBorderDisabled,
  },
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
  filledButtonText: {
    color: BUTTON_CONFIG.colors.text.filled,
    fontWeight: '600',
  },
  outlineButtonText: {
    color: BUTTON_CONFIG.colors.text.outline,
    fontWeight: '600',
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

export default Button;