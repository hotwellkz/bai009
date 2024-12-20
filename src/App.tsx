import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Breadcrumbs from './components/Breadcrumbs';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Program from './pages/Program';
import Auth from './pages/Auth';
import Lesson from './pages/Lesson';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Pricing from './pages/Pricing';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-black text-white flex flex-col">
    <Header />
    <Breadcrumbs />
    {children}
    <Footer />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={
            <Layout>
              <Hero />
            </Layout>
          } />
          <Route path="/program" element={
            <Layout>
              <Program />
            </Layout>
          } />
          <Route path="/pricing" element={
            <Layout>
              <Pricing />
            </Layout>
          } />
          <Route path="/lesson/1.1" element={
            <Layout>
              <Lesson />
            </Layout>
          } />
          <Route path="/privacy" element={
            <Layout>
              <Privacy />
            </Layout>
          } />
          <Route path="/terms" element={
            <Layout>
              <Terms />
            </Layout>
          } />
          <Route path="/auth" element={
            <Layout>
              <Auth />
            </Layout>
          } />
          <Route path="/profile" element={
            <Layout>
              <Profile />
            </Layout>
          } />
          <Route path="/admin" element={
            <Layout>
              <Admin />
            </Layout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;