const express = require('express');
const {
  getStationTimeSeriesController
} = require("../controllers/timeseries.controller");
const { searchController, getStationDetailsController } = require('../controllers/user.controller');
const router = express.Router();

router.get('/search',searchController);
router.get('/details/:station_code',getStationDetailsController);

router.get(
  "/timeseries/:station_code",
  getStationTimeSeriesController
);


module.exports = router;