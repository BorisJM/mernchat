const express = require("express");
const Router = express.Router();
const AuthController = require("../controllers/AuthController");

Router.post("/", AuthController.generateRoomToken);
module.exports = Router;
