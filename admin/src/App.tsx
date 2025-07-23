import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ContentManager from './pages/ContentManager';
import MenuManager from './pages/MenuManager';
import BannerManager from './pages/BannerManager';
import SegmentManager from './pages/SegmentManager';
import Settings from './pages/Settings';
import FileManager from './pages/FileManager';
import Categories from './pages/Categories';
import Experiences from './pages/Experiences';
import { AuthProvider, useAuth } from './hooks/useAuth';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        Carregando...
      </Box>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="content" element={<ContentManager />} />
        <Route path="menu" element={<MenuManager />} />
        <Route path="banners" element={<BannerManager />} />
        <Route path="segments" element={<SegmentManager />} />
        <Route path="settings" element={<Settings />} />
        <Route path="files" element={<FileManager />} />
        <Route path="categories" element={<Categories />} />
        <Route path="experiences" element={<Experiences />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppRoutes />
      </Box>
    </AuthProvider>
  );
}

export default App; 