import React, { useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import type { SidebarProps, SidebarSide } from './Sidebar.types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Get the initial off-screen value based on slide direction
const getInitialTranslate = (side: SidebarSide, width: number, height: number) => {
  switch (side) {
    case 'left':   return { x: -width, y: 0 };
    case 'right':  return { x: width,  y: 0 };
    case 'top':    return { x: 0, y: -height };
    case 'bottom': return { x: 0, y: height };
  }
};

// Position style for the drawer
const getDrawerPosition = (
  side: SidebarSide,
  width: number,
  height: number,
  offsetTop: number,
  offsetSide: number,
) => {
  switch (side) {
    case 'left':
      return {
        left: offsetSide,
        top: offsetTop,
        bottom: 0,
        width,
        height: undefined as number | undefined,
      };
    case 'right':
      return {
        right: offsetSide,
        top: offsetTop,
        bottom: 0,
        width,
        height: undefined as number | undefined,
      };
    case 'top':
      return {
        top: 0,
        left: 0,
        right: 0,
        height,
        width: undefined as number | undefined,
      };
    case 'bottom':
      return {
        bottom: 0,
        left: 0,
        right: 0,
        height,
        width: undefined as number | undefined,
      };
  }
};

// Which corners to round based on slide direction
const getBorderRadius = (side: SidebarSide, radius: number) => {
  switch (side) {
    case 'left':   return { borderTopRightRadius: radius, borderBottomRightRadius: radius };
    case 'right':  return { borderTopLeftRadius: radius, borderBottomLeftRadius: radius };
    case 'top':    return { borderBottomLeftRadius: radius, borderBottomRightRadius: radius };
    case 'bottom': return { borderTopLeftRadius: radius, borderTopRightRadius: radius };
  }
};

export const Sidebar: React.FC<SidebarProps> = ({
  visible,
  onClose,
  items,
  side = 'right',
  width = SCREEN_WIDTH * 0.56,
  height = SCREEN_HEIGHT * 0.5,
  offsetTop = 0,
  offsetSide = 0,
  showOverlay = true,
  overlayColor = 'rgba(0,0,0,0.3)',
  dismissOnOverlayPress = true,
  backgroundColor = '#FFFFFF',
  borderRadius = 0,
  header,
  showHeader = true,
  headerStyle,
  showIconBackground = false,
  iconBackgroundColor = 'rgba(0,0,0,0.06)',
  iconBorderRadius = 8,
  activeItemColor = '#F3F4F6',
  itemTextColor = '#111827',
  badgeBorderRadius = 12,
  shadow = true,
  style,
  itemStyle,
  itemTextStyle,
  badgeStyle,
  badgeTextStyle,
}) => {
  const isHorizontal = side === 'left' || side === 'right';
  const initial = getInitialTranslate(side, width, height);

  const translateX = useRef(new Animated.Value(initial.x)).current;
  const translateY = useRef(new Animated.Value(initial.y)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const animateIn = useCallback(() => {
    translateX.setValue(initial.x);
    translateY.setValue(initial.y);
    opacityAnim.setValue(0);

    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.spring(translateX, {
        toValue: 0,
        bounciness: 0,
        speed: 20,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        bounciness: 0,
        speed: 20,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateX, translateY, opacityAnim, initial]);

  const animateOut = useCallback((onDone?: () => void) => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: initial.x,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: initial.y,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onDone?.());
  }, [translateX, translateY, opacityAnim, initial]);

  useEffect(() => {
    if (visible) {
      animateIn();
    }
  }, [visible]);

  const handleClose = useCallback(() => {
    animateOut(onClose);
  }, [animateOut, onClose]);

  if (!visible) return null;

  const positionStyle = getDrawerPosition(side, width, height, offsetTop, offsetSide);
  const radiusStyle = getBorderRadius(side, borderRadius);

  const shadowStyle = shadow ? {
    shadowColor: '#000',
    shadowOffset: { width: side === 'right' ? -2 : 2, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
  } : {};

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      {/* Backdrop */}
      {showOverlay ? (
        <TouchableWithoutFeedback onPress={dismissOnOverlayPress ? handleClose : undefined}>
          <Animated.View
            style={[
              styles.backdrop,
              { backgroundColor: overlayColor, opacity: opacityAnim },
            ]}
          />
        </TouchableWithoutFeedback>
      ) : (
        // Invisible touch area just to capture taps outside when no overlay
        dismissOnOverlayPress && (
          <TouchableWithoutFeedback onPress={handleClose}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>
        )
      )}

      {/* Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          positionStyle,
          radiusStyle,
          shadowStyle,
          { backgroundColor, transform: [{ translateX }, { translateY }] },
          style,
        ]}
      >
        {/* Header */}
        {header && showHeader && (
          <View style={[styles.header, headerStyle]}>{header}</View>
        )}

        {/* Items */}
        <View style={styles.menuContainer}>
          {items.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && { backgroundColor: activeItemColor },
                itemStyle,
              ]}
              onPress={() => {
                handleClose();
                setTimeout(() => item.onPress(), 220);
              }}
              android_ripple={{ color: 'rgba(0,0,0,0.05)', borderless: false }}
            >
              <View style={styles.menuItemContent}>
                {/* Icon */}
                {item.icon && (
                  <View
                    style={[
                      styles.iconContainer,
                      showIconBackground && {
                        backgroundColor: iconBackgroundColor,
                        borderRadius: iconBorderRadius,
                        width: 36,
                        height: 36,
                      },
                    ]}
                  >
                    {item.icon}
                  </View>
                )}

                {/* Label */}
                <Text
                  style={[
                    styles.menuItemText,
                    { color: itemTextColor },
                    itemTextStyle,
                  ]}
                >
                  {item.title}
                </Text>

                {/* Badge */}
                {item.badge !== undefined && (
                  <View
                    style={[
                      styles.badge,
                      { borderRadius: badgeBorderRadius },
                      item.badgeColor ? { backgroundColor: item.badgeColor } : null,
                      badgeStyle,
                    ]}
                  >
                    <Text style={[styles.badgeText, badgeTextStyle]}>
                      {typeof item.badge === 'number' && item.badge > 99
                        ? '99+'
                        : item.badge}
                    </Text>
                  </View>
                )}
              </View>
            </Pressable>
          ))}
        </View>
      </Animated.View>
    </Modal>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  drawer: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 10,
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  menuContainer: {
    paddingVertical: 8,
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 8,
    marginVertical: 2,
    borderRadius: 8,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  badge: {
    minWidth: 20,
    height: 20,
    backgroundColor: '#6B7280',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});