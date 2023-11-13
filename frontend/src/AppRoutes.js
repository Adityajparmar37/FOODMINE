import React from 'react'
import { Route, Routes } from 'react-router-dom';
import CartPage from './components/Cart/CartPage';
import FoodPage from './Pages/Food/FoodPage';
import HomePage from './Pages/Home/HomePage';


function AppRoutes() {

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search/:searchTerm" element={<HomePage />} />
                <Route path="/tag/:tag" element={<HomePage />} />
                <Route path="/foods/:id" element={<FoodPage />} />
                <Route path="/cart" element={<CartPage />} />

            </Routes>
        </>
    )
}

export default AppRoutes