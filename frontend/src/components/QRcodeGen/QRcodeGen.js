import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import Button from '../Button/Button';

export const QRcodeGen = ({ orderValue }) => {
    const [back, setBack] = useState('#FFFFFF');
    const [fore, setFore] = useState('#000000');
    const [size, setSize] = useState(256);
    const [orderDetails, setOrderDetails] = useState({
        Name: orderValue.name,
        OrderId: orderValue.id,
        PaymentId: orderValue.paymentId,
        Address: orderValue.address,
        Status: orderValue.status,
        TotalPrice: `Rs${orderValue.totalPrice}`,
        // Food: orderValue.cartItems.map(item => ({
        // name: item.name,
        // quantity: item.quantity
        // }))
    });

    useEffect(() => {
        // Function to convert orderValue object to a single string
        //Object ni ek ek value lase ane string ma convert kari \n added kari desa using join
        const stringifyOrderValue = () => {
            if (orderValue && typeof orderValue === 'object') {
                return Object.entries(orderDetails)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join('\n');
            }
            return '';
        };

        // orderValue change thai tyare value update kari do
        setOrderDetails(stringifyOrderValue());
    }, [orderValue]);

    return (
        <center>
            <h1>SCAN ME</h1>
            {/* {console.log(orderDetails)}  */}
            {(
                <>
                    <QRCode
                        value={`Order Details:${orderDetails}}`}
                        bgColor={back}
                        fgColor={fore}
                        size={size}
                    />
                </>
            )}
        </center>
    );
};
