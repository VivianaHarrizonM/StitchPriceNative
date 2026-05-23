import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/theme";

interface ResultRowProps {
  label: string;
  value: string;
  highlight?: boolean;
  large?: boolean;
}

export default function ResultRow({
  label,
  value,
  highlight = false,
  large = false,
}: ResultRowProps) {
  return (
    <View style={[styles.row, highlight && styles.highlightRow]}>
      <Text style={[styles.label, highlight && styles.highlightLabel]}>
        {label}
      </Text>
      <Text
        style={[
          styles.value,
          highlight && styles.highlightValue,
          large && styles.largeValue,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.green.pale,
  },
  highlightRow: {
    backgroundColor: Colors.amber.wash,
    borderRadius: 8,
    borderBottomWidth: 0,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  label: {
    fontSize: 14,
    color: Colors.neutral[500],
    flex: 1,
  },
  highlightLabel: {
    color: Colors.amber.main,
    fontWeight: "700",
  },
  value: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.neutral[700],
  },
  highlightValue: {
    color: Colors.highlight,
    fontSize: 18,
  },
  largeValue: {
    fontSize: 22,
    fontWeight: "800",
  },
});
