import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import CheckoutPage from "./components/Checkout/CheckoutPage";
import CartPage from "./Pages/Cart/CartPage";
import Dashboard from "./Pages/Dashboard/Dashboard";
import FoodPage from "./Pages/Food/FoodPage";
import FoodEditPage from "./Pages/FoodEdit/FoodEditPage";
import FoodsAdminPage from "./Pages/FoodsAdmin/FoodsAdminPage";
import HomePage from "./Pages/Home/HomePage";
import LoginPage from "./Pages/Login/LoginPage";
import OrderPage from "./Pages/Order/OrderPage";
import OrderTrack from "./Pages/OrderTrack/OrderTrack";
import Payment from "./Pages/Payment/Payment";
import ProfilePages from "./Pages/Profile/ProfilePages";
import Register from "./Pages/Register/Register";
import UserEditPage from "./Pages/UserEdit/UserEditPage";
import UsersPage from "./Pages/UsersPage/UsersPage";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/search/:searchTerm"
          element={<HomePage />}
        />
        <Route
          path="/tag/:tag"
          element={<HomePage />}
        />
        <Route
          path="/foods/:id"
          element={<FoodPage />}
        />
        <Route
          path="/cart"
          element={<CartPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/checkout"
          element={
            <AuthRoute>
              <CheckoutPage />
            </AuthRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <AuthRoute>
              <Payment />
            </AuthRoute>
          }
        />

        <Route
          path="/track/:orderId"
          element={
            <AuthRoute>
              <OrderTrack />
            </AuthRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <AuthRoute>
              <ProfilePages />
            </AuthRoute>
          }
        />

        <Route
          path="/orders/:filter?"
          element={
            <AuthRoute>
              <OrderPage />
            </AuthRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />

        <Route
          path="/admin/foods/:searchTerm?"
          element={
            <AdminRoute>
              <FoodsAdminPage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/addFood"
          element={
            <AdminRoute>
              <FoodEditPage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/editFood/:foodId"
          element={
            <AdminRoute>
              <FoodEditPage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users/:searchTerm?"
          element={
            <AdminRoute>
              <UsersPage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/editUser/:userId"
          element={
            <AdminRoute>
              <UserEditPage />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default AppRoutes;
