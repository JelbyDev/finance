import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import pluginOxlint from 'eslint-plugin-oxlint';
import stylistic from '@stylistic/eslint-plugin';

/*
  Отключает правила ESLint, которые могут конфликтовать с Prettier
  import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
  Добавить в конце defineConfigWithVueTs элемент skipFormatting
*/

/*
  VS Code не оч дружит с @stylistic т.к. все проекты у меня на prettier, 
  то добавил в проектный файл .vscode -> settings.json
  Отключить расширние претера
  "extensions.disabledRecommendations": [
    "esbenp.prettier-vscode"
  ],
  Отключить даже в случае если оно находится в рекомендованых
  "extensions.ignoreRecommendations": true
  Поменять дефолтный форматтер
  "editor.defaultFormatter": "dbaeumer.vscode-eslint",
*/

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      // ------ ОТРЕЗОК @stylistic
      // Размер таба
      '@stylistic/indent': ['error', 2],
      // Одинарные Ковычки
      '@stylistic/quotes': ['error', 'single'],
      // Автоматическая запятая после последнего элемента в массиве/объекте
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      // Отступ от открывающей/закрывающей скобки массива/объекта
      '@stylistic/object-curly-spacing': ['error', 'always'],
      // Для переноса строк (аналог printWidth: 80)
      // TODO - потом вернуться к вопросу о переносе строк
      '@stylistic/max-len': ['error', { code: 120, ignoreUrls: true }],
      // ------ ОТРЕЗОК @stylistic --- OFF ---

      // ------ ОТРЕЗОК ДЛЯ .VUE ФАЙЛОВ
      // Порядок секций
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
      // Отступ между секциями
      'vue/html-indent': ['error', 2],
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
          // не сортировать атрибуты внутри групп по алфавиту, группы объединятся в []
          alphabetical: false,
        },
      ],
      // ------ ОТРЕЗОК ДЛЯ .VUE ФАЙЛОВ --- OFF ---
    },
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  ...pluginOxlint.configs['flat/recommended'],
);
