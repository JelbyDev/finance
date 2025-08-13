import { inject, type Ref } from 'vue'
import consoleLogForDevMode from '@/helpers/consoleLogForDevMode';

export type Theme = typeof THEME[keyof typeof THEME];

export type ThemeContext = {
  theme: Readonly<Ref<Theme>>,
  setTheme: (theme: Theme) => void
}

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const LOCAL_STORAGE_THEME_KEY = 'app-theme';

export const THEME_CONTEXT_NAME = 'app-theme';

export function useThemeContext() {
  const context = inject<ThemeContext>(THEME_CONTEXT_NAME)
  
  if (!context) {
    consoleLogForDevMode('useThemeContext', 'Отсутствует контекст');
    return;
  }

  return context
}
