import { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { DS } from '@/constants/theme';

const { colors, spacing, radius, shadows } = DS;

interface Props {
  onSendText: (text: string) => void;
  onSendAudio: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSendText, onSendAudio, disabled, placeholder }: Props) {
  const [text, setText] = useState('');
  const [recording, setRecording] = useState(false);
  const micScale = useSharedValue(1);

  const micStyle = useAnimatedStyle(() => ({
    transform: [{ scale: micScale.value }],
  }));

  function handleSend() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSendText(trimmed);
    setText('');
  }

  function handleMicPressIn() {
    setRecording(true);
    micScale.value = withSpring(1.2);
  }

  function handleMicPressOut() {
    setRecording(false);
    micScale.value = withSpring(1);
    onSendAudio();
  }

  const hasText = text.trim().length > 0;

  return (
    <View style={styles.container}>
      {recording && (
        <View style={styles.recordingBanner}>
          <Text style={styles.recordingDot}>●</Text>
          <Text style={styles.recordingText}>Recording… release to send</Text>
        </View>
      )}

      <View style={styles.row}>
        {/* Text input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder={placeholder ?? 'Type your answer…'}
            placeholderTextColor={colors.text.muted}
            multiline
            maxLength={500}
            editable={!disabled}
            onSubmitEditing={handleSend}
          />
        </View>

        {/* Send or Mic */}
        {hasText ? (
          <TouchableOpacity onPress={handleSend} disabled={disabled} activeOpacity={0.8}>
            <LinearGradient
              colors={colors.blue.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.actionBtn}
            >
              <Text style={styles.sendArrow}>↑</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <Animated.View style={micStyle}>
            <Pressable
              onPressIn={handleMicPressIn}
              onPressOut={handleMicPressOut}
              disabled={disabled}
            >
              <View style={[styles.actionBtn, styles.micBtn, recording && styles.micRecording]}>
                <Text style={styles.micEmoji}>🎙</Text>
              </View>
            </Pressable>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background.secondary,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  recordingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingBottom: spacing.sm,
    justifyContent: 'center',
  },
  recordingDot: {
    color: '#FF6B6B',
    fontSize: 10,
  },
  recordingText: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: '500',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },

  inputWrapper: {
    flex: 1,
    backgroundColor: colors.card.primary,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 44,
    maxHeight: 120,
    justifyContent: 'center',
  },
  input: {
    color: colors.text.primary,
    fontSize: 14,
    lineHeight: 20,
  },

  actionBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.glow,
  },
  sendArrow: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  micBtn: {
    backgroundColor: colors.card.secondary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  micRecording: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FF6B6B22',
  },
  micEmoji: {
    fontSize: 20,
  },
});
