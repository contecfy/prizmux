import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import type { HeaderProps } from './Header.types'

export const Header: React.FC<HeaderProps> = ({
  title,
  avatar,
  titlePosition = 'center',
  showBack = false,
  onBackPress,
  backIcon,
  actions = [],
  // New props
  style,
  titleStyle: customTitleStyle,
  backButtonStyle,
  backIconStyle,
  actionButtonStyle,
  badgeStyle,
  badgeTextStyle,
  avatarContainerStyle,
  backgroundColor,
  borderColor,
  backButtonBackgroundColor,
  backIconColor,
  actionIconColor,
}) => {
  const titleAlignStyle =
    titlePosition === 'left'
      ? styles.titleLeft
      : titlePosition === 'right'
      ? styles.titleRight
      : styles.titleCenter

  const visibleActions = actions.slice(0, 4)

  return (
    <View
      style={[
        styles.header,
        backgroundColor ? { backgroundColor } : undefined,
        borderColor ? { borderBottomColor: borderColor } : undefined,
        style,
      ]}
    >
      {/* Back Button (optional) */}
      {showBack ? (
        <Pressable
          onPress={onBackPress}
          style={[
            styles.backButton,
            backButtonBackgroundColor ? { backgroundColor: backButtonBackgroundColor } : undefined,
            backButtonStyle
          ]}
          android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
        >
          {backIcon ?? (
            <Text style={[
              styles.backIcon,
              backIconColor ? { color: backIconColor } : undefined,
              backIconStyle
            ]}>‹</Text>
          )}
        </Pressable>
      ) : (
        <View style={styles.leftSpacer} />
      )}

      {/* Avatar */}
      {avatar && (
        <View style={[styles.avatarContainer, avatarContainerStyle]}>
          {avatar}
        </View>
      )}

      {/* Title */}
      <Text
        style={[styles.title, titleAlignStyle, customTitleStyle]}
        numberOfLines={1}
      >
        {title}
      </Text>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        {visibleActions.map((action, index) => (
          <Pressable
            key={index}
            onPress={action.onPress}
            style={[
              styles.actionButton,
              actionButtonStyle
            ]}
            android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
          >
            {actionIconColor && React.isValidElement(action.icon)
              ? React.cloneElement(action.icon as React.ReactElement, { color: actionIconColor } as any)
              : action.icon}
            {action.badge !== undefined && (
              <View style={[styles.badge, badgeStyle, action.badgeStyle]}>
                <Text
                  style={[styles.badgeText, badgeTextStyle, action.badgeTextStyle]}
                  numberOfLines={1}
                >
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
  )
}

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

  leftSpacer: {
    width: 40,
    height: 40,
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
