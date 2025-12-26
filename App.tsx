import React from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './src/contexts/AuthContext';
import ProtectedRoute from './src/components/ProtectedRoute';
import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Marketplace from './src/pages/Marketplace';
import Projects from './src/pages/Projects';
import Verification from './src/pages/Verification';
import Dashboard from './src/pages/Dashboard';
import Retirement from './src/pages/Retirement';
import About from './src/pages/About';
import Contact from './src/pages/Contact';
import Privacy from './src/pages/Privacy';
import Terms from './src/pages/Terms';
import NotFound from './src/pages/NotFound';

const App: React.FC = () => {
  return (
    <Theme appearance="inherit" radius="large" scaling="100%">
      <AuthProvider>
        <Router>
          <main className="min-h-screen font-inter">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/projects" element={
                <ProtectedRoute requiredRole="user">
                  <Projects />
                </ProtectedRoute>
              } />
              <Route path="/verification" element={
                <ProtectedRoute requiredRole="verifier">
                  <Verification />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute requiredRole="user">
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/retirement" element={<Retirement />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              newestOnTop
              closeOnClick
              pauseOnHover
            />
          </main>
        </Router>
      </AuthProvider>
    </Theme>
  );
}

export default App;