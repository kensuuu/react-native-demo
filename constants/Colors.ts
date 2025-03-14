/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: '#0a7ea4',
    primaryDark: '#085c7a',
    secondary: '#687076',
    border: '#e1e3e5',
    card: '#fff',
    cardBorder: '#e1e3e5',
    placeholder: '#9BA1A6',
    error: '#dc2626',
    success: '#16a34a',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: '#0a7ea4',
    primaryDark: '#085c7a',
    secondary: '#9BA1A6',
    border: '#2d2d2d',
    card: '#1c1c1c',
    cardBorder: '#2d2d2d',
    placeholder: '#687076',
    error: '#ef4444',
    success: '#22c55e',
  },
};
