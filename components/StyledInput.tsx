import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { Colors } from "../constants/theme";

interface StyledInputProps extends TextInputProps {
  label: string;
  prefix?: string;
  suffix?: string;
}

export default function StyledInput({
  label,
  prefix,
  suffix,
  ...props
}: StyledInputProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        {prefix ? <Text style={styles.affix}>{prefix}</Text> : null}
        <TextInput
          style={[styles.input, prefix ? styles.inputWithPrefix : null]}
          placeholderTextColor={Colors.neutral[300]}
          keyboardType="decimal-pad"
          returnKeyType="done"
          {...props}
        />
        {suffix ? <Text style={styles.suffixText}>{suffix}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.amber.main,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.neutral.white,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.green.pale,
    overflow: "hidden",
  },
  affix: {
    paddingHorizontal: 12,
    fontSize: 16,
    color: Colors.neutral[500],
    fontWeight: "600",
  },
  suffixText: {
    paddingHorizontal: 12,
    fontSize: 13,
    color: Colors.neutral[300],
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 14,
    fontSize: 16,
    color: Colors.neutral[700],
  },
  inputWithPrefix: {
    paddingLeft: 0,
  },
});
