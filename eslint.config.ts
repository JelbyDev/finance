import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import pluginOxlint from 'eslint-plugin-oxlint';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    rules: {
      // ------ ОТРЕЗОК ДЛЯ .VUE ФАЙЛОВ
      // Порядок секций
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
      // Запрет options в script секции
      'vue/component-api-style': ['error', ['script-setup']],
      // Проверяет наличие пробела между секциями
      'vue/padding-line-between-blocks': 'error',
      //Запрещает пустые секции
      'vue/no-empty-component-block': 'error',
      // ------ ОТРЕЗОК ДЛЯ .VUE ФАЙЛОВ --- OFF ---
    },
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  ...pluginOxlint.configs['flat/recommended'],
  //Отключает правила ESLint, которые могут конфликтовать с Prettier
  skipFormatting
);
