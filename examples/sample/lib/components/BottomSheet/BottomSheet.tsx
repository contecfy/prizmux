import React, { useEffect, useRef, useState, useCallback } from 'react';
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
import type { BottomSheetProps } from './BottomSheet.types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function BottomSheet({
  visible,
  onClose,
  title,
  children,
  dismissOnTouchOutside = true,
  showCloseButton = true,
  showDragHandle = true,
  swipeToClose = true,
  closeIcon,
  // New customization props
  containerStyle,
  backdropStyle,
  headerStyle,
  titleStyle,
  handleStyle,
  handleContainerStyle,
  closeButtonStyle,
  closeIconStyle,
  contentContainerStyle,
  backgroundColor,
  backdropColor,
  textColor,
  handleColor,
  shadowColor,
  borderColor,
  borderRadius,
  // Header Refinements
  showHeaderBorder = true,
  headerBorderBottomColor,
  closePosition = 'right',
  titlePosition = 'left',
}: BottomSheetProps) {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const [dynamicHeight, setDynamicHeight] = useState(SCREEN_HEIGHT * 0.6);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return swipeToClose && gestureState.dy > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy >= 0) {
          slideAnim.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const threshold = dynamicHeight * 0.4;
        const isSwipedDown = gestureState.dy > threshold || gestureState.vy > 0.5;

        if (isSwipedDown) {
          closeModal();
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 5,
          }).start();
        }
      },
    })
  ).current;

  const openModal = useCallback(() => {
    Animated.parallel([
      Animated.timing(backdropAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }),
    ]).start();
  }, [backdropAnim, slideAnim]);

  const closeModal = useCallback(() => {
    Animated.parallel([
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: dynamicHeight,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  }, [backdropAnim, slideAnim, dynamicHeight, onClose]);

  useEffect(() => {
    if (visible) {
      openModal();
    }
  }, [visible, openModal]);

  if (!visible) return null;

  return (
    <Modal
      animationType="none"
      transparent
      visible={visible}
      onRequestClose={closeModal}
      statusBarTranslucent
    >
      {/* Backdrop */}
      <Pressable
        style={styles.backdropPressable}
        onPress={() => dismissOnTouchOutside && closeModal()}
      >
        <Animated.View
          style={[
            styles.backdrop,
            { opacity: backdropAnim },
            backdropColor ? { backgroundColor: backdropColor } : undefined,
            backdropStyle,
          ]}
        />
      </Pressable>

      {/* Sheet */}
      <Animated.View
        style={[
          styles.modalContainer,
          {
            maxHeight: SCREEN_HEIGHT * 0.9,
            transform: [{ translateY: slideAnim }],
            borderTopLeftRadius: borderRadius ?? styles.modalContainer.borderTopLeftRadius,
            borderTopRightRadius: borderRadius ?? styles.modalContainer.borderTopRightRadius,
          },
          backgroundColor ? { backgroundColor } : undefined,
          shadowColor ? { shadowColor } : undefined,
          borderColor ? { borderColor, borderWidth: 1 } : undefined,
          containerStyle,
        ]}
        onLayout={(event) => {
          const { height: layoutHeight } = event.nativeEvent.layout;
          setDynamicHeight(layoutHeight);
          if (visible) {
            slideAnim.setValue(layoutHeight);
            openModal();
          }
        }}
        {...panResponder.panHandlers}
      >
        {/* Drag handle */}
        {showDragHandle && (
          <View style={[styles.dragHandleContainer, handleContainerStyle]}>
            <View
              style={[
                styles.dragHandle,
                handleColor ? { backgroundColor: handleColor } : undefined,
                handleStyle,
              ]}
            />
          </View>
        )}

        {/* Header */}
        {(title || showCloseButton) && (
          <View
            style={[
              styles.header,
              {
                borderBottomWidth: showHeaderBorder ? StyleSheet.hairlineWidth : 0,
                borderBottomColor: headerBorderBottomColor ?? styles.header.borderBottomColor,
              },
              headerStyle,
            ]}
          >
            {/* Left Slot: Extreme Left */}
            <View style={[styles.headerSlot, { alignItems: 'flex-start' }]}>
              {showCloseButton && closePosition === 'left' && (
                <Pressable
                  style={[styles.closeButton, { marginLeft: 0 }, closeButtonStyle]}
                  onPress={closeModal}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  {closeIcon ?? (
                    <Text style={[styles.defaultCloseIcon, closeIconStyle]}>✕</Text>
                  )}
                </Pressable>
              )}
              {title && titlePosition === 'left' && (
                <Text style={[styles.title, textColor ? { color: textColor } : undefined, titleStyle]} numberOfLines={1}>{title}</Text>
              )}
            </View>

            {/* Center Slot: Extreme Center */}
            <View style={[styles.headerSlot, { alignItems: 'center' }]}>
              {title && titlePosition === 'center' && (
                <Text style={[styles.title, { textAlign: 'center' }, textColor ? { color: textColor } : undefined, titleStyle]} numberOfLines={1}>{title}</Text>
              )}
            </View>

            {/* Right Slot: Extreme Right */}
            <View style={[styles.headerSlot, { alignItems: 'flex-end' }]}>
              {title && titlePosition === 'right' && (
                <Text style={[styles.title, { textAlign: 'right' }, textColor ? { color: textColor } : undefined, titleStyle]} numberOfLines={1}>{title}</Text>
              )}
              {showCloseButton && closePosition === 'right' && (
                <Pressable
                  style={[styles.closeButton, { marginRight: 0 }, closeButtonStyle]}
                  onPress={closeModal}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  {closeIcon ?? (
                    <Text style={[styles.defaultCloseIcon, closeIconStyle]}>✕</Text>
                  )}
                </Pressable>
              )}
            </View>
          </View>
        )}

        {/* Content */}
        <View style={[styles.contentContainer, contentContainerStyle]}>
          {children}
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdropPressable: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    zIndex: 2,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  dragHandleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16, // lowered for more extreme edges
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    minHeight: 60,
  },
  headerSlot: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  defaultCloseIcon: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
});