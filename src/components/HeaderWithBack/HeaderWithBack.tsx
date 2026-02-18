import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { HeaderWithBackProps } from './HeaderWithBack.types';

export const HeaderWithBack: React.FC<HeaderWithBackProps> = ({
  title,
  avatar,
  titlePosition = 'center',
  onBackPress,
  backIcon,
  actions = [],
}) => {
  const titleStyle =
    titlePosition === 'left'
      ? styles.titleLeft
      : titlePosition === 'right'
      ? styles.titleRight
      : styles.titleCenter;

  const visibleActions = actions.slice(0, 4);

  return (
    <View style={styles.header}>
      {/* Back button */}
      <Pressable
        onPress={onBackPress}
        style={styles.backButton}
        android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
      >
        {backIcon ?? <Text style={styles.backIcon}>‹</Text>}
      </Pressable>

      {/* Avatar — render as-is if provided */}
      {avatar && <View style={styles.avatarContainer}>{avatar}</View>}

      {/* Title */}
      <Text style={[styles.title, titleStyle]} numberOfLines={1}>
        {title}
      </Text>

      {/* Right actions */}
      <View style={styles.actionsContainer}>
        {visibleActions.map((action, index) => (
          <Pressable
            key={index}
            onPress={action.onPress}
            style={styles.actionButton}
            android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
          >
            {action.icon}
            {action.badge !== undefined && (
              <View style={styles.badge}>
                <Text style={styles.badgeText} numberOfLines={1}>
                  {typeof action.badge === 'number' && action.badge > 99
                    ? '99+'
                    : action.badge}
                </Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 28,
    color: '#111827',
    lineHeight: 32,
    fontWeight: '300',
  },
  avatarContainer: {
    marginLeft: 6,
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginHorizontal: 8,
  },
  titleLeft: { textAlign: 'left' },
  titleCenter: { textAlign: 'center' },
  titleRight: { textAlign: 'right' },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});