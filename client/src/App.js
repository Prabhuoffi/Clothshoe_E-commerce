import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Collection from './pages/Collection';
import About from './pages/About';
import Testimonials from './pages/Testimonials';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminDashboard from './admin/AdminDashboard';
import PaymentPage from './screen/PaymentPage';
import AddToCartPage from './screen/AddToCartPage';
import { AuthContext } from './context/authContext';
import RequiredAuth from './util/authRoutes';
import CustomerOrderPage from './screen/OrderDetailsPage';
import CustomerDetails from './admin/CustomerDetails';

function App() {
  const [userLoggedData, setUserLoggedData] = useState({
    token: null,
    userId: null,
    isAdmin: false,
  });

  const login = (token, userId, isAdmin) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('isAdmin', isAdmin);
    setUserLoggedData({ token, userId, isAdmin });
  };

  const logout = () => {
    setUserLoggedData({ token: null, userId: null, isAdmin: false });
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
  };

  return (
    <AuthContext.Provider
      value={{
        token: userLoggedData.token,
        userId: userLoggedData.userId,
        isAdmin: userLoggedData.isAdmin,
        login,
        logout,
      }}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/pricing" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<Testimonials />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment-method" element={<PaymentPage />} />
          <Route path="/add-card" element={<AddToCartPage />} />
          <Route path='/order-details' element={<CustomerOrderPage />} />
          <Route path='/customer-details' element={<CustomerDetails />} />

          <Route
            path="/admin-dashboard"
            element={
              <RequiredAuth>
                <AdminDashboard />
              </RequiredAuth>
            }
          />

        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
