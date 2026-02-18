import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { EmptyStateProps } from './EmptyState.types';

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
}) => (
  <View style={styles.container}>
    {icon && <View style={styles.iconContainer}>{icon}</View>}
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
    {action && <View style={styles.actionContainer}>{action}</View>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#F9FAFB',
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  actionContainer: {
    width: '100%',
  },
});