import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import ProductList from './components/Product/ProductList';
import ProductDetail from './components/Product/ProductDetail';
import CategoryList from './components/Category/CategoryList';
import Home from './pages/Home';
import BrowsePage from './pages/BrowsePage';
import './styles/animation.css';
import FeatureBar from './components/Layout/FeatureBar';
import CategoryProductsPage from './pages/CategoryProductsPage';
import { AnimatePresence } from 'framer-motion';


function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/category/:categoryId" element={<CategoryProductsPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <main>
        <AnimatedRoutes />
      </main>
      <FeatureBar />
      <Footer />
    </Router>
  );
}

export default App;
