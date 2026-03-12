import { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  FlatList, TouchableOpacity, ListRenderItem,
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { DS } from '@/constants/theme';
import { MessageBubble } from '@/components/chat/message-bubble';
import { CorrectionCard } from '@/components/chat/correction-card';
import { ChatInput } from '@/components/chat/chat-input';
import { useChatStore } from '@/store/chat.store';
import type { Message } from '@/components/chat/types';

const { colors, spacing, radius, shadows } = DS;

export default function ChatScreen() {
  const { messages, isTyping, phase, startSession, sendMessage, sendAudio } = useChatStore();
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    startSession();
  }, []);

  function scrollToEnd() {
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  }

  // ── Opções (next / repeat) ─────────────────────────────────────────────────

  function handleNextQuestion() {
    sendMessage('next question');
  }

  function handleRepeat() {
    sendMessage('repeat');
  }

  // ── Render item ────────────────────────────────────────────────────────────

  const renderItem: ListRenderItem<Message> = ({ item, index }) => {
    if (item.kind === 'correction' && item.correction) {
      return (
        <View style={styles.correctionWrapper}>
          <CorrectionCard correction={item.correction} />
        </View>
      );
    }

    if (item.kind === 'options') {
      return <OptionsCard onNext={handleNextQuestion} onRepeat={handleRepeat} />;
    }

    return <MessageBubble message={item} index={index} />;
  };

  // ── UI ─────────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <LinearGradient
            colors={colors.blue.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerAvatar}
          >
            <Text style={styles.headerAvatarEmoji}>🤖</Text>
          </LinearGradient>
          <View>
            <Text style={styles.headerName}>AI Tutor</Text>
            <Text style={[styles.headerStatus, isTyping && { color: colors.text.muted }]}>
              {isTyping ? 'typing…' : '● Online'}
            </Text>
          </View>
        </View>

        <View style={styles.levelPill}>
          <Text style={styles.levelPillText}>
            {phase === 'correction' ? '⚠ Fix' : phase === 'approved' ? '✓ Good' : 'B1'}
          </Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={isTyping ? <TypingIndicator /> : null}
        onContentSizeChange={scrollToEnd}
      />

      {/* Input */}
      <ChatInput
        onSendText={sendMessage}
        onSendAudio={sendAudio}
        disabled={isTyping}
        placeholder={phase === 'correction' ? 'Reformulate your sentence…' : 'Type your answer…'}
      />
    </SafeAreaView>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <Animated.View entering={FadeInUp} style={typingStyles.row}>
      <View style={typingStyles.avatar}>
        <Text style={{ fontSize: 12 }}>🤖</Text>
      </View>
      <View style={typingStyles.bubble}>
        <Text style={typingStyles.dots}>• • •</Text>
      </View>
    </Animated.View>
  );
}

function OptionsCard({ onNext, onRepeat }: { onNext: () => void; onRepeat: () => void }) {
  return (
    <Animated.View entering={FadeInUp.springify()} style={optStyles.card}>
      <Text style={optStyles.label}>What would you like to do?</Text>
      <View style={optStyles.row}>
        <TouchableOpacity onPress={onRepeat} style={optStyles.repeatBtn} activeOpacity={0.8}>
          <Text style={optStyles.repeatBtnText}>↩ Repeat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onNext} activeOpacity={0.8} style={{ flex: 1 }}>
          <LinearGradient colors={colors.blue.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={optStyles.nextBtn}>
            <Text style={optStyles.nextBtnText}>Next question →</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background.primary },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm + 2,
    backgroundColor: colors.background.secondary,
    borderBottomWidth: 1, borderBottomColor: colors.border, gap: spacing.sm,
  },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.card.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  backArrow: { color: colors.text.primary, fontSize: 18, marginTop: -1 },
  headerCenter: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  headerAvatar: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', ...shadows.glow },
  headerAvatarEmoji: { fontSize: 18 },
  headerName: { fontSize: 15, fontWeight: '600', color: colors.text.primary },
  headerStatus: { fontSize: 11, color: '#4ADE80', marginTop: 1 },
  levelPill: { backgroundColor: colors.card.secondary, borderRadius: radius.button, paddingVertical: 4, paddingHorizontal: spacing.sm + 2, borderWidth: 1, borderColor: colors.blue.mid },
  levelPillText: { fontSize: 12, fontWeight: '600', color: colors.blue.mid },
  listContent: { paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.sm },
  correctionWrapper: { marginBottom: spacing.sm },
});

const typingStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm, marginBottom: spacing.sm },
  avatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.card.secondary, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  bubble: { backgroundColor: colors.card.primary, borderRadius: radius.card, borderTopLeftRadius: 4, paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderWidth: 1, borderColor: colors.border },
  dots: { color: colors.text.muted, fontSize: 16, letterSpacing: 2 },
});

const optStyles = StyleSheet.create({
  card: { backgroundColor: colors.card.primary, borderRadius: radius.card, padding: spacing.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.md, ...shadows.card },
  label: { fontSize: 13, color: colors.text.secondary, marginBottom: spacing.md, textAlign: 'center' },
  row: { flexDirection: 'row', gap: spacing.sm },
  repeatBtn: { flex: 1, height: 44, backgroundColor: colors.card.secondary, borderRadius: radius.button, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  repeatBtnText: { color: colors.text.secondary, fontSize: 14, fontWeight: '500' },
  nextBtn: { height: 44, borderRadius: radius.button, alignItems: 'center', justifyContent: 'center', ...shadows.glow },
  nextBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});
