import { useRef, useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, SafeAreaView,
  ActivityIndicator, Pressable, ScrollView, TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { DS } from '@/constants/theme';
import { useAuthStore } from '@/store/auth.store';

const { colors, spacing, radius, typography, shadows } = DS;

export default function RegisterScreen() {
  // useRef: sem re-render ao digitar
  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const confirmRef = useRef('');

  // useState só para feedback visual (só muda ao apertar o botão)
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuthStore();

  function validate() {
    if (!nameRef.current.trim()) return 'Please enter your name.';
    if (!emailRef.current.trim() || !emailRef.current.includes('@')) return 'Please enter a valid email.';
    if (passwordRef.current.length < 6) return 'Password must be at least 6 characters.';
    if (passwordRef.current !== confirmRef.current) return 'Passwords do not match.';
    return null;
  }

  async function handleRegister() {
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setError(null);
    setIsSubmitting(true);
    try {
      await register(nameRef.current.trim(), emailRef.current.trim(), passwordRef.current);
      router.replace('/(tabs)');
    } catch (err) {
      setError((err as Error).message ?? 'Could not create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.logoWrapper}>
            <LinearGradient colors={colors.blue.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.logoGradient}>
              <Text style={styles.logoEmoji}>🎓</Text>
            </LinearGradient>
          </View>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>Start your English journey today</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full name</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              placeholderTextColor={colors.text.muted}
              onChangeText={(t) => { nameRef.current = t; }}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              placeholderTextColor={colors.text.muted}
              onChangeText={(t) => { emailRef.current = t; }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="At least 6 characters"
              placeholderTextColor={colors.text.muted}
              onChangeText={(t) => { passwordRef.current = t; }}
              secureTextEntry
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Confirm password</Text>
            <TextInput
              style={styles.input}
              placeholder="Repeat your password"
              placeholderTextColor={colors.text.muted}
              onChangeText={(t) => { confirmRef.current = t; }}
              secureTextEntry
            />
          </View>

          {error != null && <Text style={styles.errorText}>{error}</Text>}

          <Pressable
            onPress={handleRegister}
            disabled={isSubmitting}
            style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1, marginTop: spacing.sm })}
          >
            <LinearGradient
              colors={colors.blue.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.registerBtn, isSubmitting && { opacity: 0.6 }]}
            >
              {isSubmitting
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.registerBtnText}>Create Account</Text>
              }
            </LinearGradient>
          </Pressable>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerLabel}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.loginRow} onPress={() => router.back()}>
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginLink}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background.primary },
  scroll: { paddingHorizontal: spacing.md, paddingTop: spacing.lg, paddingBottom: spacing.xxl },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.card.primary,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  backArrow: { color: colors.text.primary, fontSize: 18, marginTop: -1 },
  header: { alignItems: 'center', marginBottom: spacing.xl },
  logoWrapper: { marginBottom: spacing.md, ...shadows.glow },
  logoGradient: { width: 64, height: 64, borderRadius: radius.card, alignItems: 'center', justifyContent: 'center' },
  logoEmoji: { fontSize: 28 },
  title: { ...typography.h2, color: colors.text.primary, marginBottom: spacing.xs },
  subtitle: { ...typography.body, color: colors.text.secondary },
  card: {
    backgroundColor: colors.card.primary,
    borderRadius: radius.card,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  inputGroup: { marginBottom: spacing.md },
  inputLabel: { ...typography.body, color: colors.text.secondary, marginBottom: spacing.sm },
  input: {
    backgroundColor: colors.background.secondary,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 48,
    color: colors.text.primary,
    fontSize: 14,
  },
  errorText: { ...typography.caption, color: colors.error, textAlign: 'center', marginBottom: spacing.sm },
  registerBtn: { height: 48, borderRadius: radius.button, alignItems: 'center', justifyContent: 'center', ...shadows.glow },
  registerBtnText: { color: colors.text.primary, fontSize: 16, fontWeight: '600' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.lg, gap: spacing.md },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerLabel: { ...typography.caption, color: colors.text.muted },
  loginRow: { alignItems: 'center' },
  loginText: { ...typography.body, color: colors.text.secondary },
  loginLink: { color: colors.blue.mid, fontWeight: '600' },
});
