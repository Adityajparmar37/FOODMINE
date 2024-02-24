import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";
import { useAuth } from "../../Hooks/useAuth";
import classes from "./profilePage.module.css";

export default function ProfilePages() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { user, updateProfile } = useAuth();

  const submit = (user) => {
    updateProfile(user);
  };
  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Update Profile" />
        <form onSubmit={handleSubmit(submit)}>
          <Input
            defaultValue={user.name}
            label="Name"
            type="text"
            {...register("name", {
              required: true,
              minLength: 5,
            })}
            error={errors.name}
          />

          <Input
            defaultValue={user.address}
            label="Address"
            {...register("address", {
              required: true,
              minLength: 10,
            })}
            error={errors.address}
          />

          <Button
            type="submit"
            text="Update"
            backgroundColor="#009e84"
          />
        </form>
        <ChangePassword />
      </div>
    </div>
  );
}
