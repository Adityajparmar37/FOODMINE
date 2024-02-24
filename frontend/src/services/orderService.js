import axios from "axios";

export const createOrder = async (order) => {
  try {
    // console.log(order);
    const { data } = axios.post(
      "/api/orders/create",
      order
    );
    const res = {
      ...data,
      flag: true,
    };
    return res;
  } catch (error) {}
};

export const getNewOrderForCurrentUser =
  async () => {
    const { data } = await axios.get(
      "/api/orders/newOrderForCurrentUser"
    );
    return data;
  };

export const pay = async (paymentId) => {
  try {
    const { data } = await axios.put(
      "/api/orders/pay",
      { paymentId }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const trackOrderById = async (orderId) => {
  console.log("data -> ", orderId);
  const { data } = await axios.get(
    "/api/orders/track/" + orderId
  );
  return data;
};

export const getAll = async (state) => {
  const { data } = await axios.get(
    `api/orders/${state ?? ""}`
  );
  console.log(data);
  return data;
};

export const getAllStatus = async () => {
  const { data } = await axios.get(
    `/api/orders/allstatus`
  );
  return data;
};
