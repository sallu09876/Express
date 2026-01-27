const express = require("express");
const apiController = require("../controllers/api.controller");
const apiRouter = express.Router();

const testMessage = (req, res) => {
  res.status(200).json({ message: "API is working!" });
};

apiRouter.get("/test", testMessage);

module.exports = apiRouter;
