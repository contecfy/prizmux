import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { AlertProps } from './Alert.types';

export const Alert: React.FC<AlertProps> = ({
  visible,
  onClose,
  title,
  message,
  icon,
  children,
  dismissOnBackdropPress = true,
  borderRadius = 16,
  backgroundColor = '#FFFFFF',
  overlayColor = 'rgba(0,0,0,0.5)',
  style,
  titleStyle,
  messageStyle,
  overlayStyle,
  iconContainerStyle,
  contentContainerStyle,
}) => {
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      scaleAnim.setValue(0.85);
      opacityAnim.setValue(0);
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          bounciness: 6,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={dismissOnBackdropPress ? onClose : undefined}
    >
      {/* Backdrop */}
      <Pressable
        style={[styles.overlay, { backgroundColor: overlayColor }, overlayStyle]}
        onPress={dismissOnBackdropPress ? onClose : undefined}
      >
        {/* Prevent backdrop press from leaking through the alert box */}
        <Pressable onPress={() => {}}>
          <Animated.View
            style={[
              styles.alertBox,
              {
                backgroundColor,
                borderRadius,
                opacity: opacityAnim,
                transform: [{ scale: scaleAnim }],
              },
              style,
            ]}
          >
            {/* Icon */}
            {icon && (
              <View style={[styles.iconContainer, iconContainerStyle]}>
                {icon}
              </View>
            )}

            {/* Title */}
            {title && (
              <Text style={[styles.title, titleStyle]}>{title}</Text>
            )}

            {/* Message */}
            {message && (
              <Text style={[styles.message, messageStyle]}>{message}</Text>
            )}

            {/* Consumer content — buttons, inputs, anything */}
            {children && (
              <View style={[styles.contentContainer, contentContainerStyle]}>
                {children}
              </View>
            )}
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default Alert;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  alertBox: {
    width: '100%',
    maxWidth: 340,
    paddingTop: 8,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  iconContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  message: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 10,
  },
});