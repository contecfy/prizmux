import React, { useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { ToastProps, ToastType } from './Toast.types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TYPE_COLORS: Record<ToastType, { bg: string; text: string }> = {
  success: { bg: '#166534', text: '#FFFFFF' },
  error:   { bg: '#991B1B', text: '#FFFFFF' },
  warning: { bg: '#92400E', text: '#FFFFFF' },
  info:    { bg: '#1E3A8A', text: '#FFFFFF' },
};

const DefaultCloseIcon = () => (
  <Text style={styles.defaultCloseIcon}>✕</Text>
);

export const Toast: React.FC<ToastProps> = ({
  visible,
  onHide,
  text,
  description,
  type = 'info',
  position = 'top',
  dismiss = 'auto',
  duration = 3000,
  swipeable = false,
  swipeDirection = 'horizontal',
  swipeThreshold = 80,
  icon,
  closeIcon,
  backgroundColor,
  textColor,
  descriptionColor,
  borderRadius = 10,
  style,
  textStyle,
  descriptionStyle,
  iconContainerStyle,
  closeButtonStyle,
  overlayStyle,
  shadowColor,
}) => {
  const slideAnim = useRef(new Animated.Value(position === 'top' ? -120 : 120)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const swipeX = useRef(new Animated.Value(0)).current;
  const swipeY = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAnimatingOut = useRef(false);

  const colors = TYPE_COLORS[type];
  const bgColor = backgroundColor ?? colors.bg;
  const txtColor = textColor ?? colors.text;
  const descColor = descriptionColor ?? txtColor;
  const isManualOrBoth = dismiss === 'manual' || dismiss === 'both';

  const animateOut = useCallback((
    direction?: 'left' | 'right' | 'up' | 'down'
  ) => {
    if (isAnimatingOut.current) return;
    isAnimatingOut.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);

    const swipeAnimations: Animated.CompositeAnimation[] = [];

    if (direction === 'left') {
      swipeAnimations.push(
        Animated.timing(swipeX, { toValue: -SCREEN_WIDTH, duration: 250, useNativeDriver: true })
      );
    } else if (direction === 'right') {
      swipeAnimations.push(
        Animated.timing(swipeX, { toValue: SCREEN_WIDTH, duration: 250, useNativeDriver: true })
      );
    } else if (direction === 'up') {
      swipeAnimations.push(
        Animated.timing(swipeY, { toValue: -300, duration: 250, useNativeDriver: true })
      );
    } else if (direction === 'down') {
      swipeAnimations.push(
        Animated.timing(swipeY, { toValue: 300, duration: 250, useNativeDriver: true })
      );
    }

    Animated.parallel([
      ...swipeAnimations,
      Animated.timing(slideAnim, {
        toValue: position === 'top' ? -120 : 120,
        duration: direction ? 0 : 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      isAnimatingOut.current = false;
      swipeX.setValue(0);
      swipeY.setValue(0);
      onHide();
    });
  }, [slideAnim, opacityAnim, swipeX, swipeY, position, onHide]);

  const animateIn = useCallback(() => {
    isAnimatingOut.current = false;
    swipeX.setValue(0);
    swipeY.setValue(0);
    slideAnim.setValue(position === 'top' ? -120 : 120);
    opacityAnim.setValue(0);

    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [slideAnim, opacityAnim, swipeX, swipeY, position]);

  useEffect(() => {
    if (visible) {
      animateIn();
      if (dismiss === 'auto' || dismiss === 'both') {
        timerRef.current = setTimeout(() => animateOut(), duration);
      }
    } else {
      slideAnim.setValue(position === 'top' ? -120 : 120);
      opacityAnim.setValue(0);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, dismiss, duration, position]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => swipeable && isManualOrBoth,
      onMoveShouldSetPanResponder: (_, gs) => {
        if (!swipeable || !isManualOrBoth) return false;
        const { dx, dy } = gs;
        if (swipeDirection === 'horizontal') return Math.abs(dx) > 5;
        if (swipeDirection === 'vertical') return Math.abs(dy) > 5;
        return Math.abs(dx) > 5 || Math.abs(dy) > 5;
      },
      onPanResponderMove: (_, gs) => {
        if (swipeDirection === 'horizontal' || swipeDirection === 'both') {
          swipeX.setValue(gs.dx);
        }
        if (swipeDirection === 'vertical' || swipeDirection === 'both') {
          swipeY.setValue(gs.dy);
        }
      },
      onPanResponderRelease: (_, gs) => {
        const { dx, dy, vx, vy } = gs;
        const swipedH =
          (swipeDirection === 'horizontal' || swipeDirection === 'both') &&
          (Math.abs(dx) > swipeThreshold || Math.abs(vx) > 0.8);
        const swipedV =
          (swipeDirection === 'vertical' || swipeDirection === 'both') &&
          (Math.abs(dy) > swipeThreshold || Math.abs(vy) > 0.8);

        if (swipedH) {
          animateOut(dx > 0 ? 'right' : 'left');
        } else if (swipedV) {
          animateOut(dy > 0 ? 'down' : 'up');
        } else {
          Animated.parallel([
            Animated.spring(swipeX, { toValue: 0, useNativeDriver: true, bounciness: 5 }),
            Animated.spring(swipeY, { toValue: 0, useNativeDriver: true, bounciness: 5 }),
          ]).start();
        }
      },
    })
  ).current;

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={isManualOrBoth ? () => animateOut() : undefined}
    >
      <View
        style={[
          styles.overlay,
          position === 'bottom' ? styles.overlayBottom : styles.overlayTop,
          overlayStyle,
        ]}
        pointerEvents="box-none"
      >
        <Animated.View
          style={[
            styles.toast,
            {
              backgroundColor: bgColor,
              borderRadius,
              transform: [
                { translateY: Animated.add(slideAnim, swipeY) },
                { translateX: swipeX },
              ],
              opacity: opacityAnim,
            },
            shadowColor ? { shadowColor } : undefined,
            style,
          ]}
          {...panResponder.panHandlers}
        >
          {/* Icon */}
          {icon && (
            <View style={[styles.iconContainer, iconContainerStyle]}>
              {icon}
            </View>
          )}

          {/* Text */}
          <View style={styles.textContainer}>
            <Text style={[styles.text, { color: txtColor }, textStyle]}>
              {text}
            </Text>
            {description && (
              <Text
                style={[
                  styles.description,
                  { color: descColor },
                  descriptionStyle,
                ]}
              >
                {description}
              </Text>
            )}
          </View>

          {/* Close button */}
          {isManualOrBoth && (
            <Pressable
              onPress={() => animateOut()}
              style={[styles.closeButton, closeButtonStyle]}
              hitSlop={10}
              accessibilityLabel="Dismiss notification"
              accessibilityRole="button"
            >
              {closeIcon ?? <Text style={[styles.defaultCloseIcon, { color: txtColor }]}>✕</Text>}
            </Pressable>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Toast;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  } as any,
  overlayTop: {
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  overlayBottom: {
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: SCREEN_WIDTH - 40,
    width: SCREEN_WIDTH - 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    gap: 10,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    fontSize: 12,
    fontWeight: '400',
    opacity: 0.85,
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  defaultCloseIcon: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});