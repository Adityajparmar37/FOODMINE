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


//payment , put method is whe we want to update or have changes in Database

router.put('/pay', handler(async (req, res) => {
    const { paymentId } = req.body;
    const order = await getNewOrderForCurrentUser(req);
    if (!order) {
        res.status(BAD_REQUEST).send('Order Not Found!');
        return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.send(order._id);
})
);

router.get('/newOrderForCurrentUser', handler(async (req, res) => {

    const order = await getNewOrderForCurrentUser(req);
    if (order) res.send(order);
    else res.status(400).send();
}))

const getNewOrderForCurrentUser = async (req) =>
    await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });


export default router;
