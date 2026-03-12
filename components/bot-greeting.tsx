import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { DS } from '@/constants/theme';

const { colors, spacing, radius, shadows } = DS;

interface BotGreetingProps {
  userName?: string;
}

export function BotGreeting({ userName = 'Estudante' }: BotGreetingProps) {
  const avatarScale = useSharedValue(0);
  const bubbleOpacity = useSharedValue(0);
  const bubbleTranslateX = useSharedValue(-12);

  useEffect(() => {
    avatarScale.value = withSpring(1, { damping: 12, stiffness: 120 });
    bubbleOpacity.value = withDelay(400, withTiming(1, { duration: 300 }));
    bubbleTranslateX.value = withDelay(400, withSpring(0, { damping: 14 }));
  }, []);

  const avatarStyle = useAnimatedStyle(() => ({
    transform: [{ scale: avatarScale.value }],
  }));

  const bubbleStyle = useAnimatedStyle(() => ({
    opacity: bubbleOpacity.value,
    transform: [{ translateX: bubbleTranslateX.value }],
  }));

  return (
    <View style={styles.row}>
      {/* Avatar do bot */}
      <Animated.View style={[styles.avatarWrapper, avatarStyle]}>
        <LinearGradient
          colors={colors.blue.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.avatarGradient}
        >
          <Text style={styles.avatarEmoji}>🤖</Text>
        </LinearGradient>
        {/* Indicador online */}
        <View style={styles.onlineDot} />
      </Animated.View>

      {/* Speech bubble */}
      <Animated.View style={[styles.bubbleWrapper, bubbleStyle]}>
        {/* Seta da bubble apontando para o avatar */}
        <View style={styles.bubbleArrow} />
        <View style={styles.bubble}>
          <Text style={styles.bubbleGreeting}>
            Bom dia, <Text style={styles.bubbleName}>{userName}</Text>! 👋
          </Text>
          <Text style={styles.bubbleMessage}>
            Vamos praticar seu inglês?
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },

  // Avatar
  avatarWrapper: {
    position: 'relative',
  },
  avatarGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.glow,
  },
  avatarEmoji: {
    fontSize: 26,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4ADE80',
    borderWidth: 2,
    borderColor: colors.background.primary,
  },

  // Speech bubble
  bubbleWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  bubbleArrow: {
    width: 0,
    height: 0,
    borderTopWidth: 7,
    borderBottomWidth: 7,
    borderRightWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: colors.card.secondary,
  },
  bubble: {
    flex: 1,
    backgroundColor: colors.card.secondary,
    borderRadius: radius.card,
    borderTopLeftRadius: 4,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  bubbleGreeting: {
    fontSize: 13,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  bubbleName: {
    color: colors.blue.mid,
    fontWeight: '600',
  },
  bubbleMessage: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text.primary,
  },
});
