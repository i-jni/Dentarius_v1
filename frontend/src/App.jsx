// src/App.jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ApiTest from './components/ApiTest';
import './assets/scss/style.scss';

// Créer un client React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <header className="app-header">
          <h1>Test de l'API Dentarius</h1>
        </header>
        <main>
          <ApiTest />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;