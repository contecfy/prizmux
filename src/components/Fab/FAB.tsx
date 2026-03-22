import React, { useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { FABPosition, FABProps, FABSize } from './FAB.types';


// Size config
const SIZE_CONFIG: Record<FABSize, { button: number; fontSize: number }> = {
  small:  { button: 40, fontSize: 12 },
  medium: { button: 56, fontSize: 14 },
  large:  { button: 72, fontSize: 16 },
};

// Position config — maps to absolute positioning
const getPositionStyle = (
  position: FABPosition,
  offsetX: number,
  offsetY: number
) => {
  switch (position) {
    case 'bottom-right':
      return { bottom: offsetY, right: offsetX };
    case 'bottom-left':
      return { bottom: offsetY, left: offsetX };
    case 'bottom-center':
      return { bottom: offsetY, alignSelf: 'center' as const };
    case 'top-right':
      return { top: offsetY, right: offsetX };
    case 'top-left':
      return { top: offsetY, left: offsetX };
    case 'top-center':
      return { top: offsetY, alignSelf: 'center' as const };
  }
};

export const FAB: React.FC<FABProps> = ({
  onPress,
  onLongPress,
  icon,
  label,
  labelPosition = 'right',
  position = 'bottom-right',
  offsetX = 16,
  offsetY = 24,
  size = 'medium',
  borderRadius,
  backgroundColor = '#6366F1',
  iconColor,
  labelColor = '#FFFFFF',
  shadowColor,
  disabledBackgroundColor = '#9CA3AF',
  disabledLabelColor = '#E5E7EB',
  loadingColor = '#FFFFFF',
  showShadow = true,
  disabled = false,
  loading = false,
  style,
  labelStyle,
  containerStyle,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const sizeConfig = SIZE_CONFIG[size];
  const buttonSize = sizeConfig.button;
  // Default to circle (half of size), consumer can override
  const radius = borderRadius ?? buttonSize / 2;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.92,
      useNativeDriver: true,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 4,
    }).start();
  };

  const positionStyle = getPositionStyle(position, offsetX, offsetY);

  const hasLabel = !!label;
  const hasIcon = !!icon;

  // When there's a label, the button becomes a pill/row — not a perfect square
  const isExtended = hasLabel && hasIcon;
  const isLabelOnly = hasLabel && !hasIcon;

  // Layout direction based on labelPosition
  const isHorizontal = labelPosition === 'left' || labelPosition === 'right';
  const flexDirection =
    labelPosition === 'left'
      ? 'row-reverse'
      : labelPosition === 'right'
      ? 'row'
      : labelPosition === 'top'
      ? 'column-reverse'
      : 'column';

  const gap = size === 'small' ? 6 : size === 'medium' ? 8 : 10;

  return (
    <View
      style={[
        styles.container,
        positionStyle,
        containerStyle,
      ]}
      pointerEvents="box-none"
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable
          onPress={onPress}
          onLongPress={onLongPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled || loading}
          accessibilityRole="button"
          accessibilityLabel={label ?? 'FAB'}
          accessibilityState={{ disabled: disabled || loading }}
          style={[
            styles.button,
            {
              backgroundColor: disabled ? disabledBackgroundColor : backgroundColor,
              borderRadius: radius,
              // Square dimensions only when icon-only or label-only with no icon
              width: isExtended ? undefined : isLabelOnly ? undefined : buttonSize,
              height: buttonSize,
              paddingHorizontal: isExtended || isLabelOnly ? 20 : 0,
              flexDirection: flexDirection as ViewStyle['flexDirection'],
              gap: isExtended ? gap : 0,
            },
            showShadow ? { shadowColor: shadowColor ?? backgroundColor } : { shadowOpacity: 0, elevation: 0 },
            style,
          ]}
        >
          {loading ? (
            <ActivityIndicator
              size={size === 'large' ? 'large' : 'small'}
              color={loadingColor}
            />
          ) : (
            <>
              {hasIcon && (
                <View style={styles.iconWrapper}>{icon}</View>
              )}
              {hasLabel && (
                <Text
                  style={[
                    styles.label,
                    {
                      fontSize: sizeConfig.fontSize,
                      color: disabled ? disabledLabelColor : labelColor,
                      marginTop:
                        !isHorizontal && hasIcon ? gap / 2 : 0,
                      marginBottom:
                        labelPosition === 'top' && hasIcon ? gap / 2 : 0,
                    },
                    labelStyle,
                  ]}
                >
                  {label}
                </Text>
              )}
            </>
          )}
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default FAB;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 99,
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});