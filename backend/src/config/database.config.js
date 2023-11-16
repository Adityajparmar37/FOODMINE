import { connect, set } from 'mongoose';
import { UserModel } from '../model/user.model.js';
import { FoodModel } from '../model/food.model.js';
import { sample_users } from '../data.js';
import { sample_foods } from '../data.js';
import bcrypt from 'bcryptjs';


set('strictQuery', true);

export const dbconnect = async () => {
    try {
        connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await seedUsers();
        await seedFoods();
        console.log('Connect Successfully--');
    } catch (error) {
        console.log(error);
    }
};

async function seedUsers() {
    const usersCount = await UserModel.countDocuments();

    //MODEL JO PHELA THI BANAVLO HOI TOH PACHO NAE BANAVO
    if (usersCount > 0) {
        console.log('User Seed is already done');
        return;
    }

    for (let user of sample_users) {
        user.password = await bcrypt.hash(user.password, 10);
        await UserModel.create(user);
    }

    console.log('User seed is done!');

}


async function seedFoods() {
    const foodCount = await FoodModel.countDocuments();
    if (foodCount > 0) {
        console.log('Foods seed is already done');
        return;
    }

    for (const food of sample_foods) {
        food.imageUrl = `/foods/${food.imageUrl}`;
        await FoodModel.create(food);
    }

    console.log('Food seed is Done !');
}