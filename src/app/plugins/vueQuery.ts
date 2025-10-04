import { VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query';

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Автоматический запрос при фокусе вкладки
        refetchOnMount: false, // Автоматический запрос при маунте компонента
        refetchOnReconnect: false, // Автоматическое обновление запросов
        refetchInterval: false, // Автоматическое обновление запросов
        staleTime: 0, //1000 * 20, // Чтобы кэш запросы сразу не кидались в просрочку
        gcTime: 0, //1000 * 60 * 5, // Время жизни кэше
        retry: 0, // Кол-во повторных запросов, если произошла неудача
      },
    },
  },
};

export default {
  plugin: VueQueryPlugin,
  options: vueQueryPluginOptions,
};
