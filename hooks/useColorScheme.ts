import { useColorScheme as useSystemColorScheme, ColorSchemeName } from 'react-native';
import { useThemeStore } from '@/stores/themeStore';

export function useColorScheme(): ColorSchemeName {
  const systemColorScheme = useSystemColorScheme();
  const { theme } = useThemeStore();

  if (theme === 'system') {
    return systemColorScheme;
  }

  return theme === 'dark' ? 'dark' : 'light';
}
