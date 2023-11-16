import React from 'react';
import { Link } from 'react-router-dom';
import Price from '../Price/Price';
import StarRating from '../StarRating/StarRating';
import classes from './thumbnails.module.css';

function Thumbnails({ foods }) {
    return (
        <ul className={classes.list}>
            {foods.map(food => (
                <li key={food.id}>
                    <Link to={`/foods/${food.id}`}>
                        <img
                            className={classes.image}
                            src={`${food.imageUrl}`}
                            alt={food.name}
                        />
                        <div className={classes.content}>
                            <div className={classes.name}>
                                {food.name}
                            </div>
                            <span className={`${classes.favorite} ${food.favorite ? ' ' : classes.not} `}> ❤</span>

                            <div className={classes.stars}>
                                <StarRating stars={food.stars} />
                            </div>
                            <div className={classes.product_item_footer}>
                                <div className={classes.origin}>
                                    {food.origins.map(origin => (
                                        <span key={origin}>{origin}</span>
                                    ))}
                                </div>
                                <div className={classes.cook_item}>
                                    <span>🕑</span>
                                    {food.cookTime} min
                                </div>
                            </div>
                            <div className={classes.price}>
                                <Price price={food.price} />
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default Thumbnails;
