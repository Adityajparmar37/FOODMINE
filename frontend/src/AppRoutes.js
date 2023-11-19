import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AuthRoute from './components/AuthRoute/AuthRoute';
import CheckoutPage from './components/Checkout/CheckoutPage';
import CartPage from './Pages/Cart/CartPage';
import FoodPage from './Pages/Food/FoodPage';
import HomePage from './Pages/Home/HomePage';
import LoginPage from './Pages/Login/LoginPage';
import Payment from './Pages/Payment/Payment';
import Register from './Pages/Register/Register';


function AppRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search/:searchTerm" element={<HomePage />} />
                <Route path="/tag/:tag" element={<HomePage />} />
                <Route path="/foods/:id" element={<FoodPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />
                <Route path='/checkout' element={<AuthRoute>
                    <CheckoutPage />
                </AuthRoute>}
                />
                <Route path='/payment' element={<AuthRoute>
                    <Payment />
                </AuthRoute>}
                />
            </Routes>
        </>
    )
}

export default AppRoutes