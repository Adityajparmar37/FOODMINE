import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DateTime from '../../components/Date/DateFormate';
import NotFound from '../../components/NotFound/NotFound';
import OrderItemsList from '../../components/OrderitemsList/OrderitemsList';
import { trackOrderById } from '../../services/orderService';
import { QRcodeGen } from '../../components/QRcodeGen/QRcodeGen';
import classes from './orderTrack.module.css';

export default function OrderTrack() {
    const { orderId } = useParams();
    const [order, setOrder] = useState();

    useEffect(() => {
        console.log('order id -> ::: ', orderId)
        orderId && trackOrderById(orderId).then(order => {
            setOrder(order);
        })
    }, []);

    if (!orderId) return <NotFound message="Order Not Found" linkText="Go To Home Page" />

    return (
        order && <div className={classes.container}>
            <div className={classes.content}>
                <h1>Order ID : #{order.id}</h1>
                <div className={classes.header}>
                    <div>
                        <strong>Date</strong>
                        <DateTime date={order.createdAt} />
                    </div>
                    <div>
                        <strong>Name</strong>
                        {order.name}
                    </div>
                    <div>
                        <strong>Address</strong>
                        {order.address}
                    </div>
                    <div>
                        <strong>State</strong>
                        {order.status}
                    </div>

                    {order.paymentId && (
                        <div>
                            <strong>Payment ID :</strong>
                            {order.paymentId}
                        </div>
                    )}
                </div>
                <OrderItemsList order={order} />
                {console.log(order)}

                {order.paymentId && (
                    <div>
                        <QRcodeGen orderValue={order} />
                    </div>
                )}
            </div>
        </div>
    )
}
