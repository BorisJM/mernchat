const express = require("express");
const Router = express.Router();
const UserController = require("../controllers/UserController");
const AuthController = require("../controllers/AuthController");

Router.post("/", UserController.createUser);
Router.post("/login", UserController.login);
Router.post("/logout", UserController.Logout);
Router.use(AuthController.protect);
Router.get("/getUser", UserController.getUser);
Router.get("/getAllUsers", UserController.getAllUsers);
Router.post(
  "/changeSettings",
  UserController.uploadUserPhoto,
  UserController.resizeUserPhoto,
  UserController.ChangeSettings
);
Router.post("/changePassword", UserController.ChangePassword);
module.exports = Router;
