import express from "express";
import userController from "./user.controller";

const userRouter = express.Router();

console.log(userController)

userRouter.get("/", userController);

export default userRouter;
