<script setup lang="ts">
import { computed } from 'vue';
import { useQuery, keepPreviousData } from '@tanstack/vue-query';
import { apiClient } from '@/shared/api/apiClient';

// Строгая типизация для API-ответов
type AnalyticsResponse = {
  analytics: {
    data: [ticker: string, name: string, weight: number][];
  };
}

type MarketDataResponse = {
  marketdata: {
    data: [ticker: string, price: number][];
  };
}

type Stock = {
  ticker: string;
  name: string;
  price: number;
  indexWeight: number;
  portfolio: {
    quantity: number;
    weight: number | null;
  }
}

function useFetchIndexStocks() {
  return useQuery({
    queryKey: ['fetch-index-stocks'],
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
      }));
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

function usePortfolioStocks() {
  return useQuery({
    queryKey: ['fetch-portfolio-stocks'],
    queryFn: async () => {
      return {
        'SBERP': 260,
        'LKOH': 26,
      } as Record<string, number>
    },
    enabled: computed(() => Boolean(indexStocks.value?.length)),
    placeholderData: keepPreviousData,
  });

}

const { 
  isLoading: isLoadingIndexStocks, 
  isFetching: isFetchingIndexStocks, 
  data: indexStocks, 
} = useFetchIndexStocks();

const { 
  isLoading: isLoadingPrices, 
  isFetching: isFetchingPrices, 
  data: prices, 
} = useFetchPrices();

const { 
  isLoading: isLoadingPortfolioStocks, 
  isFetching: isFetchingPortfolioStocks, 
  data: portfolioStocks, 
} = usePortfolioStocks();

const isShowSkeleton = computed(() => {
  return isLoadingIndexStocks.value 
    || isFetchingIndexStocks.value 
    || isLoadingPrices.value 
    || isFetchingPrices.value
    || isLoadingPortfolioStocks.value
    || isFetchingPortfolioStocks.value;
})

const totalPortfolioValue = computed(() => {
  if(!prices.value  || !portfolioStocks.value) {
    return 0;
  }

  return Object.keys(portfolioStocks.value).reduce((total, ticker) => {
    total += prices.value[ticker] * portfolioStocks.value[ticker];
    return total
  }, 0);
});

const stocks = computed<Stock[]>(() => {
  if(!indexStocks.value 
    || !prices.value 
    || !portfolioStocks.value 
    || !totalPortfolioValue.value
  ) {
    return [];
  }
  
  const formattedStocks: Stock[] = [];

  for(const stock of indexStocks.value) {
    const price = prices.value[stock.ticker];
    const portfolioQuantity = portfolioStocks.value[stock.ticker];
    const portfolioWeight = (portfolioQuantity * price / totalPortfolioValue.value) * 100;

    formattedStocks.push({
      ticker: stock.ticker,
      name: stock.name,
      price,
      indexWeight: stock.weight,
      portfolio: {
        quantity: portfolioQuantity,
        weight: isNaN(portfolioWeight) ? null : Number(portfolioWeight.toFixed(2)),
      },
    })
  }

  return formattedStocks.sort((a, b) => a.indexWeight < b.indexWeight ? 1 : -1);
})
</script>

<template>
  <div class="table-container">
    <h2>
      <div>Состав индекса МосБиржи (IMOEX)</div>
      <br>
      <div>Итоговая стоимость портфеля: {{ totalPortfolioValue?.toLocaleString('ru-RU') }} руб.</div>
    </h2>

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
            Доля в индексе (%)
          </th>

          <th class="header-cell">
            Доля в портфеле (%)
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
            {{ stock.indexWeight }}
          </td>

          <td class="data-cell">
            {{ stock.portfolio.weight ?? 'Н/Д' }}
          </td>

          <td class="data-cell">
            {{ stock.portfolio.quantity }}
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
