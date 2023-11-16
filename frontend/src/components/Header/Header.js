import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';
import { useCart } from '../../Hooks/useCart';
import classes from './header.module.css';

const Header = () => {

    const { user, logout } = useAuth();
    const { cart } = useCart();

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
                                    <>
                                        <li className={classes.menu_container}>
                                            <Link to="/profile">{user.name}</Link>
                                            <div className={classes.menu}>
                                                <Link to="/profile">Profile</Link>
                                                <Link to="/orders">Orders</Link>
                                                <a onClick={logout}>Logout</a>
                                            </div>

                                            {/* -------cart page ----*/}



                                        </li>
                                        <Link to="/cart">
                                            Cart
                                            {cart.totalCount > 0 && <span className={classes.cart_count}>{cart.totalCount}</span>}
                                        </Link>
                                    </>

                                ) : (
                                    <Link to="/login">Login</Link>
                                )}


                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )


}

export default Header