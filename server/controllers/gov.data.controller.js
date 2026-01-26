const service = require("../services/gov.data.service");

exports.uploadLatest = async (req, res, next) => {
  try {
    await service.uploadLatest(req.body);
    res.status(201).json({
      success: true,
      message: "Latest water quality data uploaded"
    });
  } catch (err) {
    next(err);
  }
};

exports.uploadTimeseries = async (req, res, next) => {
  try {
    await service.uploadTimeseries(req.body);
    res.status(201).json({
      success: true,
      message: "Timeseries data uploaded"
    });
  } catch (err) {
    next(err);
  }
};
