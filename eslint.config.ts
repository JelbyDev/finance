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
      // Порядок атрибутов в компонентах
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION', // 'is', 'v-is'
            'LIST_RENDERING', // 'v-for item in items'
            'CONDITIONALS', // 'v-if', 'v-else-if', 'v-else', 'v-show', 'v-cloak'
            'RENDER_MODIFIERS', // 'v-once', 'v-pre'
            'TWO_WAY_BINDING', // 'v-model'
            'GLOBAL', // 'id'
            'UNIQUE', // 'ref', 'key'
            'SLOT', // 'v-slot', 'slot'
            // Секция OTHER_ATTR, обычные атрибуты (class, style и т.д.)
            // можно поставить либо ее либо задать отдельно [ATTR_DYNAMIC, ATTR_STATIC, ATTR_SHORTHAND_BOOL]
            'ATTR_STATIC', // 'prop="foo"', 'custom-prop="foo"'
            'ATTR_DYNAMIC', // 'v-bind:prop="foo"', ':prop="foo"'
            'ATTR_SHORTHAND_BOOL', // 'boolean-prop'
            'CONTENT', // 'v-text', 'v-html'
            'OTHER_DIRECTIVES', // 'v-custom-directive'
            'EVENTS', // '@click="functionCall"', 'v-on="event"'
          ],
          alphabetical: false, // не сортировать атрибуты внутри групп по алфавиту
        },
      ],
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
