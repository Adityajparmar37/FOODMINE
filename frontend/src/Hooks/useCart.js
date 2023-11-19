import React, { createContext, useContext, useEffect, useState } from 'react'
// import { sample_foods } from '../../data';


const CartContext = createContext(null);
const CART_KEY = 'cart';
const EMPTY_CART = {
    items: [],
    totalPrice: 0,
    totalCount: 0
};


export default function CartProvider({ children }) {
    const initCart = getCartFromLocalStorage();
    const [cartItems, setCartItems] = useState(initCart.items);

    const [totalPrice, setTotalPrice] = useState(initCart.totalPrice)
    const [totalCount, setTotalCount] = useState(initCart.totalCount)


    const removeFromCart = (foodId) => {
        const filteredCartItems = cartItems.filter(item => item.food.id !== foodId);
        setCartItems(filteredCartItems);
    }
    const changeQuantity = (item, newQuantity) => {
        setCartItems(prevCartItems =>
            prevCartItems.map(cartItem =>
                cartItem.food.id === item.food.id
                    ? { ...cartItem, quantity: newQuantity, price: item.food.price * newQuantity }
                    : cartItem
            )
        );
    };


    useEffect(() => {
        const totalPrice = sum(cartItems.map(item => item.price));
        const totalCount = sum(cartItems.map(item => item.quantity));

        setTotalPrice(totalPrice);
        setTotalCount(totalCount);

        localStorage.setItem(CART_KEY, JSON.stringify({
            items: cartItems,
            totalPrice,
            totalCount,
        }))

        if (totalCount === 0)
            document.title = `Food Mine !`
        else
            document.title = `Food Mine !  ( ${totalCount} )`

    }, [cartItems]);

    const sum = (items) => {
        return items.reduce((prevValue, curValue) => prevValue + curValue, 0);
    }

    const addToCart = (food) => {
        const cartItem = cartItems.find(item => item.food.id === food.id);

        if (cartItem) {
            changeQuantity(cartItem, cartItem.quantity + 1);
        } else {
            setCartItems([...cartItems, { food, quantity: 1, price: food.price }]);
        }
    };

    function getCartFromLocalStorage() {
        try {
            const storedCart = localStorage.getItem(CART_KEY);
            return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
        } catch (error) {
            console.error('Error parsing cart from localStorage:', error);
            return EMPTY_CART;
        }
    }

    const clearCart = () => {
        localStorage.removeItem(CART_KEY);
        // const {items , totalPrice , totalCount} = EMPTY_CART;
        setCartItems([]);
        setTotalCount(0);
        setTotalPrice(0);
    }


    return (
        <>
            <CartContext.Provider value={{ cart: { cartItems, totalPrice, totalCount }, removeFromCart, changeQuantity, addToCart, clearCart }}>
                {children}
            </CartContext.Provider>
        </>
    )
}


export const useCart = () => useContext(CartContext);
