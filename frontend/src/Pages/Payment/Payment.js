import React, { useEffect, useState } from 'react'
import Map from '../../components/Map/Map';
import OrderItemsList from '../../components/OrderitemsList/OrderitemsList';
import PaypalButtons from '../../components/PaypalButtons/PaypalButtons';
import Title from '../../components/Title/Title';
import { getNewOrderForCurrentUser } from '../../services/orderService';
import classes from './payment.module.css'

export default function Payment() {
    const [order, setOrder] = useState();
    // const [Loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            getNewOrderForCurrentUser().then(data => {
                setOrder(data);
                // setLoading(false);
            });
        } catch (error) {
            // setLoading(false);
            console.log(error);
        }
    }, []);


    //if order is not there
    if (!order) return;
    return (
        <>

            <div className={classes.container}>
                <div className={classes.content}>
                    <Title title="Order Details" frontSize="1.6rem" />

                    <div className={classes.summary}>
                        <div>
                            <h3>Name :</h3>
                            <span>{order.name}</span>
                        </div>
                        <div>
                            <h3>Address:</h3>
                            <span>{order.address}</span>
                        </div>
                    </div>
                    <OrderItemsList order={order} />
                </div>

                <div className={classes.map}>
                    <Title title="Your Location" frontSize="1.6rem" />
                    <Map readonly={true} location={order.addressLatLng} />
                </div>

                <div className={classes.buttons_container}>
                    <div className={classes.buttons}>
                        <PaypalButtons order={order} />
                    </div>
                </div>
            </div>

        </>
    )
}
