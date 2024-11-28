import { Router } from "express";
import { FoodModel } from "../model/food.model.js";
import handler from "express-async-handler";
import adminMid from "../middleware/adminMid.js";
import client from "../config/redis.config.js";
import createRateLimiter from "../middleware/ratelimit.js";

const router = Router();
const searchFoodLimiter = createRateLimiter(2, 10000);

//handler is use for 2 reasons one to make my api async and second to handle express error
router.get(
  "/",
  handler(async (req, res) => {
    try {
      const cacheFoods = await client.get("foods");

      if (cacheFoods) {
        return res.json(JSON.parse(cacheFoods));
      }

      const foods = await FoodModel.find({});
      await client.setex("foods", 30, JSON.stringify(foods));
      res.send(foods);
    } catch (error) {
      console.log(error);
    }
  })
);

router.post(
  "/addFood",
  adminMid,
  handler(async (req, res) => {
    const { name, price, tags, favorite, origins, cookTime, imageUrl } =
      req.body;

    const food = new FoodModel({
      name,
      price,
      tags: tags.split ? tags.split(",") : tags,
      favorite,
      imageUrl,
      origins: origins.split ? origins.split(",") : origins,
      cookTime,
    });

    await food.save();
    await client.del("foods");

    res.send(food);
  })
);

router.get(
  "/tags",
  handler(async (req, res) => {
    const tags = await FoodModel.aggregate([
      // Now, if you want to perform operations or analysis on the individual tags rather than the entire array, you can use the $unwind stage in the MongoDB Aggregation Framework.
      //After unwinding, each element in the array becomes a separate document.
      {
        $unwind: "$tags",
      },

      {
        $group: {
          _id: "$tags",
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
          name: "$_id",
          count: "$count",
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

    tags.unshift(all); //adding all in begining of the list
    res.send(tags);
  })
);

router.get(
  "/search/:searchTerm",
  searchFoodLimiter,
  handler(async (req, res) => {
    const { searchTerm } = req.params;

    ///toLower() cannot use in MongoDB hence we have to create a regualer Expresion
    const searchRegex = new RegExp(searchTerm, "i");

    const foods = await FoodModel.find({
      name: { $regex: searchRegex },
    });

    res.send(foods);
  })
);

router.delete(
  "/:foodId",
  adminMid,
  handler(async (req, res) => {
    const { foodId } = req.params;
    await FoodModel.deleteOne({ _id: foodId });
    await client.del("foods");
    res.send();
  })
);

router.get(
  "/tags/:tag",
  handler(async (req, res) => {
    const { tag } = req.params;

    const foods = await FoodModel.find({
      tags: tag,
    });
    res.send(foods);
  })
);

router.get(
  "/:foodId",
  handler(async (req, res) => {
    try {
      const { foodId } = req.params;

      const cacheFoods = await client.get("foods");

      if (cacheFoods) {
        const food = JSON.parse(cacheFoods).find((food) => food._id === foodId);
        if (food) {
          return res.send(food);
        }
      }

      const food = await FoodModel.findById(foodId);
      if (!food) {
        return res.status(404).send({ error: "Food not found" });
      }

      res.send(food);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: "An error occurred while fetching the food item.",
      });
    }
  })
);

router.put(
  "/updateFood",
  adminMid,
  handler(async (req, res) => {
    const { id, name, price, tags, favorite, imageUrl, origins, cookTime } =
      req.body;

    await FoodModel.updateOne(
      { _id: id },
      {
        name,
        price,
        tags: tags.split ? tags.split(",") : tags,
        favorite,
        imageUrl,
        origins: origins.split ? origins.split(",") : origins,
        cookTime,
      }
    );

    await client.del("foods");

    res.send();
  })
);

export default router;
