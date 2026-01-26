const {
  getStationTimeSeriesService
} = require("../services/timeseries.service");

exports.getStationTimeSeriesController = async (req, res, next) => {
  try {
    const { station_code } = req.params;

    const data = await getStationTimeSeriesService(station_code);

    res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};
