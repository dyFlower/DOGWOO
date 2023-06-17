import { QueryClientProvider } from 'react-query';
import Navbar from './Navbar';
import Router from './Routes';
import { queryClient } from '../../react-query/queryClient';
import { ReactQueryDevtools } from 'react-query/devtools';

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Router />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
