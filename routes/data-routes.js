const dataController = require("../controllers/data-controller");

const express = require("express");

let router = express.Router();

router.post("/get-data", dataController.getDataByUserId);

router.post("/update-data", dataController.updateData);

module.exports = router;