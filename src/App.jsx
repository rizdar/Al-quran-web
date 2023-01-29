import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import SuratPage from './pages/SuratPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import RootLayout from './pages/RootLayout';
import BackToTopButton from './components/UI/BackToTopButton';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/surat" replace /> },
      { path: 'surat', element: <HomePage /> },
      { path: 'surat/:nomorSurat', element: <SuratPage /> },
      { path: '*', element: <ErrorPage /> },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <BackToTopButton />
    </QueryClientProvider>
  );
}

export default App;
