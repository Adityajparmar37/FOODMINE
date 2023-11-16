import React from 'react'
import { Link } from 'react-router-dom';
import { useCart } from '../../Hooks/useCart';
import NotFound from '../../components/NotFound/NotFound';
import Price from '../../components/Price/Price';
import Title from '../../components/Title/Title';
import classes from './cartPage.module.css';




export default function CartPage() {

    const { cart, removeFromCart, changeQuantity } = useCart();
    return (
        <>

            <Title title={"Cart"} margin="3rem 0 0 2.5rem" />



            {/* <Link className={classes.backbtn} to="/">&lt; Back to menu</Link> */}
            {cart.cartItems.length === 0 ? (<NotFound message="Cart is Empty !" />) : 
            

                <div className={classes.container}>
                    <ul className={classes.list}>
                        {cart.cartItems.map(item => (
                            <li key={item.food.id}>
                                <div>
                                    <img src={`${item.food.imageUrl}`}
                                        alt={item.food.name} />
                                </div>
                                <div>
                                    <Link to={`/foods/${item.food.id}`}>{item.food.name}</Link>
                                </div>

                                <div>
                                    <select
                                        value={item.quantity}
                                        onChange={e => changeQuantity(item, Number(e.target.value))}
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                    </select>
                                </div>

                                <div>
                                    <Price price={item.price}></Price>
                                </div>

                                <div>
                                    <button className={classes.remove_button} onClick={() => removeFromCart(item.food.id)}>
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className={classes.checkout}>
                        <div>
                            <div className={classes.fodds_count}>Total = {cart.totalCount}</div>
                            <div className={classes.total_price}>
                                <Price price={cart.totalPrice} />
                            </div>
                        </div>

                        <Link to="/checkout">Placed The Order</Link>
                    </div>
                </div>
            }
        </>
    )
}
