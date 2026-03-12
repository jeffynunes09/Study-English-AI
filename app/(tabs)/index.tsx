import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { BotGreeting } from '@/components/bot-greeting';
import { DS } from '@/constants/theme';

const { colors, spacing, radius, shadows } = DS;

// TODO: substituir pelo usuário autenticado via AuthService
const MOCK_USER = 'Jefferson';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.topBarLabel}>Study English AI</Text>
            <Text style={styles.topBarSub}>Your personal tutor</Text>
          </View>
          <View style={styles.levelBadge}>
            <Text style={styles.levelBadgeText}>B1</Text>
          </View>
        </View>

        {/* Bot greeting */}
        <View style={styles.greetingCard}>
          <BotGreeting userName={MOCK_USER} />
        </View>

        {/* Start practice button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push('/modal')}
        >
          <LinearGradient
            colors={colors.blue.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.startButton}
          >
            <Text style={styles.startButtonText}>Start Practicing  →</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>84%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>3🔥</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
        </View>

        {/* Recent topics */}
        <Text style={styles.sectionTitle}>Recent Topics</Text>
        {RECENT_TOPICS.map((topic) => (
          <TouchableOpacity key={topic.id} activeOpacity={0.8}>
            <View style={styles.topicCard}>
              <View style={styles.topicIconBox}>
                <Text style={styles.topicIcon}>{topic.icon}</Text>
              </View>
              <View style={styles.topicInfo}>
                <Text style={styles.topicName}>{topic.name}</Text>
                <Text style={styles.topicDesc}>{topic.desc}</Text>
              </View>
              <Text style={styles.topicArrow}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const RECENT_TOPICS = [
  { id: 1, icon: '💬', name: 'Daily Conversation', desc: 'Greetings & small talk' },
  { id: 2, icon: '🏢', name: 'Business English', desc: 'Meetings & presentations' },
  { id: 3, icon: '✈️', name: 'Travel & Tourism', desc: 'Airports & hotels' },
];

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },

  // Top bar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  topBarLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
  },
  topBarSub: {
    fontSize: 12,
    color: colors.text.muted,
    marginTop: 2,
  },
  levelBadge: {
    backgroundColor: colors.card.secondary,
    borderRadius: radius.button,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.blue.mid,
  },
  levelBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.blue.mid,
  },

  // Greeting card
  greetingCard: {
    backgroundColor: colors.card.primary,
    borderRadius: radius.card,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },

  // Start button
  startButton: {
    height: 52,
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.glow,
  },
  startButtonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card.primary,
    borderRadius: radius.card,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
  },
  statLabel: {
    fontSize: 11,
    color: colors.text.muted,
    marginTop: 2,
  },

  // Section title
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginTop: spacing.xs,
  },

  // Topic cards
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card.primary,
    borderRadius: radius.card,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    ...shadows.card,
  },
  topicIconBox: {
    width: 44,
    height: 44,
    borderRadius: radius.icon,
    backgroundColor: colors.card.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicIcon: {
    fontSize: 22,
  },
  topicInfo: {
    flex: 1,
  },
  topicName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  topicDesc: {
    fontSize: 12,
    color: colors.text.muted,
    marginTop: 2,
  },
  topicArrow: {
    fontSize: 22,
    color: colors.text.muted,
  },
});
