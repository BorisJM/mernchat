const express = require("express");
const Router = express.Router();
const AuthController = require("../controllers/AuthController");
const MessageController = require("../controllers/MessageController");

Router.use(AuthController.protect);
Router.post("/createMessage", MessageController.createMessage);
Router.post(
  "/createMessageImage",
  MessageController.uploadMessagePhoto,
  MessageController.resizeMessageImage
);
Router.get("/getMessages/:id", MessageController.getMessages);

module.exports = Router;
