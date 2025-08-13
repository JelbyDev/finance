module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-html/vue',
  ],
  plugins: ['@stylistic/stylelint-plugin'],
  rules: {
    // ------ ОТРЕЗОК @stylistic --- !ВАЖНО. Правила при автоформатировании выполняются последовательно
    // Приводит hex-коды цветов к нижнему регистру
    '@stylistic/color-hex-case': ['lower'],
    // Добавляет пробел после двоеточия
    '@stylistic/declaration-colon-space-after': 'always',
    // Требует переноса строки после открывающей фигурной скобки
    '@stylistic/block-opening-brace-newline-after': 'always',
    // Требует пробела перед открывающей фигурной скобкой
    '@stylistic/block-opening-brace-space-before': 'always',
    // Требует пробела после двоеточия
    '@stylistic/declaration-colon-space-after': 'always',
    // Запрещает пробел перед двоеточием
    '@stylistic/declaration-colon-space-before': 'never',
    // Требует переноса строки после точки с запятой
    '@stylistic/declaration-block-semicolon-newline-after': 'always',
    //Требует обязательной точки с запятой после последнего свойства в блоке
    '@stylistic/declaration-block-trailing-semicolon': 'always',
    // Размер таба
    '@stylistic/indentation': 2,
    // Удаляет пробелы в конце строк
    '@stylistic/no-eol-whitespace': true,
    // Запрет пустой первой строки
    '@stylistic/no-empty-first-line': true,
    // ------ ОТРЕЗОК @stylistic --- OFF ---
        
    // Отключает проверку имен классов (если используется БЭМ)
    'selector-class-pattern': null,
    // Отключает проверку имен анимаций (если используется БЭМ)
    'keyframes-name-pattern': null,
    // Разрешает "понижение специфичности" селекторов (если используется БЭМ)
    'no-descending-specificity': null,
    // Разрешает пустые строки между CSS-переменными
    'custom-property-empty-line-before': null,
    // Разрешает пустые строки между свойствами
    'declaration-empty-line-before': null,
  },
};
