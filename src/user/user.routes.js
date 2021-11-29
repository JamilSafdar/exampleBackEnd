const { Router } = require("express");
const {
  addUser,
  logIn,
  updateUser,
  deleteUser,
} = require("./user.controllers");
const { hashPassword, decryptPassword, tokenCheck } = require("../middleware");
const userRouter = Router();

userRouter
  .post("/user", hashPassword, addUser)
  .get("/user", tokenCheck, logIn)
  .put("/user", decryptPassword, updateUser)
  .delete("/user", tokenCheck, deleteUser);
userRouter.post("/login", decryptPassword, logIn);

module.exports = userRouter;