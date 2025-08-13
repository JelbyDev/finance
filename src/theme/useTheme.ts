import { ref, type Ref } from 'vue';

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const LOCAL_STORAGE_THEME_KEY = 'app-theme';

export const THEME_CONTEXT_NAME = 'app-theme';

export type Theme = typeof THEME[keyof typeof THEME];

export type ThemeContext = {
  theme: Ref<Theme>;
  toggleTheme: () => void
}

export function useTheme(defaultTheme: Theme): ThemeContext {
  const theme = ref<Theme>(defaultTheme);

  const toggleTheme = () => {
    const newTheme = theme.value === THEME.DARK ? THEME.LIGHT : THEME.DARK
    theme.value = newTheme;
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  }

  return {
    theme,
    toggleTheme,
  }
}
