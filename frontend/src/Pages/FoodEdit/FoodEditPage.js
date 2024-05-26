import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import InputContainer from "../../components/InputContainer/InputContainer";
import Title from "../../components/Title/Title";
import {
  add,
  getById,
  update,
} from "../../services/foodService";
import { uploadImage } from "../../services/uploadServices";
import classes from "./FoodEdit.module.css";

export default function FoodEditPage() {
  const { foodId } = useParams();
  const [imageUrl, setImageUrl] = useState();
  const navigate = useNavigate();

  const isEditMode = !!foodId;
  // !! will convert anything into Boolean . If emty string or 0 then boolean value 0 false else 1 as true

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!isEditMode) return;
    else {
      getById(foodId).then((food) => {
        if (!food) return;
        reset(food);
        setImageUrl(food.imageUrl);
      });
    }
  }, [foodId]);

  const submit = async (foodData) => {
    const food = { ...foodData, imageUrl };

    if (isEditMode) {
      await update(food);
      toast.success(
        `Food "${food.name}" sucessfully updated !`
      );
    } else {
      const newFood = await add(food);
      toast.success(
        `Food "${food.name}" added successfully!`
      );
      navigate("/admin/foods");
    }
  };

  const upload = async (event) => {
    setImageUrl(null);
    const imageUrl = await uploadImage(event);
    setImageUrl(imageUrl);
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Title
          title={
            isEditMode ? "Edit Food" : " Add Food"
          }
        />

        <form
          onSubmit={handleSubmit(submit)}
          noValidate>
          <InputContainer label="Select Image">
            <input
              type="file"
              onChange={upload}
              accept="image/jpeg,image/png"
            />
          </InputContainer>

          {imageUrl && (
            <a
              href={imageUrl}
              className={classes.image_link}
              target="blank">
              <img
                src={imageUrl}
                alt="Uploaded"
              />
            </a>
          )}

          <Input
            type="text"
            label="Name"
            {...register("name", {
              required: true,
              minLength: 5,
            })}
            error={errors.name}
          />

          <Input
            type="number"
            label="Price"
            {...register("price", {
              required: true,
            })}
            error={errors.price}
          />

          <Input
            type="text"
            label="tags"
            {...register("tags", {})}
            error={errors.tag}
          />

          <Input
            type="text"
            label="Origins"
            {...register("origins", {
              required: true,
            })}
            error={errors.origins}
          />

          <Input
            type="text"
            label="Cook Time"
            {...register("cookTime", {
              required: true,
            })}
            error={errors.cookTime}
          />

          <Button
            type="submit"
            text={
              isEditMode ? "Update" : "Create"
            }
          />
        </form>
      </div>
    </div>
  );
}
