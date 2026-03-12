import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { DS } from '@/constants/theme';
import type { Message } from './types';

const { colors, spacing, radius } = DS;

interface Props {
  message: Message;
  index: number;
}

export function MessageBubble({ message, index }: Props) {
  const isBot = message.role === 'bot';

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 60).springify()}
      style={[styles.row, isBot ? styles.rowBot : styles.rowUser]}
    >
      {/* Avatar mínimo do bot */}
      {isBot && (
        <View style={styles.botAvatar}>
          <Text style={styles.botAvatarEmoji}>🤖</Text>
        </View>
      )}

      <View
        style={[
          styles.bubble,
          isBot ? styles.bubbleBot : styles.bubbleUser,
        ]}
      >
        {/* Áudio badge */}
        {message.isAudio && (
          <View style={styles.audioBadge}>
            <Text style={styles.audioBadgeText}>🎙 Audio message</Text>
          </View>
        )}

        {message.text ? (
          <Text style={[styles.text, isBot ? styles.textBot : styles.textUser]}>
            {message.text}
          </Text>
        ) : null}

        <Text style={styles.timestamp}>
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  rowBot: {
    justifyContent: 'flex-start',
  },
  rowUser: {
    justifyContent: 'flex-end',
  },

  // Bot avatar
  botAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.card.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  botAvatarEmoji: {
    fontSize: 14,
  },

  // Bubble
  bubble: {
    maxWidth: '78%',
    borderRadius: radius.card,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
  },
  bubbleBot: {
    backgroundColor: colors.card.primary,
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bubbleUser: {
    backgroundColor: colors.blue.primary,
    borderTopRightRadius: 4,
  },

  text: {
    fontSize: 14,
    lineHeight: 20,
  },
  textBot: {
    color: colors.text.primary,
  },
  textUser: {
    color: '#fff',
  },

  audioBadge: {
    marginBottom: spacing.xs,
  },
  audioBadgeText: {
    fontSize: 12,
    color: colors.text.secondary,
  },

  timestamp: {
    fontSize: 10,
    color: colors.text.muted,
    marginTop: spacing.xs,
    textAlign: 'right',
  },
});
