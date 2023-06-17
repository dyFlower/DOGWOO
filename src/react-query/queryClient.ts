import { MutationCache, QueryCache, QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({}),
  mutationCache: new MutationCache({}),
  defaultOptions: {
    queries: {
      staleTime: 5000,
      cacheTime: 60000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});
