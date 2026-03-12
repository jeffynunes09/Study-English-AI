import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { DS } from '@/constants/theme';
import type { CorrectionData } from './types';

const { colors, spacing, radius, shadows } = DS;

interface Props {
  correction: CorrectionData;
}

const ERROR_LABEL: Record<string, string> = {
  grammar: '📝 Grammar',
  pronunciation: '🔊 Pronunciation',
};

export function CorrectionCard({ correction }: Props) {
  return (
    <Animated.View entering={FadeInUp.springify()} style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>⚠ Correction needed</Text>
        </View>
      </View>

      {/* Original */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Your answer</Text>
        <Text style={styles.originalText}>{correction.original}</Text>
      </View>

      {/* Errors */}
      <View style={styles.divider} />
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Issues found</Text>
        {correction.errors.map((err, i) => (
          <View key={i} style={styles.errorRow}>
            <Text style={styles.errorType}>{ERROR_LABEL[err.type]}</Text>
            <Text style={styles.errorDetail}>{err.detail}</Text>
          </View>
        ))}
      </View>

      {/* Suggestion */}
      <View style={styles.divider} />
      <View style={styles.suggestionBox}>
        <Text style={styles.sectionLabel}>Try saying</Text>
        <Text style={styles.suggestionText}>"{correction.suggestion}"</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.card.primary,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: '#FF6B6B44',
    marginBottom: spacing.sm,
    overflow: 'hidden',
    ...shadows.card,
  },

  header: {
    backgroundColor: '#FF6B6B18',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#FF6B6B22',
  },
  headerBadge: {},
  headerBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF6B6B',
  },

  section: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    gap: spacing.xs,
  },
  sectionLabel: {
    fontSize: 11,
    color: colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  originalText: {
    fontSize: 14,
    color: colors.text.secondary,
    fontStyle: 'italic',
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },

  errorRow: {
    marginBottom: spacing.xs,
  },
  errorType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFAA44',
  },
  errorDetail: {
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: 1,
  },

  suggestionBox: {
    backgroundColor: '#3A8DFF12',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    gap: spacing.xs,
  },
  suggestionText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.blue.mid,
    lineHeight: 22,
  },
});
