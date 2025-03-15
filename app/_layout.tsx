import { Stack } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function RootLayout() {
  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = useThemeColor({}, 'tint');

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor,
        },
        headerTintColor: tintColor,
        headerShown: false,
        headerShadowVisible: false,
      }}
    />
  );
} 