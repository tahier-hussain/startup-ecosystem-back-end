const express = require("express");
const router = express.Router();
const connectController = require("../../controllers/connect");

router.post("/create", connectController.create);

router.post("/accept", connectController.accept);

router.post("/ignore", connectController.ignore);

router.post("/cancel", connectController.cancel);

module.exports = router;
