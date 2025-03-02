
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { SplashScreen } from './components/splash/SplashScreen';
import Auth from './pages/Auth';
import Index from './pages/Index';
import Radar from './pages/Radar';
import NotFound from './pages/NotFound';
import { InteropProvider } from './contexts/InteropContext';
import './App.css';

function App() {
  return (
    <InteropProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/radar" element={<Radar />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </InteropProvider>
  );
}

export default App;
