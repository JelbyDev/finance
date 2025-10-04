<script setup lang="ts">
import { computed } from 'vue';
import { useQuery, keepPreviousData } from '@tanstack/vue-query';
import { apiClient } from '@/shared/api/apiClient';

// Строгая типизация для API-ответов
interface AnalyticsResponse {
  analytics: {
    data: [ticker: string, name: string, weight: number][];
  };
}

interface MarketDataResponse {
  marketdata: {
    data: [ticker: string, price: number][];
  };
}

interface Stock {
  ticker: string;
  name: string;
  weight: number;
  price?: number;
}

function useFetchIndexComposition() {
  return useQuery({
    queryKey: ['fetch-index-composition'],
    queryFn: async () => {
      let apiResponse;

      try {
        apiResponse = await apiClient.get<AnalyticsResponse>('/iss/statistics/engines/stock/markets/index/analytics/IMOEX.json?limit=100&analytics.columns=ticker,shortnames,weight&iss.only=analytics&iss.meta=off');
      } catch (error) {
        throw new Error(String(error)); // TODO - придумать как сделать
      }

      if (apiResponse.status >= 300) {
        throw new Error(apiResponse.statusText);
      }
  
      return apiResponse.data.analytics.data.map(([ticker, name, weight]) => ({
        ticker,
        name,
        weight,
      })) as Stock[];
    },
    enabled: true,
    placeholderData: keepPreviousData,
  });
}

function useFetchPrices() {
  return useQuery({
    queryKey: ['fetch-prices'],
    queryFn: async () => {
      let apiResponse;

      const tickers = indexStocks.value?.map(stock => stock.ticker) ?? [];

      try {
        apiResponse = await apiClient.get<MarketDataResponse>(`/iss/engines/stock/markets/shares/boards/TQBR/securities.json?securities=${tickers.join(',')}&marketdata.columns=SECID,LAST`);
      } catch (error) {
        throw new Error(String(error)); // TODO - придумать как сделать
      }

      if (apiResponse.status >= 300) {
        throw new Error(apiResponse.statusText);
      }
  
      return apiResponse.data.marketdata.data.reduce((acc, [ticker, price]) => {
        acc[ticker] = price;
        return acc;
      }, {} as Record<string, number>)
    },
    enabled: computed(() => Boolean(indexStocks.value?.length)),
    placeholderData: keepPreviousData,
  });
}

const { 
  isLoading: isLoadingIndexStocks, 
  isFetching: isFetchingIndexStocks, 
  data: indexStocks, 
} = useFetchIndexComposition();
const { 
  isLoading: isLoadingPrices, 
  isFetching: isFetchingPrices, 
  data: prices, 
} = useFetchPrices();

const isShowSkeleton = computed(() => {
  return isLoadingIndexStocks.value 
    || isFetchingIndexStocks.value 
    || isLoadingPrices.value 
    || isFetchingPrices.value;
})

const stocks = computed(() => {
  if(!indexStocks.value || !prices.value) {
    return [];
  }

  return indexStocks.value.map((stock) => {
    return {
      ...stock,
      price: prices.value[stock.ticker],
    }
  }).sort((a, b) => a.weight < b.weight ? 1 : -1);
})
</script>

<template>
  <div class="table-container">
    <h2>Состав индекса МосБиржи (IMOEX)</h2>

    <div v-if="isShowSkeleton">
      Загрузка данных
    </div>

    <table
      v-else
      class="stocks-table"
    >
      <thead>
        <tr>
          <th class="header-cell">
            Тикер
          </th>

          <th class="header-cell">
            Компания
          </th>

          <th class="header-cell">
            Доля в индексе
          </th>

          <th class="header-cell">
            Доля в портфеле
          </th>
          
          <th class="header-cell">
            Кол-во в портфеле
          </th>

          <th class="header-cell">
            Цена (руб.)
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="stock in stocks"
          :key="stock.ticker"
          class="data-row"
        >
          <td class="data-cell">
            {{ stock.ticker }}
          </td>

          <td class="data-cell">
            {{ stock.name }}
          </td>

          <td class="data-cell">
            {{ stock.weight }}%
          </td>

          <td class="data-cell" />

          <td class="data-cell">
            <input type="text">
          </td>

          <td class="data-cell">
            {{ stock.price?.toLocaleString('ru-RU') ?? 'Н/Д' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  width: 100%;
  overflow-x: auto;
  margin: 20px 0;
  font-family: Arial, sans-serif;
}

h2 {
  color: #333;
  margin-bottom: 16px;
  text-align: center;
}

.stocks-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  border-radius: 8px;
  overflow: hidden;
}

.header-cell {
  background-color: #2c3e50;
  color: white;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  border-right: 1px solid #3a4f66;
}

.header-cell:last-child {
  border-right: none;
}

.data-row {
  transition: background-color 0.2s;
}

.data-row:nth-child(even) {
  background-color: #f8f9fa;
}

.data-row:hover {
  background-color: #e9ecef;
}

.data-cell {
  padding: 12px 16px;
  border: 1px solid #dee2e6;
  color: #495057;
}
</style>
