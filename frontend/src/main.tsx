import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useBusinessTitle } from './hooks/useBusinessTitle';

const queryClient = new QueryClient();

// Componente wrapper para usar o hook
const AppWithTitle = () => {
  useBusinessTitle();
  return <App />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppWithTitle />
    </QueryClientProvider>
  </StrictMode>,
)
