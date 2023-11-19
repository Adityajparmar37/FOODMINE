import { Router } from 'express';
import handler from 'express-async-handler';
import { OrderModel } from '../model/order.model.js';
import { OrderStatus } from '../constants/orderStatus.js';
import authMid from '../middleware/authMid.js'

const router = Router();
router.use(authMid);

router.post('/create', handler(async (req, res) => {
    const order = req.body;
    // console.log("ORDER==>", order.cartItems);

    if (order.cartItems.length <= 0) res.status(401).send('Cart Is Empty !');

    await OrderModel.deleteOne({
        user: req.user.id,
        status: OrderStatus.NEW,
    });

    const newOrder = new OrderModel({ ...order, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);
    console.log(newOrder);

}))

export default router;
