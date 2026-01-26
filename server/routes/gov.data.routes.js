const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authenticateGov");
const controller = require("../controllers/gov.data.controller");

router.post("/water-quality/latest", auth, controller.uploadLatest);
router.post("/water-quality/timeseries", auth, controller.uploadTimeseries);

module.exports = router;
