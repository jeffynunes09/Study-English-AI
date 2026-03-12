import { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { DS } from '@/constants/theme';
import { useAuthStore } from '@/store/auth.store';

const { colors, spacing, radius, typography, shadows } = DS;

export default function LoginScreen() {
  // useRef: sem re-render ao digitar
  const emailRef = useRef('');
  const passwordRef = useRef('');

  // useState só para feedback visual (só muda ao apertar o botão)
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuthStore();

  async function handleLogin() {
    const email = emailRef.current.trim();
    const password = passwordRef.current;

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (err) {
      setError((err as Error).message ?? 'Invalid credentials. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoWrapper}>
            <LinearGradient
              colors={colors.blue.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoGradient}
            >
              <Text style={styles.logoEmoji}>🎓</Text>
            </LinearGradient>
          </View>
          <Text style={styles.appName}>Study English AI</Text>
          <Text style={styles.appTagline}>Practice English with your AI tutor</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome back</Text>
          <Text style={styles.cardSubtitle}>Sign in to continue learning</Text>

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
            <View style={styles.labelRow}>
              <Text style={styles.inputLabel}>Password</Text>
              <TouchableOpacity>
                <Text style={styles.forgotLink}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={colors.text.muted}
              onChangeText={(t) => { passwordRef.current = t; }}
              secureTextEntry
            />
          </View>

          {error != null && <Text style={styles.errorText}>{error}</Text>}

          <Pressable
            onPress={handleLogin}
            disabled={isSubmitting}
            style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1, marginTop: spacing.sm })}
          >
            <LinearGradient
              colors={colors.blue.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.loginBtn, isSubmitting && { opacity: 0.6 }]}
            >
              {isSubmitting
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.loginBtnText}>Sign In</Text>
              }
            </LinearGradient>
          </Pressable>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerLabel}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.registerRow}
            onPress={() => router.push('/(auth)/register')}
          >
            <Text style={styles.registerText}>
              Don't have an account?{' '}
              <Text style={styles.registerLink}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xl,
  },
  header: { alignItems: 'center', marginBottom: spacing.xl },
  logoWrapper: { marginBottom: spacing.md, ...shadows.glow },
  logoGradient: {
    width: 72,
    height: 72,
    borderRadius: radius.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEmoji: { fontSize: 32 },
  appName: { ...typography.h2, color: colors.text.primary, marginBottom: spacing.xs },
  appTagline: { ...typography.body, color: colors.text.secondary },
  card: {
    backgroundColor: colors.card.primary,
    borderRadius: radius.card,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  cardTitle: { ...typography.h3, color: colors.text.primary, marginBottom: spacing.xs },
  cardSubtitle: { ...typography.body, color: colors.text.secondary, marginBottom: spacing.lg },
  inputGroup: { marginBottom: spacing.md },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
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
  forgotLink: { ...typography.caption, color: colors.blue.mid },
  errorText: {
    ...typography.caption,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  loginBtn: {
    height: 48,
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.glow,
  },
  loginBtnText: { color: colors.text.primary, fontSize: 16, fontWeight: '600' },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
    gap: spacing.md,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerLabel: { ...typography.caption, color: colors.text.muted },
  registerRow: { alignItems: 'center' },
  registerText: { ...typography.body, color: colors.text.secondary },
  registerLink: { color: colors.blue.mid, fontWeight: '600' },
});
