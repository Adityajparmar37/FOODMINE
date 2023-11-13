import React from 'react';

export default function Price({ price, locale, currency }) {

    const formatPrice = () => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
        }).format(price);
    }

    // console.log(formatPrice());

    return (
        <span> {formatPrice()}</span>
    );
}

Price.defaultProps = {
    locale: 'en-IN',
    currency: 'INR'
};
