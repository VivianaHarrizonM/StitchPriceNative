import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/theme";

interface SectionHeaderProps {
  title: string;
  emoji?: string;
}

export default function SectionHeader({ title, emoji }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>
        {emoji ? `${emoji}  ` : ""}
        {title}
      </Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    gap: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.green.pale,
  },
  text: {
    fontSize: 11,
    fontWeight: "800",
    color: Colors.amber.main,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
});
