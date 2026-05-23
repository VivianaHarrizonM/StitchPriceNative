import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#4a9a1f" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}
