import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Pressable,
  ViewStyle,
  TextStyle,
} from 'react-native';

export type MenuItem = {
  id: string;
  title: string;
  icon?: React.ReactNode;
  onPress: () => void;
  badge?: number | string;
  badgeColor?: string;
};

export interface ContextMenuProps {
  visible: boolean;
  onClose: () => void;
  items: MenuItem[];
  position?: { top?: number; left?: number; right?: number; bottom?: number };
  backgroundColor?: string;
  borderRadius?: number;
  itemTextColor?: string;
  itemStyle?: ViewStyle;
  itemTextStyle?: TextStyle;
  badgeStyle?: ViewStyle;
  badgeTextStyle?: TextStyle;
  showIconBackground?: boolean;
  iconBackgroundColor?: string;
  iconBorderRadius?: number;
  animation?: 'fade' | 'scale' | 'fade-scale' | 'none';
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  visible,
  onClose,
  items,
  position = { top: 40, right: 16 },
  backgroundColor = '#fff',
  borderRadius = 8,
  itemTextColor = '#111827',
  itemStyle,
  itemTextStyle,
  badgeStyle,
  badgeTextStyle,
  showIconBackground = false,
  iconBackgroundColor = 'rgba(0,0,0,0.06)',
  iconBorderRadius = 6,
  animation = 'fade-scale', // default
}) => {
  const opacity = useRef(new Animated.Value(animation === 'fade' || animation === 'fade-scale' ? 0 : 1)).current;
  const scale = useRef(new Animated.Value(animation === 'scale' || animation === 'fade-scale' ? 0.8 : 1)).current;

  useEffect(() => {
    if (visible) {
      if (animation === 'none') {
        opacity.setValue(1);
        scale.setValue(1);
      } else {
        const anims: Animated.CompositeAnimation[] = [];
        if (animation === 'fade' || animation === 'fade-scale') {
          anims.push(Animated.timing(opacity, { toValue: 1, duration: 150, useNativeDriver: true }));
        }
        if (animation === 'scale' || animation === 'fade-scale') {
          anims.push(Animated.spring(scale, { toValue: 1, friction: 6, useNativeDriver: true }));
        }
        Animated.parallel(anims).start();
      }
    } else {
      if (animation === 'none') {
        opacity.setValue(0);
        scale.setValue(0);
      } else {
        const anims: Animated.CompositeAnimation[] = [];
        if (animation === 'fade' || animation === 'fade-scale') {
          anims.push(Animated.timing(opacity, { toValue: 0, duration: 100, useNativeDriver: true }));
        }
        if (animation === 'scale' || animation === 'fade-scale') {
          anims.push(Animated.timing(scale, { toValue: 0.8, duration: 100, useNativeDriver: true }));
        }
        Animated.parallel(anims).start();
      }
    }
  }, [visible, animation]);

  if (!visible) return null;

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.menuContainer,
            position,
            { backgroundColor, borderRadius, opacity, transform: [{ scale }] },
          ]}
        >
          {items.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && { backgroundColor: 'rgba(0,0,0,0.05)' },
                itemStyle,
              ]}
              onPress={() => {
                onClose();
                setTimeout(() => item.onPress(), 150);
              }}
            >
              <View style={styles.itemContent}>
                {item.icon && (
                  <View
                    style={[
                      showIconBackground && {
                        width: 32,
                        height: 32,
                        borderRadius: iconBorderRadius,
                        backgroundColor: iconBackgroundColor,
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    ]}
                  >
                    {item.icon}
                  </View>
                )}
                <Text style={[{ color: itemTextColor }, itemTextStyle]}>{item.title}</Text>
                {item.badge !== undefined && (
                  <View
                    style={[
                      styles.badge,
                      badgeStyle,
                      item.badgeColor && { backgroundColor: item.badgeColor },
                    ]}
                  >
                    <Text style={[styles.badgeText, badgeTextStyle]}>
                      {typeof item.badge === 'number' && item.badge > 99 ? '99+' : item.badge}
                    </Text>
                  </View>
                )}
              </View>
            </Pressable>
          ))}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject },
  menuContainer: {
    position: 'absolute',
    paddingVertical: 8,
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  menuItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#6B7280',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
});