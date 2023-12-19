import { latLng } from 'leaflet';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../Hooks/useAuth';
import { useCart } from '../../Hooks/useCart'
import { createOrder } from '../../services/orderService';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Map from '../Map/Map';
import OrderitemsList from '../OrderitemsList/OrderitemsList';
import Title from '../Title/Title';
import classes from './checkoutPage.module.css'


export default function CheckoutPage() {

    const { cart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [order, setOrder] = useState({ ...cart })

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();


    const submit = async (data) => {

        if (!order.addressLatLng) {
            toast.warning('Please select your location on the map');
            return;
        }

        let { flag } = await createOrder({ ...order, name: data.name, address: data.address })
        console.log("temp : " + flag)
        if (flag) {
            setTimeout(() => {
                navigate('/payment');
            }, 1500);
        } 



    }
    return (
        <>
            <form onSubmit={handleSubmit(submit)}
                className={classes.container}>
                <div className={classes.content}>
                    <Title title="Your Order" fontSize="1.6rem" />
                    <div className={classes.input}>
                        <Input
                            defaultValue={user.name}
                            label="Name"
                            {...register('name')}
                            error={errors.name}
                        />

                        <Input
                            defaultValue={user.address}
                            label="Address"
                            {...register('address')}
                            error={errors.address}
                        />
                    </div>
                    <OrderitemsList order={order} />
                </div>
                <div>
                    <Title title="Choose Your Location" frontSize="1.6rem" />
                    <Map
                        location={order.addressLatLng}
                        onChange={latlng => {
                            console.log(latlng);
                            setOrder({ ...order, addressLatLng: latlng });
                        }}
                    />
                </div>

                <div className={classes.buttons_container}>
                    <div className={classes.buttons}>
                        <Button
                            type="submit"
                            text="Go To Payment"
                            width="100%"
                            height="3rem"
                        />
                    </div>
                </div>
            </form>
        </>
    )
}
