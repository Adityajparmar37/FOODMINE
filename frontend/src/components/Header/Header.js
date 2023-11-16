import React from 'react'
import { Link } from 'react-router-dom';
import { useCart } from '../../Hooks/useCart';
import classes from './header.module.css';

const Header = () => {
    const { cart } = useCart();

    const user = {
        name: 'Aditya',
    };

    // const cart = {
    //     totalCount: 10,
    // };


    const logout = () => { }
    return (
        <>
            <header className={classes.header}>
                <div className={classes.container}>

                    <Link to='/' className={classes.logo}>
                        Food Mine !
                    </Link>

                    <nav>
                        <ul>
                            {
                                user ? (
                                    <li className={classes.menu_container}>
                                        <Link to="/profile">{user.name}</Link>
                                        <div className={classes.menu}>
                                            <Link to="/profile">Profile</Link>
                                            <Link to="/orders">Orders</Link>
                                            <a onClick={logout}>Logout</a>
                                        </div>
                                    </li>) : (
                                    <Link to="/login">Login</Link>
                                )}

                            <Link to="/cart">
                                Cart
                                {cart.totalCount > 0 && <span className={classes.cart_count}>{cart.totalCount}</span>}
                            </Link>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )


}

export default Header