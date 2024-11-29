import { Router } from "express";
import handler from "express-async-handler";
import { OrderModel } from "../model/order.model.js";
import { OrderStatus } from "../constants/orderStatus.js";
import authMid from "../middleware/authMid.js";
import { UserModel } from "../model/user.model.js";
import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import createRateLimiter from "../middleware/ratelimit.js";

const router = Router();
router.use(authMid);

const PayRateLimiter = createRateLimiter(1, 1000);

router.post(
  "/create",
  handler(async (req, res) => {
    const order = req.body;
    // console.log("ORDER==>", order.cartItems);

    if (order.cartItems.length <= 0) res.status(401).send("Cart Is Empty !");

    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    const newOrder = new OrderModel({
      ...order,
      user: req.user.id,
    });
    await newOrder.save();
    res.send(newOrder);
    console.log(newOrder);
  })
);

//payment , put method is when we want to update or have changes in Database

router.put(
  "/pay",
  PayRateLimiter,
  handler(async (req, res) => {
    const { paymentId } = req.body;
    const order = await getNewOrderForCurrentUser(req);

    if (!order) {
      return res.status(BAD_REQUEST).send("Order Not Found!");
    }
    // const orderId = mongoose.Types.ObjectId(order.id);
    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;

    // console.log("User order ==>" + order);

    const user = await UserModel.findOne({
      _id: order.user,
    });
    // console.log("user details fetch ==> " + user);

    console.log(
      "ENV==> " + process.env.EMAIL + " PASS==> " + process.env.MAILPASS
    );

    try {
      await order.save();
      // Email setup
      let config = {
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.MAILPASS,
        },
      };

      let transporter = nodemailer.createTransport(config);

      let MailGenerator = new Mailgen({
        theme: "default",
        product: {
          name: "Mailgen",
          link: "https://mailgen.js/",
        },
      });

      let response = {
        body: {
          name: order.name,
          intro: "Your order Details",
          table: {
            data: [
              {
                OderId: order.id,
                PaymentId: paymentId,
                address: order.address,
                Price: order.cartItems[0].price,
              },
            ],
          },
          outro: "Enjoy your Meal, Thank you ",
        },
      };

      let mail = MailGenerator.generate(response);

      let message = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "Place Order",
        html: mail,
      };

      await transporter.sendMail(message);
      res.status(201).json({
        orderId: order._id.toString(),
        msg: "You should receive an email",
      });
    } catch (error) {
      console.error("Error processing payment and sending email:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.get(
  "/track/:orderId",
  handler(async (req, res) => {
    const { orderId } = req.params;
    const user = await UserModel.findById(req.user.id);

    console.log("order :" + orderId);
    //find the order //agar admin hase to je pn orderId admin bole ae badhe api do
    const filter = {
      _id: orderId,
    };

    if (!user.isAdmin) {
      //jo agar ae user db ma che toh j ena orderId match kari order batavo
      filter.user = user._id;
    }

    console.log(filter._id);
    console.log("orderId -> " + orderId);

    const order = await OrderModel.findOne(filter);

    if (!order) return res.send(401);
    else return res.send(order);
  })
);

router.get(
  "/newOrderForCurrentUser",
  handler(async (req, res) => {
    const order = await getNewOrderForCurrentUser(req);
    if (order) res.send(order);
    else res.status(400).send();
  })
);

router.get("/allstatus", (req, res) => {
  const allStatus = Object.values(OrderStatus);
  res.send(allStatus);
});

router.get(
  "/:status?",
  handler(async (req, res) => {
    const status = req.params.status;

    const user = await UserModel.findById(req.user.id);
    const filter = {};

    //if it is not admin then show only that user order , if admin then show all the orders
    if (!user.isAdmin) filter.user = user._id;
    if (status) filter.status = status;

    const orders = await OrderModel.find(filter).sort("-createdAt");
    res.send(orders);
  })
);

const getNewOrderForCurrentUser = async (req) =>
  await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  });

export default router;
