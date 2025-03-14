import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '@/stores/themeStore';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = useThemeColor({}, 'tint');
  const { theme, setTheme } = useThemeStore();

  const handleThemePress = () => {
    Alert.alert(
      'テーマの設定',
      'テーマを選択してください',
      [
        {
          text: 'システム設定に従う',
          onPress: () => setTheme('system'),
        },
        {
          text: 'ライトモード',
          onPress: () => setTheme('light'),
        },
        {
          text: 'ダークモード',
          onPress: () => setTheme('dark'),
        },
        {
          text: 'キャンセル',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor,
        },
        headerTintColor: tintColor,
        headerShadowVisible: false,
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: 16 }}
            onPress={handleThemePress}
          >
            <Ionicons
              name={
                theme === 'dark'
                  ? 'moon'
                  : theme === 'light'
                  ? 'sunny'
                  : colorScheme === 'dark'
                  ? 'moon'
                  : 'sunny'
              }
              size={24}
              color={tintColor}
            />
          </TouchableOpacity>
        ),
      }}
    />
  );
} 