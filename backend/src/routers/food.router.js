import { Router } from "express";
import { FoodModel } from "../model/food.model.js";
import handler from 'express-async-handler'


const router = Router();

//handler is use for 2 reasons one to make my api async and second to handle express error
router.get('/', handler(async (req, res) => {
    const foods = await FoodModel.find({});
    res.send(foods);
})
);


router.get('/tags', handler(async (req, res) => {
    const tags = await FoodModel.aggregate([

        // Now, if you want to perform operations or analysis on the individual tags rather than the entire array, you can use the $unwind stage in the MongoDB Aggregation Framework.
        //After unwinding, each element in the array becomes a separate document.
        {
            $unwind: '$tags',
        },

        {
            $group: {
                _id: '$tags',
                count: { $sum: 1 },
            },
        },


        //Example of $unwind operator and the $group operator 

        //Initial
        //{ tags: ['vegetarian', 'healthy'] }
        // { tags: ['vegetarian', 'organic'] }
        // { tags: ['vegan', 'organic'] }

        //After
        // [
        //     { _id: 'vegetarian', count: 2 },
        //     { _id: 'healthy', count: 1 },
        //     { _id: 'vegan', count: 1 },
        //     { _id: 'organic', count: 2 }
        //   ]

        {
            $project: {
                _id: 0,
                name: '$_id',
                count: '$count',
            },
        },

        // $Project operator can include or exclude fields, create new fields, or rename existing ones. 
        //Before
        // {
        //     "_id": "vegetarian",
        //     "count": 2
        //   }

        //After $project
        // {
        //     "name": "vegetarian",
        //     "count": 2
        // }
    ]).sort({ count: -1 });

    const all = {
        name: "All",
        count: await FoodModel.countDocuments(),
    };

    tags.unshift(all)  //adding all in begining of the list

    res.send(tags);
}))


router.get('/search/:searchTerm', handler(async (req, res) => {

    const { searchTerm } = req.params;

    ///toLower() cannot use in MongoDB hence we have to create a regualer Expresion
    const searchRegex = new RegExp(searchTerm, 'i');

    const foods = await FoodModel.find({ name: { $regex: searchRegex } })

    res.send(foods);
}));



router.get('/tags/:tag', handler(async (req, res) => {

    const { tag } = req.params;

    const foods = await FoodModel.find({ tags: tag });
    res.send(foods);
}))


router.get('/:foodId', handler(async (req, res) => {

    const { foodId } = req.params;

    const foods = await FoodModel.findById(foodId);

    res.send(foods);
}))

export default router;