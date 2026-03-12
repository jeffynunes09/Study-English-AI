import { useState } from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { DS } from '@/constants/theme';

const { colors, spacing, radius } = DS;

interface Props extends TextInputProps {
  // nenhuma prop extra necessária — foco é gerenciado internamente
}

// Componente isolado: o estado de foco NÃO sobe para o pai,
// evitando re-renders que quebram o foco no Android.
export function FocusableInput(props: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.wrapper, focused && styles.focused]}>
      <TextInput
        {...props}
        style={[styles.input, props.style]}
        placeholderTextColor={colors.text.muted}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background.secondary,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 48,
    justifyContent: 'center',
  },
  focused: {
    borderColor: colors.blue.mid,
    shadowColor: colors.blue.mid,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    color: colors.text.primary,
    fontSize: 14,
    flex: 1,
  },
});
