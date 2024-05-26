import { application, Router } from "express";
import jwt from "jsonwebtoken";
import { BAD_REQUEST } from "../constants/httpStatus.js";
import handler from "express-async-handler";
import { UserModel } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import authMid from "../middleware/authMid.js";
import adminMid from "../middleware/adminMid.js";

const router = Router();

router.post(
  "/login",
  handler(async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({
      email,
    });

    if (
      user &&
      (await bcrypt.compare(
        password,
        user.password
      ))
    ) {
      res.send(generateTokenResponese(user));
      return;
    }
    res
      .status(BAD_REQUEST)
      .send("username or password incorrect");
  })
);

router.post(
  "/register",
  handler(async (req, res) => {
    const { name, email, password, address } =
      req.body;

    const user = await UserModel.findOne({
      email,
    });

    if (user) {
      res
        .status(BAD_REQUEST)
        .send(
          "User Already Exists , Please Login"
        );
      return;
    }

    const encryptPassword = await bcrypt.hash(
      password,
      10
    );

    const NewUser = {
      name,
      email: email.toLowerCase(),
      password: encryptPassword,
      address,
    };

    const addUser = await UserModel.create(
      NewUser
    );

    ///token is generate after user in added in database , as we want user ID which we get form MongoDB automate id
    res.send(generateTokenResponese(addUser));
  })
);

router.put(
  "/updateProfile",
  authMid,
  handler(async (req, res) => {
    const { name, address } = req.body;

    // console.log(req.body);

    //By default, findOneAndUpdate() returns the document as it was before update was applied. If you set new: true, findOneAndUpdate() will instead give you the object after update was applied. (For new keyword)

    const user =
      await UserModel.findByIdAndUpdate(
        req.user.id,
        { name, address },
        { new: true }
      );

    res.send(generateTokenResponese(user));
  })
);

router.put(
  "/changePassword",
  authMid,
  handler(async (req, res) => {
    const { currentPassword, newPassword } =
      req.body;
    const user = await UserModel.findById(
      req.user.id
    );

    if (!user) {
      res
        .status(401)
        .send("Change Password Failed!");

      return;
    }

    const equal = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!equal) {
      res
        .status(401)
        .send(
          "Current Password Is Not Correct !"
        );
      return;
    }

    user.password = await bcrypt.hash(
      newPassword,
      10
    );

    await user.save();

    res.send();
  })
);

const generateTokenResponese = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },

    process.env.JWT_KEY,
    { expiresIn: "30d" }
  );

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token,
  };
};

router.get(
  "/getall/:searchTerm?",
  adminMid,
  handler(async (req, res) => {
    const { searchTerm } = req.params;

    const filter = searchTerm
      ? {
          name: {
            $regex: new RegExp(searchTerm, "i"),
          },
        }
      : {};

    const users = await UserModel.find(filter, {
      password: 0,
    });
    res.send(users);
  })
);

router.put(
  "/status/:userId",
  adminMid,
  handler(async (req, res) => {
    try {
      const { userId } = req.params;
      console.log(userId);

      if (userId === req.user.id) {
        res
          .status(400)
          .send("Cannot Block Yourself !");
        return;
      } else {
        const user = await UserModel.findById(
          userId
        );
        user.isBlocked = !user.isBlocked;

        user.save();
        res.send(user.isBlocked);
      }
    } catch (error) {
      console.log(error);
    }
  })
);

router.get(
  "/getById/:userId",
  adminMid,
  handler(async (req, res) => {
    const { userId } = req.params;
    const user = await UserModel.findById(
      userId,
      { password: 0 }
    );
    res.send(user);
  })
);


router.put(
  "/update",
  adminMid,
  handler(async (req, res) => {
    const { id, name, email, address, isAdmin } =
      req.body;
    await UserModel.findByIdAndUpdate(id, {
      name,
      email,
      address,
      isAdmin,
    });

    res.send();
  })
);

export default router;
