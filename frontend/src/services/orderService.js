import axios from "axios";


export const createOrder = async (order) => {

    try {
        console.log(order);
        const { data } = axios.post('/api/orders/create', order);
        return data;
    } catch (error) { }
};