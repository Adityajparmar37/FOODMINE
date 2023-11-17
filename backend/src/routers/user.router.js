import { application, Router } from 'express';
import jwt from 'jsonwebtoken';
import { BAD_REQUEST } from '../constants/httpStatus.js';
import handler from 'express-async-handler';
import { UserModel } from '../model/user.model.js';
import bcrypt from 'bcryptjs';

const router = Router();

router.post("/login", handler(async (req, res) => {

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
        res.send(generateTokenResponese(user));
        return;
    }
    res.status(BAD_REQUEST).send('username or password incorrect');

})
);



router.post("/register", handler(async (req, res) => {

    const { name, email, password, address } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
        res.status(BAD_REQUEST).send('User Already Exists , Please Login');
        return;
    }

    const encryptPassword = await bcrypt.hash(password, 10);

    const NewUser = {
        name,
        email: email.toLowerCase(),
        password: encryptPassword,
        address,
    };


    const addUser = await UserModel.create(NewUser);

    ///token is generate after user in added in database , as we want user ID which we get form MongoDB automate id 
    res.send(generateTokenResponese(addUser));
})

);

const generateTokenResponese = (user) => {

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin
        },

        process.env.JWT_KEY, { expiresIn: '30d' }
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


export default router;